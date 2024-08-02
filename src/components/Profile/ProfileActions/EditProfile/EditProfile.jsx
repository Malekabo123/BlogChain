import styles from "./EditProfile.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isLoggedInActions } from "../../../../store/loggingSlice";
import { useRef, useState } from "react";
import { Avatar } from "@mui/material";
import { firebaseFetch } from "../../../../store/firebaseFetch";
import { updateDoc } from "firebase/firestore";

function EditProfile({ closeModal }) {
  const userInfo = useSelector((state) => state.userLogging.userInfo);
  const nameRef = useRef();
  const bioRef = useRef();
  const [nameInputValue, setNameInputValue] = useState("");
  const [bioInputValue, setBioInputValue] = useState("");

  const hiddenFileInput = useRef(null);
  const [editedImg, setEditedImg] = useState();
  const dispatch = useDispatch();

  const handleUpload = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (input) => {
    if (input === "name") {
      setNameInputValue(nameRef.current.value);
    } else {
      setBioInputValue(bioRef.current.value);
    }
  };

  const handleSave = () => {
    const updatedInfo = {
      name: nameInputValue || userInfo.name,
      email: userInfo.email,
      description: bioInputValue || userInfo.description,
      avatar: editedImg || userInfo.avatar,
    };

    //get ref of user from firebase that their info is being updated
    const updateUserInfo = async () => {
      let docRef;
      ({ refToReturn: docRef } = await firebaseFetch(
        "users",
        "email",
        "==",
        userInfo.email,
        false,
        false,
        false,
        true
      ));
      await updateDoc(docRef, updatedInfo);
    };
    updateUserInfo();
    dispatch(isLoggedInActions.addUserInfo(updatedInfo));
    closeModal();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.previewContainer}>
        <h1>Profile information</h1>

        <label>Photo</label>
        <div>
          <Avatar
            src={editedImg || userInfo.avatar}
            referrerPolicy="no-referrer"
            sx={{ height: "90px", width: "90px" }}
          />
          <button onClick={handleUpload}>Update</button>
          <input
            type="file"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            accept="image/*"
            onChange={(event) => handleImageChange(event)}
          />
        </div>

        <label>Name</label>
        <div>
          <input
            type="text"
            ref={nameRef}
            onChange={() => handleInputChange("name")}
            placeholder="Enter your name"
            defaultValue={userInfo.name}
          />
        </div>

        <label>Bio</label>
        <div>
          <textarea
            ref={bioRef}
            onChange={() => handleInputChange("bio")}
            defaultValue={userInfo.description}
            placeholder="Tell people about yourself"
            rows={6}
            style={{ resize: "none" }}
          />
        </div>

        <div>
          <button onClick={() => closeModal()}>Close</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
