import styles from "./MyPosts.module.css";
import PostSummary from "../../TopPosts/PostSummary/PostSummary";

function MyPosts({ name, avatar, myPosts }) {
  return (
    <div className={styles.myPosts}>
      <ul>
        {myPosts.map((post) => {
          return (
            <PostSummary
              imgCover={post.imgCover}
              title={post.title}
              content={post.content.replace(/<[^>]*>/g, "")}
              date={post.date}
              id={post.id}
              key={post.id}
              name={name}
              avatar={avatar}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default MyPosts;
