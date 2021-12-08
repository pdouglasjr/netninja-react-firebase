import { useState, useEffect, useRef } from "react";

export const useFetch = (url, _options) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // Error handling
  const [error, setError] = useState(null);

  // use useRef to wrap an object/array argument
  // which is a useEffect dependency
  const options = useRef(_options).current;

  useEffect(() => {
    console.log(options);
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);

      // Catches network errors, e.g. network connection, incorrect url
      try {
        const res = await fetch(url, { signal : controller.signal});

        if (!res.ok) {
          throw new Error(res.status + ' - ' + res.statusText);
        }

        const json = await res.json();
        
        setIsPending(false);
        setData(json);

        setError(null);
      } catch (err) {
        // Catch abort from fetch
        if (err.name === "AbortError") {
          console.log('The fetch was aborted.')
        }
        setIsPending(false);
        setError('Could not fetch the data.');
      }
    }
    fetchData();

    // Clean-up function to prevent updating unmounted components
    return () => {
      controller.abort();
    }
  }, [url, options]);

  return { data, isPending, error }

}