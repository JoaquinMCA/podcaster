import { Link, useParams } from "react-router-dom";
import Card from "./Card";
import Image from "./Image";

import classes from "../styles/PodcastDetails.module.css";

function PodcastDetails(props) {
  const params = useParams();

  /**
   * Fetch podcast details.
   */
  const getPodcastData = useCallback(() => {
    sendRequest(props.podcast, "list");
  }, [url, sendRequest]);

  return (
    <Card extraClasses={classes.podcastCard}>
      <div to={`.`} className={classes.podcastDetails}>
        <Link to={`.`} className={classes.podcastDetailsSection}>
          <Image
            src={""}
            alt="podcast"
            extraClasses={classes.podcastDetailsImage}
          ></Image>
        </Link>

        <Link
          to={`.`}
          className={
            classes.podcastDetailsSection + " " + classes.podcastTextSection
          }
        >
          <div className={classes.podcastTitle}>asfasfasf</div>
          <div className={classes.podcastAuthor}>by: adadd</div>
        </Link>
        <div
          className={
            classes.podcastDetailsSection + " " + classes.podcastTextSection
          }
        >
          <div className={classes.podcastDescriptionTitle}>Description:</div>
          <div className={classes.podcastDescription}>
            trolasfknasofknasfnka afnfapsfkn asfknasfp naspfn apsf{" "}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default PodcastDetails;
