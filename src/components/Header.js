import { useState } from "react";
import { Link } from "react-router-dom";

import Loader from "./Loader";
import classes from "../styles/Header.module.css";

function Header() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <h1 className={classes.header}>
      <Link to="./">Podcaster</Link>
      {isLoading && <Loader />}
      {!isLoading && <span></span>}
    </h1>
  );
}

export default Header;
