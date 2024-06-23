import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import Trend from "./Trend/Trend";
import styles from "./Trends.module.css";
import { IoMdTrendingUp } from "react-icons/io";
import SkeletonLoading from "../../TopPosts/SkeletonLoading/SkeletonLoading";

function Trends() {
  const { posts } = useLoaderData();

  //get data from loader function and show the top 4 liked posts

  return (
    <div className={styles.trends}>
      <div className={styles.trendsHeader}>
        <div>
          <IoMdTrendingUp />
        </div>
        <h2>Most Liked Blogs</h2>
      </div>

      <Suspense fallback={<SkeletonLoading />}>
        <Await resolve={posts}>
          {(loadedPosts) => {
            loadedPosts = loadedPosts.posts.map((post) => {
              const userInfo = loadedPosts.fetchedUsers.find(
                (user) => user.email === post.email
              );
              return {
                ...post,
                name: userInfo.name,
                avatar: userInfo.avatar,
              };
            });
            loadedPosts = loadedPosts
              .sort((a, b) => b.likes.length - a.likes.length)
              .slice(0, 4);
            return (
              <ul className={styles.trendList}>
                {loadedPosts.map((post) => {
                  return (
                    <Trend
                      key={post.id}
                      avatar={post.avatar}
                      name={post.name}
                      title={post.title}
                      date={post.date}
                      likesNumber={post.likes.length}
                      id={post.id}
                      category={post.category}
                    />
                  );
                })}
              </ul>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

export default Trends;
