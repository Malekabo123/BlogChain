import { useRef, useState } from "react";
import WarningMessage from "../WarningMessage/WarningMessage";
import styles from "./Input.module.css";

function Input({
  isTitle,
  entryName,
  formIsSubmitted,
  placeHolder,
  inputType,
  defValue,
}) {
  const ref = useRef();
  //defValue if the post is being updated, rendering the existed value
  const [inputValue, setInputValue] = useState(defValue || "");

  const handleChange = () => {
    setInputValue(ref.current.value);
  };

  let hasError = isTitle && formIsSubmitted && !inputValue;

  if (hasError) {
    ref.current.focus();
  }

  return (
    <div className={styles.input}>
      <input
        ref={ref}
        type={inputType || "text"}
        placeholder={placeHolder}
        name={entryName}
        onChange={handleChange}
        className={hasError ? styles.error : ""}
        autoComplete="off"
        defaultValue={defValue}
      />
      {hasError && <WarningMessage />}
    </div>
  );
}

export default Input;
