/* eslint-disable react/prop-types */
import styles from "./PageBody.module.css";
import { calculatePublishDate } from "../../../../../store/calculatePublishDate";
import { calculateEstimatedReadingTime } from "../../../../../store/calculateEstimatedReadingTime";
import { calculateWords } from "../../../../../store/calculateWords";
import { modules, formats } from "../../../../../store/texteditorFeatures";
import { Avatar } from "@mui/material";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import AddedFormElements from "../../AddedFormElements/AddedFormElements";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PageBody({
  formData,
  allowedToUpdatePost,
  updatePost,
  deletePost,
  userDetails,
  userInfo,
  isFullPost,
  updateDocDependencies,
  isLiked,
  clickLike,
  handlePublish,
  triggerPreview,
}) {
  //get the date from firebase and convert it, then show it in a meaningful way
  const numberOfWords = calculateWords(
    formData.content.replace(/<[^>]*>/g, ""),
    formData.otherContentAndImages
  );

  const { estimatedTime, timeUnit: readingTimeUnit } =
    calculateEstimatedReadingTime(numberOfWords);

  const { publishDate, timeUnit: publishTimeUnit } = calculatePublishDate(
    formData.date,
    isFullPost
  );

  return (
    <div className={styles.previewContent}>
      <div className={styles.category}>{formData.category}</div>

      <div className={styles.title}>
        <h1>{formData.title}</h1>
      </div>

      {formData.subTitle && (
        <div className={styles.title}>
          <h2>{formData.subTitle}</h2>
        </div>
      )}

      {allowedToUpdatePost && (
        <div className={styles.userBar}>
          <button onClick={updatePost}>Update Post</button>
          <button onClick={deletePost}>Delete Post</button>
        </div>
      )}

      <div className={styles.userBar}>
        <div className={styles.user}>
          <Avatar
            src={userDetails.avatar || userInfo.userInfo.avatar}
            referrerPolicy="no-referrer"
          />

          <div className={styles.nameNdate}>
            <div>{userDetails.name || userInfo.userInfo.name}</div>
            <div>
              <span>
                {estimatedTime} {readingTimeUnit} read •{" "}
              </span>
              <span>
                {publishDate} {publishTimeUnit && `${publishTimeUnit} ago`}
              </span>
            </div>
          </div>
        </div>
        {isFullPost && (
          <div className={styles.like}>
            <p className={styles.swapIn}>{updateDocDependencies.likesNumber}</p>
            {userInfo.isLoggedIn && (
              <>
                {!isLiked && (
                  <FaRegHeart size={30} onClick={clickLike} color="tomato" />
                )}
                {isLiked && (
                  <FaHeart size={30} onClick={clickLike} color="tomato" />
                )}
              </>
            )}
            {!userInfo.isLoggedIn && <FaHeart size={30} color="tomato" />}
          </div>
        )}
      </div>

      <div className={styles.border}></div>

      {formData.imgCover && (
        <div className={styles.imgContainer}>
          <img src={formData.imgCover} alt="cover" className={styles.cover} />
        </div>
      )}

      <div className={styles.content}>
        <ReactQuill
          theme="bubble"
          modules={modules}
          formats={formats}
          value={formData.content}
          className="previewQuill"
          readOnly
        />
      </div>

      <AddedFormElements otherElements={formData.otherContentAndImages} />

      {!isFullPost && (
        <div className={styles.actions}>
          <button className={styles.publishButton} onClick={handlePublish}>
            Publish
          </button>
          <button
            className={styles.backButton}
            onClick={() => triggerPreview(false)}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default PageBody;
