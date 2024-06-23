import About from "./About/About";
import Intro from "./Intro/Intro";
import Sidebar from "./Sidebar/Sidebar";
import TopPosts from "./TopPosts/TopPosts";
import PostIsSent from "./CreatePost/PostIsSent/PostIsSent";
import { useSelector, useDispatch } from "react-redux";
import { isPublishedActions } from "../store/publishSlice";
import { useEffect } from "react";

function HomePage() {
  const isPublished = useSelector((state) => state.publishMessage.published);
  const dispatch = useDispatch();

  setTimeout(() => {
    isPublished && dispatch(isPublishedActions.changeIsPublished(false));
  }, 4000);

  useEffect(() => {
    return () => {
      isPublished && dispatch(isPublishedActions.changeIsPublished(false));
    };
  }, []);

  return (
    <>
      {isPublished && <PostIsSent />}
      <Intro />

      <About />

      <main className="main">
        <TopPosts />
        <Sidebar />
      </main>
    </>
  );
}

export default HomePage;
