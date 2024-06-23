import { FileUploader } from "../FileUploader/FileUploader";
import styles from "./PostImageElement.module.css";
import { FaRegTrashAlt } from "react-icons/fa";

function PostImageElement({
  index,
  removeElement,
  id,
  handleImageChange,
  imageFile,
}) {
  return (
    <div>
      <div className={styles.remove} onClick={() => removeElement(id)}>
        <FaRegTrashAlt />
      </div>
      <FileUploader
        index={index}
        id={id}
        handleImageChange={handleImageChange}
        imageFile={imageFile}
      />
    </div>
  );
}

export default PostImageElement;
