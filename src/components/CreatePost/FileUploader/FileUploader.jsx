import { useRef } from "react";
import styles from "./FileUploader.module.css";
import { IoMdCloudUpload } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

export const FileUploader = ({
  index,
  id,
  handleImageChange,
  imageFile,
  isCover,
  removeCoverImage,
  imgCover,
}) => {
  const hiddenFileInput = useRef(null);

  //check if the file value is empty (creating new post) or is being updated
  if (imgCover && !imageFile) {
    imageFile = imgCover;
  }

  //after deleting the existed cover image from updating the post
  if (imageFile === "Image is deleted") {
    imageFile = "";
  }

  const handleUpload = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  return (
    <>
      <button
        className={styles.buttonUpload}
        onClick={handleUpload}
        type="button"
      >
        <IoMdCloudUpload size="30px" />
        <span>Upload</span>
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => handleImageChange(id, event)}
        ref={hiddenFileInput}
        style={{ display: "none" }}
      />
      <input
        type="text"
        value={imageFile || ""}
        onChange={handleImageChange}
        name={`img${index + 1 || "Cover"}`}
        style={{ display: "none" }}
      />
      {isCover && imageFile && (
        <div className={styles.remove} onClick={() => removeCoverImage()}>
          <FaRegTrashAlt />
        </div>
      )}
      {imageFile && (
        <img src={imageFile} alt={index} className={styles.addedImg} />
      )}
    </>
  );
};
