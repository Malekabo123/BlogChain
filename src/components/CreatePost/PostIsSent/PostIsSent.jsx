import styles from "./PostIsSent.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function PostIsSent() {
  return (
    <div className={styles.postIsSent}>
      <CheckCircleIcon style={{ color: "#5cb85c", fontSize: "2.2rem" }} />
      <p>Your Post Has Been Sent Successfully</p>
    </div>
  );
}

export default PostIsSent;
