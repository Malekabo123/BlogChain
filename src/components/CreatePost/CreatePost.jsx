import { Form, Link } from "react-router-dom";
import styles from "./CreatePost.module.css";
import PostForm from "./PostForm/PostForm";
import CoverImage from "./CoverImage/CoverImage";
import { useEffect, useState } from "react";
import PreviewModal from "./PreviewModal/PreviewModal";
import { useDispatch, useSelector } from "react-redux";
import { updatePostActions } from "../../store/updatePostSlice";
import { calculateObjectSize } from "../../store/calculateObjectSize";

function generateId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function CreatePost() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState();
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const userInfo = useSelector((state) => state.userLogging.userInfo);
  const postData = useSelector((state) => state.updatePost.postData);
  const dispatch = useDispatch();

  useEffect(() => {
    //remove post data from preview page when user leaves the post page
    return () => {
      dispatch(updatePostActions.addPostData({}));
    };
  }, []);

  const triggerPreview = (isShown) => {
    setShowModal(isShown);
  };

  const handleSubmit = (event) => {
    setFormIsSubmitted(true);

    //gather post data from the form
    const data = Object.fromEntries(new FormData(event.target));

    //filter the contents and images that ends with a number and add them as an array
    //this way they will be sorted here to show them later in the same order they were uploaded
    const otherElements = Object.entries(data)
      .filter(([key]) => /^(content|img)\d+$/.test(key))
      .map(([key, value]) => ({ [key]: value }));

    const modifiedData = {
      id: generateId(),
      email: userInfo.email,
      title: data.title,
      likes: [],
      subTitle: data.subTitle,
      category: data.category.replace(/-/g, " "),
      content: data.content,
      imgCover: data.imgCover,
      date: new Date(),
      otherContentAndImages: otherElements,
    };

    //if these are empty don't allow to continue publishing/previewing
    if (
      !modifiedData.title ||
      !modifiedData.category ||
      !modifiedData.content.replace(/<[^>]*>/g, "")
    ) {
      return;
    }

    const size = calculateObjectSize(modifiedData);
    //console.log(size);
    if (size > 1000000) {
      alert(
        "Post size exceeded the allowed size, please use lower quality images"
      );
      return;
    }

    triggerPreview(true);

    setFormData(modifiedData);
  };

  return (
    <div className={styles.createPost}>
      {showModal && (
        <PreviewModal triggerPreview={triggerPreview} formData={formData} />
      )}

      <div className={styles.postContainer}>
        <h2>Create Post</h2>

        <Form method="post" className={styles.postForm} onSubmit={handleSubmit}>
          <div className={styles.postBody}>
            <PostForm formIsSubmitted={formIsSubmitted} postData={postData} />
            <CoverImage imgCover={postData.imgCover} />
          </div>

          <div className={styles.footer}>
            <div className={styles.discard}>
              <Link to="/">Discard</Link>
            </div>
            <div>
              <button className={styles.button}>Preview</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreatePost;

// eslint-disable-next-line no-empty-pattern
export async function action({}) {
  return null;
}
