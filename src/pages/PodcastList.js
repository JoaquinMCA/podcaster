import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PodcastCard from "../components/PodcastCard";
import useFetch from "../hooks/useFetch";
import LoadingContext from "../store/loading-context";

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

  const ctx = useContext(LoadingContext);

  const url = "/toppodcasts/limit=100/genre=1310/json";

  const { data, loading, error, sendRequest, reqType } = useFetch();

  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    ctx.loadingHandler(true);
    const storedPodcasts = localStorage.getItem("podcasts");
    if (storedPodcasts?.length > 0) {
      setPodcasts(storedPodcasts);
      ctx.loadingHandler(false);
    } else {
      getPodcastData();
    }
  }, []);

  useEffect(() => {
    ctx.loadingHandler(loading);
  }, [loading]);

  const getPodcastData = useCallback(() => {
    sendRequest(url, "list");
  }, [url, sendRequest]);

  const handlePodcastData = useEffect(() => {
    ctx.loadingHandler(loading);
    const podcasts = data?.feed?.entry?.map((podcast) => ({
      name: podcast["im:name"].label,
      author: podcast["im:artist"].label,
      img: podcast["im:image"]?.[0]?.label,
      id: podcast.id.attributes["im:id"],
      description: podcast.summary.label,
    }));
    setPodcasts(podcasts || []);
  }, [data]);

  return (
    <>
      <div className={classes.searchContainer}></div>
      <ul className={classes.podcastList}>
        {podcasts.map((podcast) => (
          <li key={podcast.id} className={classes.podcastCardContainer}>
            <Link to={`podcast/${podcast.id}`} className={classes.podcastCard}>
              <PodcastCard podcast={podcast}></PodcastCard>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PodcastList;
