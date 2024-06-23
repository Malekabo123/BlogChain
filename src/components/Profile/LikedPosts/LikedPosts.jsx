import styles from "./LikedPosts.module.css";
import PostSummary from "../../TopPosts/PostSummary/PostSummary";

function LikedPosts({ likedPosts }) {
  return (
    <div className={styles.likedPosts}>
      <ul>
        {likedPosts.map((post) => {
          return (
            <PostSummary
              imgCover={post.imgCover}
              title={post.title}
              content={post.content.replace(/<[^>]*>/g, "")}
              date={post.date}
              id={post.id}
              key={post.id}
              name={post.name}
              avatar={post.avatar}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default LikedPosts;
