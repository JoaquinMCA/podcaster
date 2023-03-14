import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

import classes from "../styles/RootLayout.module.css";

function RootLayout() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const mainRef = useRef(null);

  const handleResize = () => {
    setShowScrollButton(checkShowScrollButton());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const checkShowScrollButton = () => {
    return mainRef.current?.scrollHeight > mainRef.current?.clientHeight;
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
