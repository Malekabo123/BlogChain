import PreviewContent from "./PreviewContent/PreviewContent";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop/Backdrop";

function PreviewModal({ triggerPreview, formData }) {
  return (
    <>
      {createPortal(
        <Backdrop onClick={() => triggerPreview(false)} isViewerModal={true} />,
        document.getElementById("backdrop-root")
      )}
      {createPortal(
        <PreviewContent
          formData={formData}
          triggerPreview={triggerPreview}
          isFullPost={false}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
}

export default PreviewModal;
