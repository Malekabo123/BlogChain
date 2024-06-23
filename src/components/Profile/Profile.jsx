import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import ProfileActions from "./ProfileActions/ProfileActions";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import MyPosts from "./MyPosts/MyPosts";
import { signOut } from "firebase/auth";
import { auth } from "../../store/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoggedInActions } from "../../store/loggingSlice";
import LikedPosts from "./LikedPosts/LikedPosts";
import Backdrop from "../CreatePost/PreviewModal/Backdrop/Backdrop";
import { createPortal } from "react-dom";
import { firebaseFetch } from "../../store/firebaseFetch";

function Profile() {
  const userInfo = useSelector((state) => state.userLogging.userInfo);
  const [triggerModal, setTriggerModal] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoadingPage(true);

    const fetchPosts = async () => {
      let fetchedMyPosts = [];
      let fetchedLikedPosts = [];
      let fetchedUsers = [];

      //fetch my posts
      try {
        ({ dataToReturn: fetchedMyPosts } = await firebaseFetch(
          "posts",
          "email",
          "==",
          userInfo.email,
          false,
          true,
          true,
          false
        ));
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }

      //fetch posts I liked
      try {
        ({ dataToReturn: fetchedLikedPosts } = await firebaseFetch(
          "posts",
          "likes",
          "array-contains",
          userInfo.email,
          false,
          true,
          true,
          false
        ));
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }

      //fetch user info for liked posts creator
      try {
        ({ dataToReturn: fetchedUsers } = await firebaseFetch(
          "users",
          "",
          "",
          "",
          true,
          true,
          false,
          false
        ));
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }

      fetchedLikedPosts = fetchedLikedPosts.map((post) => {
        const userInfo = fetchedUsers.find((user) => user.email === post.email);
        return {
          ...post,
          name: userInfo.name,
          avatar: userInfo.avatar,
        };
      });

      setMyPosts(fetchedMyPosts);
      setLikedPosts(fetchedLikedPosts);
      setLoadingPage(false);
    };

    userInfo.email && fetchPosts();
  }, [userInfo.email]);

  const openModal = () => {
    setTriggerModal(true);
  };

  const closeModal = () => {
    setTriggerModal(false);
  };

  const handleLogOut = async () => {
    if (confirm("Are you sure you want to log out?")) {
      try {
        await signOut(auth);
        dispatch(isLoggedInActions.changeIsLoggedIn(false));
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      {loadingPage &&
        createPortal(
          <Backdrop isViewerModal={false} />,
          document.getElementById("backdrop-root")
        )}
      <div className={styles.profile}>
        {triggerModal && <ProfileActions closeModal={closeModal} />}
        <div className={styles.userInfoContainer}>
          <div className={styles.imgContainer}>
            <Avatar
              src={userInfo.avatar}
              referrerPolicy="no-referrer"
              className={styles.avatar}
            />
          </div>

          <p>{userInfo.name}</p>
          <p>{userInfo.email}</p>

          <div className={styles.actions}>
            <button onClick={openModal} className={styles.editProfile}>
              Edit Profile
            </button>
            <button onClick={handleLogOut} className={styles.editProfile}>
              Log out
            </button>
          </div>
        </div>

        <hr className={styles.border} />

        <div className={styles.profileBody}>
          <h1>Bio</h1>
          <p>{userInfo.description ? userInfo.description : "No bio yet"}</p>
          <h1>Posts you created</h1>
          {myPosts.length === 0 && <p>No created posts yet</p>}
          <MyPosts
            name={userInfo.name}
            avatar={userInfo.avatar}
            myPosts={myPosts}
          />

          <h1>Posts you liked</h1>
          {likedPosts.length === 0 && <p>No liked posts yet</p>}
          <LikedPosts likedPosts={likedPosts} />
        </div>
      </div>
    </>
  );
}

export default Profile;
