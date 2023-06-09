import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TextField } from "@mui/material";
import PodcastCard from "../components/PodcastCard";
import useFetch from "../hooks/useFetch";
import LoadingContext from "../store/loading-context";
import PodcastsContext from "../store/podcasts-context";

import environment from "../environment";
import classes from "../styles/PodcastList.module.css";

function PodcastList() {
  const { loadingHandler, setFiltering } = useContext(LoadingContext);
  const {
    checkPodcastsStorage,
    savePodcasts,
    setPodcasts,
    setSelectedPodcast,
  } = useContext(PodcastsContext);
  const url = environment.production
    ? `${environment.corsUrl}${environment.podcastListUrl}`
    : environment.podcastListUrl;
  const { data, loading, error, sendRequest } = useFetch();
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPodcasts, setCurrentPodcasts] = useState("");

  /**
   * Launchs the filtering setting the search term.
   * Triggers effects changing filtering status in loading context.
   */
  const handleSearchTermChange = (event) => {
    setFiltering(true);
    setSearchTerm(event.target.value);
    setTimeout(() => {
      setFiltering(false);
    }, 0);
  };

  /**
   * Returns the matching podcasts.
   */
  const filterPodcasts = (podcastList, searchTerm) => {
    if (!podcastList) {
      return [];
    }
    return podcastList.filter(
      (podcast) =>
        podcast.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredPodcasts = filterPodcasts(currentPodcasts, searchTerm);

  /**
   * Fetch podcast list.
   */
  const getPodcastData = useCallback(() => {
    sendRequest(url, "list");
  }, [url, sendRequest]);

  /**
   * Check if there is podcast info in localStorage, use it if exists and is not outdate (1 day old) or fetch it if necessary.
   */
  useEffect(() => {
    const storedPodcasts = checkPodcastsStorage();

    if (storedPodcasts) {
      setSelectedPodcast(null);
      // loadingHandler(true);
      if (storedPodcasts?.length > 0) {
        // No need to refetch, use available localStorage podcasts data
        loadingHandler(false);
        setCurrentPodcasts(storedPodcasts);
      } else if (storedPodcasts?.length === 0) {
        // Fetch podcasts data
        getPodcastData();
      }
    }
  }, []);

  /**
   * Update loading context.
   */
  useEffect(() => {
    loadingHandler(loading);
  }, [loading, loadingHandler]);

  /**
   * Parse fetched data.
   */
  useEffect(() => {
    if (data) {
      const parsedData = environment.parseFn(data);

      if (parsedData && parsedData.feed) {
        const podcastsParsed = parsedData?.feed?.entry?.map((podcast) => ({
          name: podcast["im:name"].label,
          author: podcast["im:artist"].label,
          img: podcast["im:image"]?.[podcast["im:image"].length - 1]?.label,
          id: podcast.id.attributes["im:id"],
          description: podcast.summary.label,
        }));
        setCurrentPodcasts(podcastsParsed || []);
        savePodcasts(podcastsParsed || []);
        loadingHandler(false);
      }
    }
  }, [data, loading, loadingHandler]);

  return (
    <>
      <div className={classes.searchContainer}>
        <div className={classes.searchResults}>{filteredPodcasts.length}</div>
        <TextField
          id="search-input"
          label="Filter podcasts..."
          variant="outlined"
          type="text"
          placeholder="Filter podcasts..."
          value={searchTerm}
          color="primary"
          onChange={handleSearchTermChange}
          className={classes.searchInput}
        />
      </div>
      {error && <div>An error has ocurred, please try again.</div>}
      <ul className={classes.podcastList}>
        {filteredPodcasts.map((podcast) => (
          <li key={podcast.id} className={classes.podcastCardContainer}>
            <Link
              to={`podcast/${podcast.id}`}
              className={classes.podcastCard}
              onClick={() => {
                setSelectedPodcast(podcast);
                setPodcasts(currentPodcasts);
              }}
            >
              <PodcastCard podcast={podcast}></PodcastCard>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PodcastList;
