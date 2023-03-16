import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";

import LoadingContext from "../store/loading-context";
import PodcastsContext from "../store/podcasts-context";

import classes from "../styles/Episode.module.css";

function Episode() {
  const params = useParams();
  const { loadingHandler } = useContext(LoadingContext);
  const {
    selectedPodcast,
    checkPodcastsStorage,
    selectedEpisode,
    checkEpisodeStorage,
  } = useContext(PodcastsContext);
  const navigate = useNavigate();

  /**
   * Checks storage when loading component.
   */
  useEffect(() => {
    if (!selectedPodcast) {
      checkPodcastsStorage();
    }
    if (!selectedEpisode) {
      checkEpisodeStorage();
    }
  }, [
    selectedPodcast,
    selectedEpisode,
    checkPodcastsStorage,
    checkEpisodeStorage,
  ]);

  /**
   * Checks if there is data for the episode, if it is not set, go back to podcast list.
   */
  useEffect(() => {
    if (selectedEpisode) {
      if (+selectedEpisode.id === +params.episodeId) {
        loadingHandler(false);
      } else {
        // No episode data, return to podcast-list
        navigate("/");
      }
    }
  }, [selectedEpisode, params.episodeId, loadingHandler, navigate]);

  /**
   * When the episode is loaded, set loading to false.
   */
  useEffect(() => {
    if (selectedEpisode) {
      loadingHandler(false);
    }
  }, [selectedEpisode, loadingHandler]);

  /**
   * Helper to allow insert the episode description as HTML.
   */
  function createDescription() {
    return { __html: selectedEpisode.description };
  }

  return (
    <>
      {selectedEpisode && (
        <Card>
          <h2 className={classes.title}>{selectedEpisode.name}</h2>
          <div
            className={classes.description}
            dangerouslySetInnerHTML={createDescription()}
          ></div>

          <div className={classes.playerContainer}>
            <audio className={classes.audio} controls>
              <source src={selectedEpisode.audioSrc} />
            </audio>
          </div>
        </Card>
      )}
    </>
  );
}

export default Episode;
