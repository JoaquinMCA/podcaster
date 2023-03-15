import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../components/Header";
import LoadingContext from "../store/loading-context";
import { IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import classes from "../styles/RootLayout.module.css";

function RootLayout() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const mainRef = useRef(null);
  const ctx = useContext(LoadingContext);
  const location = useLocation();

  const checkShowScrollButton = useCallback(() => {
    return (
      mainRef.current?.scrollHeight > mainRef.current?.clientHeight &&
      location.pathname === "/"
    );
  }, [location.pathname]);

  const handleShowScrollButton = useCallback(() => {
    const showingButton = checkShowScrollButton();
    setShowScrollButton(showingButton);
  }, [checkShowScrollButton]);

  useEffect(() => {
    handleShowScrollButton();
  }, [ctx.loading, ctx.filtering, location, handleShowScrollButton]);

  useEffect(() => {
    window.addEventListener("resize", handleShowScrollButton, false);
    return () => {
      window.removeEventListener("resize", handleShowScrollButton, false);
    };
  }, [handleShowScrollButton]);

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
            <IconButton
              onClick={scrollToTop}
              color="primary"
              aria-label="Go top"
            >
              <ArrowUpwardIcon />
            </IconButton>
          </div>
        )}
      </main>
    </>
  );
}

export default RootLayout;
