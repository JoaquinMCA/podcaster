
import { Link } from "react-router-dom";

import PodcastCard from "../components/PodcastCard";

import classes from "../styles/PodcastList.module.css";

function PodcastList() {
  const mockPodcasts = [
    { id: 1, name: "Podcast-1" },
    { id: 2, name: "Podcast-2" },
    { id: 3, name: "Podcast-3" },
    { id: 4, name: "Podcast-4" },
    { id: 5, name: "Podcast-5" },
    { id: 6, name: "Podcast-6" },
    { id: 7, name: "Podcast-7" },
    { id: 8, name: "Podcast-8" },
    { id: 9, name: "Podcast-9" },
  ];
  return (
    <>
      <div className={classes.searchContainer}></div>
      <ul className={classes.podcastList}>
        {mockPodcasts.map((podcast) => (
          <li key={podcast.id} className={classes.podcastCardContainer}>
            <Link to={`podcast/${podcast.id}`} className={classes.podcastCard}>
              <PodcastCard></PodcastCard>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PodcastList;
