import { Link } from "react-router-dom";
import styles from "./Trend.module.css";
import { Avatar } from "@mui/material";

function Trend({ avatar, name, title, date, likesNumber, id, category }) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  date = date.toDate().toLocaleDateString("en-GB", options);

  return (
    <li className={styles.trend}>
      <Link to={`/${id}`}>
        <div className={styles.author}>
          <Avatar src={avatar} referrerPolicy="no-referrer" />
          <p>{name}</p>
        </div>

        <div className={styles.wrapFlex}>
          <p className={styles.title}>{title}</p>
          <p className={styles.category}>{category}</p>
        </div>

        <div className={styles.blogInfo}>
          <span>{date}</span>
          <span className={styles.point}>·</span>
          <span> {likesNumber} likes</span>
        </div>
      </Link>
    </li>
  );
}

export default Trend;
