import { useCallback, useContext } from "react";

import Card from "../components/Card";
import { Table } from "../components/Table";
import PodcastsContext from "../store/podcasts-context";

import classes from "../styles/EpisodeList.module.css";

function EpisodeList() {
  const { selectedPodcast, setSelectedEpisode } = useContext(PodcastsContext);

  /**
   * Sets the selected episode.
   */
  const selectEpisodeHandler = useCallback(
    (episode) => {
      setSelectedEpisode(episode);
    },
    [setSelectedEpisode]
  );

  return (
    <>
      {selectedPodcast?.episodes && (
        <>
          <Card extraClasses={classes.episodesTitleCard}>
            <h2 className={classes.episodesTitle}>
              Episodes: {selectedPodcast.episodesCount}
            </h2>
          </Card>
          <Card extraClasses={classes.episodesTableCard}>
            <Table
              headers={["Title", "Date", "Duration"]}
              items={selectedPodcast.episodes}
              itemSelected={selectEpisodeHandler}
            ></Table>
          </Card>
        </>
      )}
    </>
  );
}

export default EpisodeList;
