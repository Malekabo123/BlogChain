import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/Nav";

function RootLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default RootLayout;
