import { useState, useCallback } from "react";

/**
 * Hook to fetch data from APIs.
 */
const useFetch = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [reqType, setReqType] = useState();

  /**
   * Single request.
   */
  const sendRequest = useCallback((url, requestType) => {
    setLoading(true);
    setError(false);
    setReqType(requestType);
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(true);
        } else {
          setData(res);
        }
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  /**
   * Multiple requests simultaneously.
   */
  const sendRequests = useCallback((urls, requestType) => {
    setLoading(true);
    setError(false);
    setReqType(requestType);

    const promises = [];
    urls.map((url) => {
      const promise = fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            setError(true);
            setErrors((prevValue) => {
              return [...prevValue, res.status + "-" + res.statusText];
            });
          }
        })
        .then((res) => {
          if (res?.error) {
            setError(true);
            setErrors((prevValue) => {
              return [...prevValue, res.error];
            });
          } else {
            return res;
          }
        })
        .catch((err) => {
          setError(true);
          setErrors((prevValue) => {
            return [...prevValue, err];
          });
        });

      promises.push(promise);
      return null;
    });

    Promise.all(promises)
      .then((result) => {
        setData(result.filter((res) => res !== undefined));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error, sendRequest, reqType, sendRequests, errors };
};

export default useFetch;
