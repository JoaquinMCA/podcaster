import { useCallback, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import LoadingContext from "../store/loading-context";
import PodcastsContext from "../store/podcasts-context";
import Card from "./Card";
import Image from "./Image";

import environment from "../environment";
import classes from "../styles/PodcastDetails.module.css";

function PodcastDetails() {
  const params = useParams();
  const url = environment.production
    ? `${environment.corsUrl}${encodeURIComponent(
        environment.podcastEpisodesBaseUrl +
          params.podcastId +
          environment.podcastEpisodesParams
      )}`
    : environment.podcastEpisodesBaseUrl +
      params.podcastId +
      environment.podcastEpisodesParams;
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
    const storedPodcasts = checkPodcastsStorage();

    if (storedPodcasts) {
      loadingHandler(true);
      if (storedPodcasts.length === 0) {
        // No podcasts data, return to podcast-list
        navigate("/");
      } else {
        let selectedPodcastFound = storedPodcasts?.find(
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
  }, []);

  /**
   * Fetch podcast details.
   */
  const getPodcastDetailsData = useCallback(() => {
    sendRequest(url, "details");
  }, [url, sendRequest]);

  /**
   * Parse fetched data.
   */
  useEffect(() => {
    if (data) {
      const parsedData = environment.parseFn(data);

      loadingHandler(false);

      let selectedPodcast = podcasts.find(
        (podcast) => podcast.id === params.podcastId
      );

      if (parsedData?.results[0] && !parsedData.results[0].episodeUrl) {
        parsedData.results.shift();
      }

      const episodesParsed = parsedData?.results?.map((episode) => {
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
        episodesCount: parsedData.resultCount || episodesParsed.length,
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
