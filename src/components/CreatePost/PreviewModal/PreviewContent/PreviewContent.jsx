import styles from "./PreviewContent.module.css";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import db from "../../../../store/firebase";
import { firebaseFetch } from "../../../../store/firebaseFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
import { isPublishedActions } from "../../../../store/publishSlice";
import { updatePostActions } from "../../../../store/updatePostSlice";
import PageBody from "./PageBody/PageBody";

function PreviewContent({ formData, triggerPreview, isFullPost }) {
  const [loadingPage, setLoadingPage] = useState(false);
  const [post, setPost] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [updateDocDependencies, setUpdateDocDependencies] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const { postId } = useParams();
  const userInfo = useSelector((state) => state.userLogging);
  const isToUpdateId = useSelector((state) => state.updatePost.postData.id);

  //preview after creating/updating the post OR open the whole post to read
  if (isFullPost) {
    formData = post;
  }

  //if user is logged in they can update their own posts
  let allowedToUpdatePost = false;
  if (userInfo?.userInfo.email === formData?.email && isFullPost) {
    allowedToUpdatePost = true;
  }

  useEffect(() => {
    const fetchPost = async () => {
      setLoadingPage(true);
      console.log("here");
      let fetchedPost = {};
      let fetchedUserDetails = {};
      let docRef, newLikes, docRef2, newLikedPost;

      //get ref and data for this post to render the post and calculate likes
      try {
        ({ dataToReturn: fetchedPost, refToReturn: docRef } =
          await firebaseFetch(
            "posts",
            "id",
            "==",
            postId,
            false,
            false,
            true,
            true
          ));
        setPost(fetchedPost);
        newLikes = fetchedPost.likes;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }

      //get user details that created the liked post
      try {
        ({ dataToReturn: fetchedUserDetails } = await firebaseFetch(
          "users",
          "email",
          "==",
          fetchedPost.email,
          false,
          false,
          true,
          false
        ));
        const { avatar, name } = fetchedUserDetails;
        setUserDetails({ avatar, name });
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }

      if (!userInfo.userInfo.email) {
        setUpdateDocDependencies({ likesNumber: newLikes.length });
        setLoadingPage(false);
        return;
      }
      //get current user info to update like status
      try {
        ({ dataToReturn: newLikedPost, refToReturn: docRef2 } =
          await firebaseFetch(
            "users",
            "email",
            "==",
            userInfo.userInfo.email,
            false,
            false,
            true,
            true
          ));
        newLikedPost = newLikedPost.likedPosts;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }

      if (newLikes.includes(userInfo.userInfo.email)) {
        setIsLiked(true);
      }

      //set the returned values from firebase for future use
      const dataToUpdateDoc = {
        docRefForPost: docRef,
        whoLikedThisPost: newLikes,
        docRefForUser: docRef2,
        postsThisUserLiked: newLikedPost,
        likesNumber: newLikes.length,
      };

      setUpdateDocDependencies(dataToUpdateDoc);
      setLoadingPage(false);
    };

    isFullPost && fetchPost();
  }, [postId, userInfo.userInfo.email, isFullPost]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePublish = async () => {
    try {
      setLoadingPage(true);

      //get ref for post that needs to be updated, after publishing the post is updated
      if (isToUpdateId) {
        let docRef;
        ({ refToReturn: docRef } = await firebaseFetch(
          "posts",
          "id",
          "==",
          isToUpdateId,
          false,
          false,
          false,
          true
        ));
        updateDoc(docRef, formData);
      } else {
        //if it's not being updated then it's being added for the 1st time
        const collectionRef = collection(db, "posts");
        await addDoc(collectionRef, formData);
      }

      dispatch(isPublishedActions.changeIsPublished(true));
      navigate("/");

      //when is published is true the message will pop up in the homepage
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const clickLike = async () => {
    //add user email to likes that belongs to this post
    const tt = updateDocDependencies.whoLikedThisPost.includes(
      userInfo.userInfo.email
    );
    const addOrRemoveFromPost =
      !isLiked && !tt
        ? [...updateDocDependencies.whoLikedThisPost, userInfo.userInfo.email]
        : updateDocDependencies.whoLikedThisPost.filter(
            (item) => item !== userInfo.userInfo.email
          );

    //update the likes for this post
    updateDoc(updateDocDependencies.docRefForPost, {
      likes: addOrRemoveFromPost,
    });

    //add post id to posts that user liked
    const cc = updateDocDependencies.postsThisUserLiked.includes(formData.id);
    const addOrRemoveFromUser =
      !isLiked && !cc
        ? [...updateDocDependencies.postsThisUserLiked, formData.id]
        : updateDocDependencies.postsThisUserLiked.filter(
            (item) => item !== formData.id
          );

    //update the posts this user liked
    updateDoc(updateDocDependencies.docRefForUser, {
      likedPosts: addOrRemoveFromUser,
    });

    setUpdateDocDependencies({
      ...updateDocDependencies,
      whoLikedThisPost: addOrRemoveFromPost,
      postsThisUserLiked: addOrRemoveFromUser,
      likesNumber: addOrRemoveFromPost.length,
    });

    setIsLiked((prev) => !prev);
  };

  const updatePost = () => {
    //redirect the user to post page to update the post, send post data to be rendered in the preview page
    delete formData.date;
    dispatch(updatePostActions.addPostData(formData));
    navigate("/post");
  };

  const deletePost = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      setLoadingPage(true);
      try {
        await deleteDoc(
          doc(db, "posts", updateDocDependencies.docRefForPost.id)
        );
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
      setLoadingPage(false);
      navigate("/");
    }
  };

  return (
    <>
      {loadingPage &&
        createPortal(
          <Backdrop isViewerModal={false} />,
          document.getElementById("backdrop-root")
        )}
      <div
        className={`${
          isFullPost ? styles.fullPostPage : styles.previewContainer
        }`}
      >
        {formData && (
          <PageBody
            formData={formData}
            allowedToUpdatePost={allowedToUpdatePost}
            updatePost={updatePost}
            deletePost={deletePost}
            userDetails={userDetails}
            userInfo={userInfo}
            isFullPost={isFullPost}
            updateDocDependencies={updateDocDependencies}
            isLiked={isLiked}
            clickLike={clickLike}
            handlePublish={handlePublish}
            triggerPreview={triggerPreview}
          />
        )}
      </div>
    </>
  );
}

export default PreviewContent;
