import { useState, useEffect } from "react";
import axios from "axios";

const useFetchMovies = (type = "movie", query = "popular") => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/${type}/${query}`, {
          params: {
            api_key: "4e44d9029b1270a757cddc766a1bcb63",
            language: "es-ES",
          },
        });
        setItems(response.data.results.slice(0, 8));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [type, query]);

  return { items, loading, error };
};

export default useFetchMovies;
