import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../../layout/cards/moviecard";
import { PacmanLoader } from "react-spinners";
import Lottie from "react-lottie";
import * as robotError from "../../../assets/robot-error.json";

function Busqueda() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Definir las opciones de la animación Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: robotError, // La animación JSON de tu robotito
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

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

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <PacmanLoader color="#FFD700" size={50} />
    </div>
  );

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <Lottie options={defaultOptions} height={200} width={200} />
          <h3 style={{ color: "#FF0000" }}>¡Ups! Algo salió mal. :(</h3>
          <p>{error}</p>
        </div>
      </Container>
    );
  }

  if (results.length === 0) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <Lottie options={defaultOptions} height={200} width={200} />
          <h3 style={{ color: "#FF0000" }}>¡Ups! No se hallaron coincidencias</h3>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <h2 className="text-center">Resultados para: "{query}"</h2>

      <Container>
        <Row>
          {results.map((result) => (
            <Col md={3} key={result.id}>
              <MovieCard
                title={result.title || result.name}
                description={result.overview}
                imageUrl={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                type={result.media_type === "tv" ? "Serie" : "Película"}
                link={result.media_type === "tv" ? `/series-details/${result.id}` : `/movie-details/${result.id}`}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Busqueda;
