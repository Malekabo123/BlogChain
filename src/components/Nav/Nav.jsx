import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import { GiCrossedChains } from "react-icons/gi";
import { auth, googleProvider } from "../../store/firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { isLoggedInActions } from "../../store/loggingSlice";
import db from "../../store/firebase";
import { collection, addDoc } from "firebase/firestore";
import { firebaseFetch } from "../../store/firebaseFetch";

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //if log in has succeeded
      if (user) {
        const userInfo = {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          description: "",
          likedPosts: [],
        };

        let fetchedUser = {};

        //add user to firebase if they aren't already added
        const addUser = async () => {
          try {
            const collectionRef = collection(db, "users");
            await addDoc(collectionRef, userInfo);
          } catch (error) {
            console.log(error);
            throw new Error(error);
          }
        };

        //check if user info is already in firebase
        const fetchUser = async () => {
          ({ dataToReturn: fetchedUser } = await firebaseFetch(
            "users",
            "email",
            "==",
            user.email,
            false,
            false,
            true,
            false
          ));

          if (Object.keys(fetchedUser).length === 0) {
            addUser();
            dispatch(isLoggedInActions.addUserInfo(userInfo));
          } else {
            dispatch(isLoggedInActions.addUserInfo(fetchedUser));
          }
        };
        fetchUser();

        dispatch(isLoggedInActions.changeIsLoggedIn(true));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <NavLink to="/" className={styles.logo}>
          <GiCrossedChains />
          <div>BlogChain</div>
        </NavLink>

        <nav>
          <ul className={styles.navs}>
            {isLoggedIn && (
              <li>
                <NavLink
                  to="post"
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                >
                  Write
                </NavLink>
              </li>
            )}
            <li>
              {!isLoggedIn && (
                <button onClick={handleGoogleAuth}>Sign in</button>
              )}

              {isLoggedIn && (
                <NavLink
                  to="profile"
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                >
                  <MdAccountCircle size={40} />
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Nav;
