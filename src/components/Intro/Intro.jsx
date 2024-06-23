import { useEffect } from "react";
import styles from "./Intro.module.css";
import { useState } from "react";

function Intro() {
  const [colorClass, setColorClass] = useState(true);

  //change class to start animation of fern
  useEffect(() => {
    setTimeout(() => {
      setColorClass(false);
    }, 2000);
  }, []);

  return (
    <div className={styles.intro}>
      <div className={styles.yellow}>
        <span>SHOW</span>
      </div>
      <div className={!colorClass ? styles.disciplineBlack : undefined}>
        <span>DISCIPLINE</span>
      </div>
      <div
        className={`${styles.fern} ${
          colorClass ? styles.hideFern : styles.slideFern
        }`}
      >
        <img src="/fernn-re.png" alt="Fern" />
      </div>
    </div>
  );
}

export default Intro;
