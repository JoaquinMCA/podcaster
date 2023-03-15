import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import LoadingContext from "../store/loading-context";
import Card from "./Card";
import Image from "./Image";

import classes from "../styles/PodcastDetails.module.css";

function PodcastDetails(props) {
  const params = useParams();
  const url = `details/lookup?id=${params.podcastId}&media=podcast&entity=podcastEpisode&limit=2000`;
  // https://itunes.apple.com/lookup?id=1535809341
  const { data, loading, error, sendRequest } = useFetch();
  const { loadingHandler } = useContext(LoadingContext);
  const [podcast, setPodcast] = useState([]);

  /**
   * Fetch podcast details.
   */
  const getPodcastDetailsData = useCallback(() => {
    console.log(props.podcast);

    sendRequest(url, "list");
  }, [url, sendRequest]);

  useEffect(() => {
    getPodcastDetailsData();
  }, [getPodcastDetailsData]);

  /**
   * Parse fetched data.
   */
  useEffect(() => {
    if (data) {
      loadingHandler(loading);
      let i = 0;
      const podcastData = data?.results[0];
      let podcastParsed = {
        author: podcastData.artistName,
        trackCount: podcastData.trackCount,
        // description:
      };
      data.results?.splice(0, 1);
      const episodesParsed = data?.results?.map((episode) => {
        i++;
        return {
          id: episode.trackId,
          name: episode.trackName,
          date: episode.releaseDate,
          duration: episode.trackTimeMillis,
          description: episode.description,
          audioSrc: episode.episodeUrl,
          podcastFetchedDate: new Date(),
        };
      });

      podcastParsed = { ...podcastParsed, episodes: episodesParsed };
      setPodcast(podcastParsed);

      console.log(data);
      console.log(podcastParsed);
    }
  }, [data, loadingHandler, loading]);

  /**
   * Update localStorage.
   */
  useEffect(() => {
    localStorage.setItem(`podcast-${podcast.id}`, JSON.stringify(podcast));
  }, [podcast]);

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
