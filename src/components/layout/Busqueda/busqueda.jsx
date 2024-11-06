import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../../layout/cards/moviecard";

function Busqueda() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const apiKey = "4e44d9029b1270a757cddc766a1bcb63";

        const [movieResponse, tvResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: { api_key: apiKey, language: "es-ES", query },
          }),
          axios.get(`https://api.themoviedb.org/3/search/tv`, {
            params: { api_key: apiKey, language: "es-ES", query },
          }),
        ]);

        const movies = movieResponse.data.results.map((item) => ({
          ...item,
          media_type: "movie",
        }));

        const tvShows = tvResponse.data.results.map((item) => ({
          ...item,
          media_type: "tv",
        }));

        setResults([...movies, ...tvShows]);
      } catch (error) {
        setError("Error al obtener los resultados de búsqueda.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div>
      <h2>Resultados para: "{query}"</h2>

      {loading && <div>Cargando...</div>}
      {error && <div>{error}</div>}

      <Container>
        <Row>
          {results.length > 0 ? (
            results.map((result) => (
              <Col md={3} key={result.id}>
                <MovieCard
                  title={result.title || result.name}
                  description={result.overview}
                  imageUrl={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                  type={result.media_type === "tv" ? "Serie" : "Película"}
                  link={result.media_type === "tv" ? `/series-details/${result.id}` : `/movie-details/${result.id}`}
                />
              </Col>
            ))
          ) : (
            <div>No se encontraron resultados.</div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Busqueda;
