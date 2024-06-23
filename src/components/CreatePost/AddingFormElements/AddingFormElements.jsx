import TextareaElement from "../TextareaElement/TextareaElement";
import PostImageElement from "../PostImageElement/PostImageElement";

function AddingFormElements({
  elementsArray,
  removeElement,
  handleImageChange,
}) {
  return (
    <>
      {elementsArray.map((element, index) => {
        if (element.type === "text") {
          return (
            <TextareaElement
              index={index + 1}
              key={element.id}
              onClick={() => removeElement(element.id)}
              defValue={element?.text}
            />
          );
        } else {
          return (
            <PostImageElement
              index={index}
              id={element.id}
              handleImageChange={handleImageChange}
              key={element.id}
              imageFile={element.image}
              removeElement={removeElement}
            />
          );
        }
      })}
    </>
  );
}

export default AddingFormElements;
