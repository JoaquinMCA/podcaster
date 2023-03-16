import { useCallback, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import LoadingContext from "../store/loading-context";
import PodcastsContext from "../store/podcasts-context";
import Card from "./Card";
import Image from "./Image";

import classes from "../styles/PodcastDetails.module.css";

function PodcastDetails() {
  const params = useParams();
  const url = `details/lookup?id=${params.podcastId}&media=podcast&entity=podcastEpisode&limit=2000`;
  const { data, loading, sendRequest } = useFetch();
  const { loadingHandler } = useContext(LoadingContext);
  const {
    podcasts,
    selectedPodcast,
    checkPodcastsStorage,
    setSelectedPodcast,
  } = useContext(PodcastsContext);
  const navigate = useNavigate();

  /**
   * Check storage when loading component.
   */
  useEffect(() => {
    checkPodcastsStorage();
  }, [checkPodcastsStorage]);

  /**
   * Fetch podcast details.
   */
  const getPodcastDetailsData = useCallback(() => {
    sendRequest(url, "list");
  }, [url, sendRequest]);

  /**
   * Check if there is podcast info in localStorage, use it if exists and is not outdate (1 day old) or fetch it if necessary.
   */
  useEffect(() => {
    if (podcasts) {
      loadingHandler(true);
      if (podcasts.length === 0) {
        // No podcasts data, return to podcast-list
        navigate("/");
      } else {
        let selectedPodcastFound = podcasts?.find(
          (podcast) => podcast.id === params.podcastId
        );

        if (selectedPodcastFound?.episodes) {
          setSelectedPodcast(selectedPodcastFound);

          // No need to refetch, use available localStorage podcasts data
          loadingHandler(false);
        } else {
          // Fetch podcasts episodes
          getPodcastDetailsData();
        }
      }
    }
  }, [
    podcasts,
    params.podcastId,
    loadingHandler,
    navigate,
    getPodcastDetailsData,
    setSelectedPodcast,
  ]);

  /**
   * Parse fetched data.
   */
  useEffect(() => {
    if (data) {
      loadingHandler(false);

      let selectedPodcast = podcasts.find(
        (podcast) => podcast.id === params.podcastId
      );

      if (data?.results[0] && !data.results[0].episodeUrl) {
        data.results.shift();
      }

      const episodesParsed = data?.results?.map((episode) => {
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

      selectedPodcast = {
        ...selectedPodcast,
        episodesCount: data.resultCount || episodesParsed.length,
        episodes: episodesParsed,
      };
      setSelectedPodcast(selectedPodcast);
    }
  }, [
    data,
    loading,
    params.podcastId,
    podcasts,
    setSelectedPodcast,
    loadingHandler,
  ]);

  return (
    <Card extraClasses={classes.podcastCard}>
      <div to={`.`} className={classes.podcastDetails}>
        <Link to={`.`} className={classes.podcastDetailsSection}>
          <Image
            src={selectedPodcast?.img}
            alt="podcast"
            extraClasses={classes.podcastDetailsImage}
          ></Image>
        </Link>
        {selectedPodcast && (
          <>
            <Link
              to={`.`}
              className={
                classes.podcastDetailsSection + " " + classes.podcastTextSection
              }
            >
              <div className={classes.podcastTitle}>{selectedPodcast.name}</div>
              <div className={classes.podcastAuthor}>
                by: {selectedPodcast.author}
              </div>
            </Link>
            <div
              className={
                classes.podcastDetailsSection + " " + classes.podcastTextSection
              }
            >
              <div className={classes.podcastDescriptionTitle}>
                Description:
              </div>
              <div className={classes.podcastDescription}>
                {selectedPodcast.description}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

export default PodcastDetails;
