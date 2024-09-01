import { useState, useEffect } from "react";

const KEY = "f84fc31d";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // callback?.();
    const controller = new AbortController();
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    setIsLoading(true);
    setError("");

    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        return res.json();
      })
      .then((data) => {
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      })
      .catch((error) => {
        console.error(error.message);
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
    // handleCloseMovie();
    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
