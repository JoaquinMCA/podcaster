import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PodcastCard from "../components/PodcastCard";
import useFetch from "../hooks/useFetch";
import LoadingContext from "../store/loading-context";
import PodcastsContext from "../store/podcasts-context";
import { TextField } from "@mui/material";

import classes from "../styles/PodcastList.module.css";

function PodcastList() {
  const { loadingHandler, setFiltering } = useContext(LoadingContext);
  const { checkPodcastsStorage, podcasts, setPodcastsHandler } =
    useContext(PodcastsContext);
  const url = "list/toppodcasts/limit=100/genre=1310/json";
  const { data, loading, error, sendRequest } = useFetch();
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredPodcasts = filterPodcasts(podcasts, searchTerm);

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
    checkPodcastsStorage();
  }, [checkPodcastsStorage]);

  /**
   * Check if there is podcast info in localStorage, use it if exists and is not outdate (1 day old) or fetch it if necessary.
   */
  useEffect(() => {
    loadingHandler(true);
    if (podcasts?.length > 0) {
      // No need to refetch, use available localStorage podcasts data
      loadingHandler(false);
    } else if (podcasts?.length === 0) {
      // Fetch podcasts data
      getPodcastData();
    }
  }, [podcasts, getPodcastData]);

  /**
   * Update loading context.
   */
  useEffect(() => {
    loadingHandler(loading);
  }, [loadingHandler, loading]);

  /**
   * Parse fetched data.
   */
  useEffect(() => {
    if (data && data.feed) {
      loadingHandler(loading);
      const podcastsParsed = data?.feed?.entry?.map((podcast) => ({
        name: podcast["im:name"].label,
        author: podcast["im:artist"].label,
        img: podcast["im:image"]?.[podcast["im:image"].length - 1]?.label,
        id: podcast.id.attributes["im:id"],
        description: podcast.summary.label,
      }));

      setPodcastsHandler(podcastsParsed || []);
    }
  }, [data, loadingHandler, loading]);

  /**
   * Fetch podcast list.
   */
  const selectPodcast = useCallback((podcast) => {
    localStorage.setItem("selectedPodcast", JSON.stringify(podcasts));
  }, []);

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
              onClick={selectPodcast(podcast)}
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
