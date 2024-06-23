import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/RootLoayout";
import HomePage from "./components/HomePage";
import { action as postAction } from "./components/CreatePost/CreatePost";
import CreatePost from "./components/CreatePost/CreatePost";
import { loader as postsLoader } from "./components/TopPosts/TopPosts";
import PreviewContent from "./components/CreatePost/PreviewModal/PreviewContent/PreviewContent";
import Profile from "./components/Profile/Profile";
import CategoriesPage from "./components/Sidebar/CategoriesPage/CategoriesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage />, loader: postsLoader },
      {
        path: ":postId",
        element: <PreviewContent isFullPost={true} />,
      },
      {
        path: "category/:category",
        element: <CategoriesPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "post",
    element: <CreatePost />,
    action: postAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
