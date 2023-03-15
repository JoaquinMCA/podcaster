import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PodcastCard from "../components/PodcastCard";
import useFetch from "../hooks/useFetch";
import LoadingContext from "../store/loading-context";

import classes from "../styles/PodcastList.module.css";

const calcDaysDiff = (date1, date2) => {
  const diff = date2.getTime() - date1.getTime();
  const dayDiff = Math.abs(diff) / (1000 * 60 * 60 * 24);
  return dayDiff;
};

function PodcastList() {
  const ctx = useContext(LoadingContext);
  const url = "/toppodcasts/limit=100/genre=1310/json";
  const { data, loading, error, sendRequest, reqType } = useFetch();
  const [podcasts, setPodcasts] = useState([]);
  const [storedPodcastsParsed, setStoredPodcastsParsed] = useState([]);

  useEffect(() => {
    ctx.loadingHandler(true);
    const storedPodcasts = localStorage.getItem("podcasts");
    const storedPodcastsParsed = storedPodcasts
      ? JSON.parse(storedPodcasts)
      : null;
    const storedPodcastsUpdate = localStorage.getItem("podcastsUpdateDate");
    const storedPodcastsUpdateDate = storedPodcastsUpdate
      ? new Date(storedPodcastsUpdate)
      : null;

    if (
      storedPodcastsParsed?.length > 0 &&
      storedPodcastsUpdateDate &&
      calcDaysDiff(new Date(), storedPodcastsUpdateDate) < 1
    ) {
      // No need to refetch, use available localStorage podcasts data
      setPodcasts(storedPodcastsParsed);
      setStoredPodcastsParsed(storedPodcastsParsed);
      ctx.loadingHandler(false);
    } else {
      // Fetch podcasts data
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
    if (data && data.feed) {
      ctx.loadingHandler(loading);
      const podcastsParsed = data?.feed?.entry?.map((podcast) => ({
        name: podcast["im:name"].label,
        author: podcast["im:artist"].label,
        img: podcast["im:image"]?.[podcast["im:image"].length - 1]?.label,
        id: podcast.id.attributes["im:id"],
        description: podcast.summary.label,
      }));

      setPodcasts(podcastsParsed || []);
    }
  }, [data]);

  useEffect(() => {
    if (
      podcasts?.length > 0 &&
      JSON.stringify(podcasts) !== JSON.stringify(storedPodcastsParsed)
    ) {
      localStorage.setItem("podcasts", JSON.stringify(podcasts));
      localStorage.setItem("podcastsUpdateDate", new Date());
    }
  }, [podcasts, storedPodcastsParsed]);

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
