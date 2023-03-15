import Card from "./Card";
import Image from "./Image";

import classes from "../styles/PodcastCard.module.css";

function PodcastCard(props) {
  return (
    <div className={classes.podcastCardContainer}>
      <Image
        alt="podcast"
        src={props.podcast.img}
        extraClasses={classes.podcastImageContainer}
      ></Image>

      <Card extraClasses={classes.podcastCard}>
        <div className={classes.podcastTitle}>{props.podcast.name}</div>
        <div>Author: {props.podcast.author}</div>
      </Card>
    </div>
  );
}

export default PodcastCard;
