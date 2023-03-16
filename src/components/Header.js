import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LoadingContext from "../store/loading-context";
import classes from "../styles/Header.module.css";
import Loader from "./Loader";

function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const { loading } = useContext(LoadingContext);

  /**
   * Show/hide loader based on LoadingContext.
   */
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <h1 className={classes.header}>
      <Link to="./">Podcaster</Link>
      {isLoading && <Loader />}
      {!isLoading && <span></span>}
    </h1>
  );
}

export default Header;
