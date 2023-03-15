import { createContext, useCallback, useEffect, useState } from "react";

const PodcastsContext = createContext({
  podcasts: [],
  selectedPodcast: null,
});

/**
 * Aux function to calc the number of days between two dates.
 */
const calcDaysDiff = (date1, date2) => {
  const diff = date2.getTime() - date1.getTime();
  const dayDiff = Math.abs(diff) / (1000 * 60 * 60 * 24);
  return dayDiff;
};

export const PodcastsContextProvider = (props) => {
  const [podcasts, setPodcasts] = useState();
  const [storedPodcastsParsed, setStoredPodcastsParsed] = useState();

  const [selectedPodcast, setSelectedPodcast] = useState();

  const setPodcastsHandler = (podcastsArray) => {
    setPodcasts(podcastsArray);
  };

  const setSelectedPodcastHandler = (podcastObject) => {
    setSelectedPodcast(podcastObject);
  };

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
   * Update localStorage.
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

  return (
    <PodcastsContext.Provider
      value={{
        checkPodcastsStorage: checkPodcastsStorage,
        storedPodcastsParsed: storedPodcastsParsed,
        podcasts: podcasts,
        setPodcastsHandler: setPodcastsHandler,
        selectedPodcast: selectedPodcast,
        setSelectedPodcastHandler: setSelectedPodcastHandler,
      }}
    >
      {props.children}
    </PodcastsContext.Provider>
  );
};

export default PodcastsContext;
