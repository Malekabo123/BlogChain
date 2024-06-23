import styles from "./CategoriesPage.module.css";
import { firebaseFetch } from "../../../store/firebaseFetch";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostSummary from "../../TopPosts/PostSummary/PostSummary";

import { createPortal } from "react-dom";
import Backdrop from "../../CreatePost/PreviewModal/Backdrop/Backdrop";

function CategoriesPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      setLoadingPage(true);

      //get posts for the choosen category
      let fetchedCategoryPosts = [];
      try {
        ({ dataToReturn: fetchedCategoryPosts } = await firebaseFetch(
          "posts",
          "category",
          "==",
          params.category,
          false,
          true,
          true,
          false
        ));
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }

      //users email from fetched posts
      const usersSet = new Set();
      fetchedCategoryPosts.forEach((item) => {
        usersSet.add(item.email);
      });
      const users = Array.from(usersSet);

      //get user info for fetched posts
      let fetchedUser = {};
      let fetchedUsers = [];

      for (const user of users) {
        try {
          ({ dataToReturn: fetchedUser } = await firebaseFetch(
            "users",
            "email",
            "==",
            user,
            false,
            false,
            true,
            false
          ));
          fetchedUsers.push(fetchedUser);
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      }

      setPosts(fetchedCategoryPosts);
      setUsers(fetchedUsers);
      setLoadingPage(false);
    };

    params.category && fetchPostsAndUsers();
  }, [params.category]);

  return (
    <>
      {loadingPage &&
        createPortal(
          <Backdrop isViewerModal={false} />,
          document.getElementById("backdrop-root")
        )}

      <div className={styles.categoryPage}>
        <h1 className={styles.myHeader}>Posts about {params.category}</h1>
        {posts.length === 0 && <p>No posts about {params.category} yet</p>}
        <ul className={styles.postsContainer}>
          {posts.map((post, index) => {
            return (
              <PostSummary
                key={index}
                imgCover={post.imgCover}
                title={post.title}
                content={post.content.replace(/<[^>]*>/g, "")}
                date={post.date}
                id={post.id}
                email={post.email}
                users={users}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default CategoriesPage;
