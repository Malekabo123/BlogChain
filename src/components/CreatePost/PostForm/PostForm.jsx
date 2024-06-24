import styles from "./PostForm.module.css";
import TextareaElement from "../TextareaElement/TextareaElement";
import { useEffect, useState } from "react";
import Categories from "../Categories/Categories";
import Input from "../Input/Input";
import AddingFormElements from "../AddingFormElements/AddingFormElements";

let isUpdating = true;
function PostForm({ formIsSubmitted, postData }) {
  const [elementsArray, setElementsArray] = useState([]);

  //if the post is being updated reconstruct the extra elements (imgs and texts) to match the original
  if (isUpdating && postData?.otherContentAndImages?.length > 0) {
    isUpdating = false;

    const updatedElementsArray = postData.otherContentAndImages.map(
      (element) => {
        let modifiedElement;
        if (Object.keys(element)[0].startsWith("c")) {
          modifiedElement = {
            type: "text",
            id: Math.random().toString(),
            image: null,
            text: Object.values(element)[0],
          };
        } else {
          modifiedElement = {
            type: "img",
            id: Math.random().toString(),
            image: Object.values(element)[0],
          };
        }
        return modifiedElement;
      }
    );

    setElementsArray(updatedElementsArray);
  }

  useEffect(() => {
    return () => {
      isUpdating = true;
    };
  }, [isUpdating]);

  //add text or img element to the post
  const moreMedia = (type) => {
    setElementsArray([
      ...elementsArray,
      { type: type, id: Math.random().toString(), image: null },
    ]);
  };

  //uploading image by the user, and reduce the quality
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
                const addedImageURL = resizedReader.result;

                const updatedElements = elementsArray.map((element) => {
                  if (element.id === id) {
                    return { ...element, image: addedImageURL };
                  }
                  return element;
                });

                setElementsArray(updatedElements);
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

  //remove text or img element from the post
  const removeElement = (id, content) => {
    setElementsArray(elementsArray.filter((element) => element.id !== id));
  };

  return (
    <div className={styles.postForm}>
      <Input
        isTitle={true}
        entryName={"title"}
        placeHolder={"*Title"}
        formIsSubmitted={formIsSubmitted}
        defValue={postData.title}
      />
      <Input
        entryName={"subTitle"}
        placeHolder={"Sub Title"}
        defValue={postData.subTitle}
      />
      <Categories
        formIsSubmitted={formIsSubmitted}
        defValue={postData.category}
      />
      <TextareaElement
        isMain={true}
        formIsSubmitted={formIsSubmitted}
        defValue={postData.content}
      />

      <AddingFormElements
        elementsArray={elementsArray}
        removeElement={removeElement}
        handleImageChange={handleImageChange}
      />

      <button
        className={`${styles.addMedia} ${styles.margin}`}
        type="button"
        onClick={() => moreMedia("text")}
      >
        + Add Text Field
      </button>
      <button
        className={styles.addMedia}
        type="button"
        onClick={() => moreMedia("img")}
      >
        + Add Image
      </button>
    </div>
  );
}

export default PostForm;
