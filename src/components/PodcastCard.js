import { useCallback, useState } from "react";
import Card from "./Card";

import classes from "../styles/PodcastCard.module.css";

function PodcastCard(props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const handleImgLoaded = useCallback(() => {
    setImgLoaded(true);
  });

  return (
    <div className={classes.podcastCardContainer}>
      <div className={classes.podcastImageContainer}>
        <img
          src={props.podcast.img}
          alt="podcast-image"
          loading="lazy"
          onLoad={handleImgLoaded}
        />
        {!imgLoaded && <div className={classes.imgPlaceholder}></div>}
      </div>
      <Card extraClasses={classes.podcastCard}>
        <div className={classes.podcastTitle}>{props.podcast.name}</div>
        <div>Author: {props.podcast.author}</div>
      </Card>
    </div>
  );
}

export default PodcastCard;
