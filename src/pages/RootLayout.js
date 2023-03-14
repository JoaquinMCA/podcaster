import { Outlet } from "react-router-dom";
import Header from "../components/Header";

import classes from "../styles/RootLayout.module.css";

function RootLayout() {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
