import { Link, useParams } from "react-router-dom";
import Card from "./Card";

import classes from "../styles/PodcastDetails.module.css";

function PodcastDetails(props) {
  const params = useParams();

  return (
    <div>
      <Card>
        <Link to={`.`}>
          {/* TODO IMAGE */}
          <div className={classes.titleContainer}>{params.podcastId}</div>
          <div className={classes.descriptionContainer}></div>
        </Link>
      </Card>
    </div>
  );
}

export default PodcastDetails;
