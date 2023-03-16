import { createContext, useState } from "react";

/**
 * Context to store the loading state of the aplication.
 */
const LoadingContext = createContext({
  loading: false,
  testing: 3,
  loadingHandler: (loading) => {},
});

/**
 * Provider for loading context.
 */
export const LoadingContextProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);

  const loadingHandler = (loading) => {
    setLoading(loading);
  };

  return (
    <LoadingContext.Provider
      value={{
        loading: loading,
        loadingHandler: loadingHandler,
        filtering: filtering,
        setFiltering: setFiltering,
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
