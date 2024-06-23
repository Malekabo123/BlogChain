import { Link, useLoaderData } from "react-router-dom";
import styles from "./PostSummary.module.css";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

function PostSummary({
  imgCover,
  title,
  content,
  date,
  id,
  email,
  users,
  name,
  avatar,
}) {
  let corner;
  if (email) {
    corner = Math.floor(Math.random() * 4) + 1;
  }
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    //get user info that created this post
    users &&
      users.forEach((user) => {
        if (email === user.email) {
          const { avatar, name } = user;

          setUserDetails({ avatar, name });
        }
      });
  }, [users, email]);

  const options = { day: "numeric", month: "short", year: "numeric" };
  const publishDate = date.toDate().toLocaleDateString("en-GB", options);

  return (
    <>
      <li className={styles.post}>
        <Link to={`/${id}`}>
          {imgCover && (
            <div className={styles.imgContainer}>
              <div
                className={`${styles.postImg} ${styles["postImg" + corner]}`}
                style={{ backgroundImage: `url(${imgCover})` }}
              ></div>
              <svg
                className={styles.flt_svg}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="flt_tag">
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="5"
                      result="blur"
                    />
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                      result="flt_tag"
                    />
                    <feComposite
                      in="SourceGraphic"
                      in2="flt_tag"
                      operator="atop"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          )}
          <div
            className={`${styles.summaryContainer} ${
              !imgCover && styles.noCover
            }`}
          >
            <h2>{title}</h2>
            <p>{content} </p>
            <div className={styles.postFooter}>
              <div className={styles.userContainer}>
                <Avatar
                  src={userDetails.avatar || avatar}
                  referrerPolicy="no-referrer"
                />
                <span>{userDetails.name || name}</span>
              </div>
              <div className={styles.border}></div>
              <span>{publishDate}</span>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}

export default PostSummary;
