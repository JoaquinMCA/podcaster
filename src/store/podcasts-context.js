import { createContext, useCallback, useEffect, useState } from "react";

/**
 * Context to store data about podcasts (including episodes) and the selected podcast and episode.
 */
const PodcastsContext = createContext({
  podcasts: [],
  selectedPodcast: null,
  selectedEpisode: null,
  storedPodcastsParsed: [],
  setPodcasts: () => {},
  setSelectedPodcast: () => {},
  setSelectedEpisode: () => {},
  checkPodcastsStorage: () => {},
  checkEpisodeStorage: () => {},
});

/**
 * Aux function to calc the number of days between two dates.
 */
const calcDaysDiff = (date1, date2) => {
  const diff = date2.getTime() - date1.getTime();
  const dayDiff = Math.abs(diff) / (1000 * 60 * 60 * 24);
  return dayDiff;
};

/**
 * Provider for PodcastContext.
 */
export const PodcastsContextProvider = (props) => {
  const [podcasts, setPodcasts] = useState();
  const [storedPodcastsParsed, setStoredPodcastsParsed] = useState();

  const [selectedPodcast, setSelectedPodcast] = useState();
  const [selectedEpisode, setSelectedEpisode] = useState();

  /**
   * Check if there is podcast info in localStorage, use it if exists and is not outdate (1 day old) and reset if so.
   */
  const checkPodcastsStorage = useCallback(() => {
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
      setStoredPodcastsParsed(storedPodcastsParsed);
      // No need to refetch, use available localStorage podcasts data
      setPodcasts(storedPodcastsParsed);
    } else {
      setPodcasts([]);
      setStoredPodcastsParsed([]);
    }
  }, []);

  /**
   * Checks if there is a selected episode in localStorage.
   */
  const checkEpisodeStorage = useCallback(() => {
    const storedSelectedEpisode = localStorage.getItem("selectedEpisode");
    const storedSelectedEpisodeParsed = storedSelectedEpisode
      ? JSON.parse(storedSelectedEpisode)
      : null;
    if (storedSelectedEpisodeParsed) {
      setSelectedEpisode(storedSelectedEpisodeParsed);
    }
  }, []);

  /**
   * Update podcasts in localStorage.
   */
  useEffect(() => {
    if (
      podcasts?.length > 0 &&
      JSON.stringify(podcasts) !== JSON.stringify(storedPodcastsParsed)
    ) {
      localStorage.setItem("podcasts", JSON.stringify(podcasts));
      localStorage.setItem("podcastsUpdateDate", new Date());
    }
  }, [podcasts, storedPodcastsParsed]);

  /**
   * Update podcasts in localStorage, when episodes are fetched.
   */
  useEffect(() => {
    if (podcasts && selectedPodcast) {
      const podcastIndex = podcasts.findIndex(
        (podcast) => podcast.id === selectedPodcast.id
      );

      if (podcastIndex > -1) {
        const updatedPodcasts = podcasts;
        updatedPodcasts[podcastIndex] = selectedPodcast;

        localStorage.setItem("podcasts", JSON.stringify(updatedPodcasts));
      }
    }
  }, [podcasts, selectedPodcast]);

  /**
   * Update selected podcast in localStorage.
   */
  useEffect(() => {
    if (selectedPodcast) {
      localStorage.setItem("selectedPodcast", JSON.stringify(selectedPodcast));
    } else {
      localStorage.removeItem("selectedPodcast");
    }
  }, [selectedPodcast]);

  /**
   * Update selected episode in localStorage.
   */
  useEffect(() => {
    if (selectedEpisode) {
      console.log('seteando selected episode');
      
      localStorage.setItem("selectedEpisode", JSON.stringify(selectedEpisode));
    } else {
      localStorage.removeItem("selectedEpisode");
    }
  }, [selectedEpisode]);

  return (
    <PodcastsContext.Provider
      value={{
        podcasts: podcasts,
        setPodcasts: setPodcasts,
        selectedPodcast: selectedPodcast,
        setSelectedPodcast: setSelectedPodcast,
        selectedEpisode: selectedEpisode,
        setSelectedEpisode: setSelectedEpisode,
        checkPodcastsStorage: checkPodcastsStorage,
        storedPodcastsParsed: storedPodcastsParsed,
        checkEpisodeStorage: checkEpisodeStorage,
      }}
    >
      {props.children}
    </PodcastsContext.Provider>
  );
};

export default PodcastsContext;
