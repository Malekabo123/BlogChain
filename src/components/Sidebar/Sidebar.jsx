import styles from "./Sidebar.module.css";
import Topics from "./Topics/Topics";
import Trends from "./Trends/Trends";

function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        <Topics />
        <div className={styles.border}></div>
        <Trends />
      </div>
      <div className={styles.frieren}>
        <img src="/sousou-no-frieren-frieren.gif" alt="frieren" />
      </div>
    </div>
  );
}

export default Sidebar;
