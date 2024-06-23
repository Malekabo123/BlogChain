import { createPortal } from "react-dom";
import Backdrop from "../../CreatePost/PreviewModal/Backdrop/Backdrop";
import EditProfile from "./EditProfile/EditProfile";

function ProfileActions({ closeModal }) {
  return (
    <>
      {createPortal(
        <Backdrop onClick={() => closeModal()} isViewerModal={true} />,
        document.getElementById("backdrop-root")
      )}
      {createPortal(
        <EditProfile closeModal={closeModal} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
}

export default ProfileActions;
