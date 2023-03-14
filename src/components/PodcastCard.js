import { useRef } from "react";
import Card from "./Card";

import classes from "../styles/PodcastCard.module.css";

function PodcastCard(props) {
  return (
    <div className={classes.podcastCardContainer}>
      <div className={classes.podcastImageContainer}>
        <img src={require("../zara-mock-image.jpeg")} alt="podcast-image" />
      </div>
      <Card extraClasses={classes.podcastCard}>
        <div className={classes.podcastTitle}>Podcast name</div>
        <div>Author: author</div>
      </Card>
    </div>
  );
}

export default PodcastCard;
