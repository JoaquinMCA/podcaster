import classes from "../styles/Loader.module.css";

function Loader() {
  return (
    <div className={classes.loader}>
      <span className={classes.loaderInner}></span>
      <span className={classes.loaderOuter}></span>
    </div>
  );
}

export default Loader;
