import { createContext, useState } from "react";

const LoadingContext = createContext({
  loading: false,
  testing: 3,
  loadingHandler: (loading) => {},
});

const PodcastsContext = createContext({
  podcasts: [],
  podcastsUpdated: null,
});

export const LoadingContextProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(3);

  const loadingHandler = (loading) => {
    setLoading(loading);
  };

  return (
    <LoadingContext.Provider
      value={{
        loading: loading,
        testing: testing,
        loadingHandler: loadingHandler,
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
