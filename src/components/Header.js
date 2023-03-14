import { Link } from "react-router-dom";


import classes from "../styles/Header.module.css";

function Header() {
  return (
    <h1 className={classes.header}>
      <Link to="./">Podcaster</Link>
    </h1>
  );
}

export default Header;
