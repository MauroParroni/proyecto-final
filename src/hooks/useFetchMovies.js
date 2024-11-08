import { useState, useEffect } from "react";
import axios from "axios";

const useFetchItems = (type = "movie", query = "popular", currentPage = 1) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [genresList, setGenresList] = useState([]); // Para guardar los géneros disponibles

  // Obtener géneros disponibles de la API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list`, {
          params: {
            api_key: "4e44d9029b1270a757cddc766a1bcb63",
            language: "es-ES",
          },
        });
        setGenresList(response.data.genres); // Guarda los géneros disponibles
      } catch (err) {
        console.log("Error obteniendo géneros:", err.message);
      }
    };

    fetchGenres();
  }, [type]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/${type}/${query}`, {
          params: {
            api_key: "4e44d9029b1270a757cddc766a1bcb63",
            language: "es-ES",
            page: currentPage,
          },
        });
        setItems(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [type, query, currentPage]);

  // Obtener los nombres de los géneros basados en los IDs
  const getGenres = (genreIds) => {
    return genreIds.map(id => {
      const genre = genresList.find(genre => genre.id === id);
      return genre ? genre.name : "Desconocido";
    });
  };

  return { items, loading, error, totalPages, getGenres };
};

export default useFetchItems;
