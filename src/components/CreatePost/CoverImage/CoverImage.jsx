import styles from "./CoverImage.module.css";
import { FileUploader } from "../FileUploader/FileUploader";
import { useState } from "react";

function CoverImage({ imgCover }) {
  const [coverImage, setCoverImage] = useState("");

  //send image file to img tag when uploaded, and reduce its quality
  const handleImageChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set the desired width and height for the resized image
          const MAX_WIDTH = 800; // Example: resize to 800px width
          const MAX_HEIGHT = 800; // Example: resize to 800px height

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });

              const resizedReader = new FileReader();
              resizedReader.onloadend = () => {
                setCoverImage(resizedReader.result);
              };
              resizedReader.readAsDataURL(resizedFile);
            },
            file.type,
            0.7
          ); // Adjust quality here (0.7 is 70% quality)
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  //to differentiate between an empty post and a post that its cover img is being deleted
  const removeCoverImage = () => {
    setCoverImage("Image is deleted");
  };

  return (
    <div className={styles.coverImage}>
      <div>
        <span>
          Optional: <br /> Upload Cover Image
        </span>
        <FileUploader
          handleImageChange={handleImageChange}
          imageFile={coverImage}
          isCover={true}
          removeCoverImage={removeCoverImage}
          imgCover={imgCover}
        />
      </div>
    </div>
  );
}

export default CoverImage;
