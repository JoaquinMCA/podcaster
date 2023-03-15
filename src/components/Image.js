import { useCallback, useState } from "react";

import classes from "../styles/Image.module.css";

function Image(props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const handleImgLoaded = useCallback(() => {
    setImgLoaded(true);
  }, []);

  return (
    <div
      className={`${props.extraClasses ? props.extraClasses : ""} ${
        classes.imageContainer
      } `}
    >
      <img
        src={props.src}
        alt={props.alt || "alt"}
        loading="lazy"
        onLoad={handleImgLoaded}
      />
      {!imgLoaded && <div className={classes.imgPlaceholder}></div>}
    </div>
  );
}

export default Image;
