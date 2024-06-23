import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import styles from "./Categories.module.css";
import { categories } from "../../../store/categories";
import { style } from "../../../store/categoriesStyle";
import WarningMessage from "../WarningMessage/WarningMessage";

function Categories({ formIsSubmitted, defValue }) {
  const [selectedOption, setSelectedOption] = useState(defValue || null);
  const [enteredValue, setEnteredValue] = useState("");
  const ref = useRef();
  const optionRef = useRef();

  //show input to type category if it's not in the options
  const handleOptionChange = (selected) => {
    setSelectedOption(selected);
  };

  //check if entered input value is already in the categories list
  let categoryIsValid = true;
  let checkCategory = categories.some(
    (category) => category.value === enteredValue.trim().replace(/\s/g, "-")
  );

  if (checkCategory) {
    categoryIsValid = false;
  }

  const handleInputChange = (event) => {
    setEnteredValue(event.target.value);
  };

  //let the user type the category he wants by selecting Other
  let hasError = formIsSubmitted && !selectedOption;
  let optionIsEmpty = selectedOption && selectedOption.value === "-Other-";
  let addedOptionError = formIsSubmitted && !enteredValue && optionIsEmpty;

  if (hasError) {
    ref.current.focus();
  }

  useEffect(() => {
    if (addedOptionError) {
      optionRef.current.focus();
    }
  }, [addedOptionError]);

  return (
    <div className={styles.categoryContainer}>
      <Select
        className={`category ${hasError && "error"}`}
        classNamePrefix="select"
        isClearable={true}
        isSearchable={true}
        placeholder="*--Choose Category--"
        name="category"
        options={categories}
        onChange={handleOptionChange}
        styles={style}
        ref={ref}
        defaultValue={defValue && { label: defValue, value: defValue }}
      />

      {optionIsEmpty && (
        <>
          <input
            type="text"
            placeholder="Enter your category"
            name="category"
            className={`${styles.categoryInput} ${
              addedOptionError && styles.error
            }`}
            onChange={handleInputChange}
            ref={optionRef}
          />
          {!categoryIsValid && (
            <p className={styles.warningMessage}>
              *Category already existed in list
            </p>
          )}
        </>
      )}

      {hasError || (addedOptionError && <WarningMessage />)}
    </div>
  );
}

export default Categories;
