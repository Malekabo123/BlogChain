import { Skeleton } from "@mui/material";
import styles from "./SkeletonLoading.module.css";

function SkeletonLoading() {
  return (
    <div className={styles.skeletonLoading}>
      <div className={styles.emptyImg}>
        <Skeleton animation="wave" variant="rounded" />
      </div>

      <div className={styles.emptyContent}>
        <Skeleton animation="wave" variant="text" />

        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="text" />

        <div className={styles.emptyUser}>
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
          <Skeleton animation="wave" variant="text" height={20} />
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoading;
