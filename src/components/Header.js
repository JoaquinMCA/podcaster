import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "./Loader";
import LoadingContext from "../store/loading-context";
import classes from "../styles/Header.module.css";

function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const ctx = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(ctx.loading);
  }, [ctx.loading]);

  return (
    <h1 className={classes.header}>
      <Link to="./">Podcaster</Link>
      {isLoading && <Loader />}
      {!isLoading && <span></span>}
    </h1>
  );
}

export default Header;
