import styles from "./Topics.module.css";
import { categories } from "../../../store/categories";
import { Link } from "react-router-dom";

function Topics() {
  return (
    <div className={styles.topics}>
      <h2>Blog trends you may be interested in</h2>
      <ul className={styles.topicsItems}>
        {categories.slice(1, 6).map((category) => {
          return (
            <li key={category.value}>
              <Link to={`category/${category.value}`}>{category.value}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Topics;
