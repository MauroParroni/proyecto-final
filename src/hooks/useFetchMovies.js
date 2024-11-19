import { useState, useEffect } from "react";
import axios from "axios";

const useFetchItems = (type = "movie", currentPage = 1, genreId = null) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [movieGenres, setMovieGenres] = useState([]); // Inicializado como arreglo vacío
  const [tvGenres, setTvGenres] = useState([]); // Inicializado como arreglo vacío

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const movieResponse = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          { params: { api_key: "4e44d9029b1270a757cddc766a1bcb63", language: "es-ES" } }
        );
        const tvResponse = await axios.get(
          "https://api.themoviedb.org/3/genre/tv/list",
          { params: { api_key: "4e44d9029b1270a757cddc766a1bcb63", language: "es-ES" } }
        );
        setMovieGenres(movieResponse.data.genres || []); // Asegurar que sea un arreglo vacío en caso de error
        setTvGenres(tvResponse.data.genres || []); // Asegurar que sea un arreglo vacío en caso de error
      } catch (err) {
        console.log("Error obteniendo géneros:", err.message);
      }
    };

    fetchGenres();
  }, []);

  const getGenres = (genreIds, type) => {
    const genresList = type === "movie" ? movieGenres : tvGenres;
    return genreIds.map(id => {
      const genre = genresList.find(genre => genre.id === id);
      return genre ? genre.name : "Desconocido";
    });
  };

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint =
          type === "movie" ? "discover/movie" : "discover/tv";

        const params = {
          api_key: "4e44d9029b1270a757cddc766a1bcb63",
          language: "es-ES",
          page: currentPage,
        };

        if (genreId) {
          params.with_genres = genreId;
        }

        const response = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, { params });
        setItems(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [type, currentPage, genreId]);

  return { items, loading, error, totalPages, getGenres };
};


export default useFetchItems;
