import { Outlet } from "react-router-dom";
import PodcastDetails from "./PodcastDetails";

import classes from "../styles//Podcast.module.css";

function Podcast() {
  return (
    <div className={classes.podcastContainer}>
      <section className={classes.detailsSection}>
        <PodcastDetails />
      </section>
      <section className={classes.outletSection}>
        <Outlet />
      </section>
    </div>
  );
}

export default Podcast;
