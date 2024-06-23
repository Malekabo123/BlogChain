import styles from "./AddedFormElements.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../../../store/texteditorFeatures";

function AddedFormElements({ otherElements }) {
  return (
    <>
      {otherElements.map((element, index) => {
        const key = Object.keys(element)[0];
        const value = Object.values(element)[0];
        if (value) {
          if (key.startsWith("c")) {
            return (
              <div className={styles.content} key={index}>
                <ReactQuill
                  theme="bubble"
                  modules={modules}
                  formats={formats}
                  value={value}
                  className="previewQuill"
                  readOnly
                />
              </div>
            );
          } else {
            return (
              <div key={index} className={styles.imgContainer}>
                <img src={value} alt={key} className={styles.blogImg} />
              </div>
            );
          }
        }
        return null;
      })}
    </>
  );
}

export default AddedFormElements;
