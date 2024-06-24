import PostSummary from "./PostSummary/PostSummary";
import styles from "./TopPosts.module.css";
import { useLoaderData, defer, Await } from "react-router-dom";
import { Suspense } from "react";
import SkeletonLoading from "./SkeletonLoading/SkeletonLoading";
import { firebaseFetch } from "../../store/firebaseFetch";

function TopPosts() {
  const { posts } = useLoaderData();

  //get posts from loader and sort them by date from newest to oldest

  return (
    <div className={styles.topPosts}>
      <h1>DISCOVER OUR LATEST POSTS</h1>

      <Suspense fallback={<SkeletonLoading />}>
        <Await resolve={posts}>
          {(loadedPosts) => {
            return (
              <ul>
                {loadedPosts.posts
                  .sort((a, b) => {
                    return (
                      a.date.toDate().getTime() - b.date.toDate().getTime()
                    );
                  })
                  .reverse()
                  .map((post, index) => {
                    return (
                      <PostSummary
                        key={index}
                        imgCover={post.imgCover}
                        title={post.title}
                        content={post.content.replace(/<[^>]*>/g, "")}
                        date={post.date}
                        id={post.id}
                        email={post.email}
                        users={loadedPosts.fetchedUsers}
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

export default TopPosts;

async function loadPosts() {
  //get every document in the posts collection from firebase
  let posts = [];
  ({ dataToReturn: posts } = await firebaseFetch(
    "posts",
    "email",
    "==",
    "user",
    true,
    true,
    false,
    false
  ));

  //get users email
  const usersSet = new Set();
  posts.forEach((item) => {
    usersSet.add(item.email);
  });
  const users = Array.from(usersSet);

  //get users details
  let fetchedUser = {};
  let fetchedUsers = [];

  for (const user of users) {
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
  }

  return { posts, fetchedUsers };
}

export async function loader() {
  return defer({
    posts: loadPosts(),
  });
}
