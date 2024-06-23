import styles from "./TextareaElement.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../../store/texteditorFeatures";
import { useRef, useState } from "react";
import WarningMessage from "../WarningMessage/WarningMessage";

function TextareaElement({
  index,
  onClick,
  isMain,
  formIsSubmitted,
  defValue,
}) {
  const [content, setContent] = useState(defValue || "");
  const ref = useRef();

  const handleEditorChange = (value) => {
    setContent(value);
  };

  //if it's the main text editor it should give a warning when it's left empty
  let hasError = isMain && formIsSubmitted && !content.replace(/<[^>]*>/g, "");

  if (hasError) {
    ref.current.focus();
  }

  return (
    <div className={styles.myQuill}>
      {!isMain && (
        <div className={styles.remove} onClick={onClick}>
          <FaRegTrashAlt />
        </div>
      )}
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="write your content ...."
        value={content}
        onChange={handleEditorChange}
        className={hasError && "error"}
        ref={ref}
      />
      <input
        type="text"
        name={`content${isMain ? "" : index}`}
        value={content}
        onChange={handleEditorChange}
        style={{ display: "none" }}
      />
      {hasError && <WarningMessage />}
    </div>
  );
}

export default TextareaElement;
