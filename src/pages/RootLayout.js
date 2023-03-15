import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../components/Header";
import LoadingContext from "../store/loading-context";

import classes from "../styles/RootLayout.module.css";

function RootLayout() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const mainRef = useRef(null);
  const ctx = useContext(LoadingContext);
  const location = useLocation();

  const handleShowScrollButton = () => {
    const showingButton = checkShowScrollButton();
    setShowScrollButton(showingButton);
  };

  useEffect(() => {
    handleShowScrollButton();
  }, [ctx.loading, location]);

  useEffect(() => {
    window.addEventListener("resize", handleShowScrollButton, false);
    return () => {
      window.removeEventListener("resize", handleShowScrollButton, false);
    };
  }, [handleShowScrollButton]);

  const checkShowScrollButton = () => {
    return (
      mainRef.current?.scrollHeight > mainRef.current?.clientHeight &&
      location.pathname === "/"
    );
  };

  const scrollToTop = () => {
    mainRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      <main className={classes.main} ref={mainRef}>
        <Outlet />
        {showScrollButton && (
          <div className={classes.toTopButtonContainer}>
            <button onClick={scrollToTop} className={classes.toTopButton}>
              To TOp!
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default RootLayout;
