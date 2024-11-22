import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import MovieCard from "../../layout/cards/moviecard";
import { PacmanLoader } from "react-spinners";
import * as robotError from "../../../assets/robot-error.json";
import useFetchItems from "../../../hooks/useFetchMovies";
import Robotito from "../RobotError/Robotito";
import ScrollToTop from "../../layout/Scroll/scrolltoTop";

function Busqueda() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieGenres, setMovieGenres] = useState({});
  const [tvGenres, setTvGenres] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: robotError,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { getGenres: getMovieGenres } = useFetchItems("movie", 1);
  const { getGenres: getTvGenres } = useFetchItems("tv", 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
  
      setLoading(true);
      setResults([]);
      setError(null);
      
      try {
        const apiKey = "4e44d9029b1270a757cddc766a1bcb63";
  
        const [movieResponse, tvResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: { api_key: apiKey, language: "es-ES", query, page: currentPage },
          }),
          axios.get(`https://api.themoviedb.org/3/search/tv`, {
            params: { api_key: apiKey, language: "es-ES", query, page: currentPage },
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
  
        const combinedResults = [...movies, ...tvShows];
  
        if (combinedResults.length === 0) {
          setResults([]);
          setError("No se hallaron coincidencias.");
        } else {
          setResults(combinedResults);
          setError(null);
          setTotalPages(
            Math.max(movieResponse.data.total_pages, tvResponse.data.total_pages)
          );
        }
      } catch (error) {
        setError("Error al obtener los resultados de búsqueda.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchResults();
  }, [query, currentPage]);  

  useEffect(() => {
    if (results.length > 0) {
      const movieGenresMap = {};
      const tvGenresMap = {};
  
      results.forEach((result) => {
        if (result.media_type === "movie" && Array.isArray(result.genre_ids)) {
          movieGenresMap[result.id] = getMovieGenres(result.genre_ids, "movie").join(", ");
        } else if (result.media_type === "tv" && Array.isArray(result.genre_ids)) {
          tvGenresMap[result.id] = getTvGenres(result.genre_ids, "tv").join(", ");
        }
      });
  
      setMovieGenres(movieGenresMap);
      setTvGenres(tvGenresMap);
    }
  }, [results, getMovieGenres, getTvGenres]);

  useEffect(() => {
    if (results.length > 0) {
      setError(null);
    }
  }, [results]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <PacmanLoader color="#FFD700" size={50} />
      </div>
    );
  }
  
  if (!loading && error) {
    return <Robotito errorMessage={error} />;
  }
  
  if (!loading && error && results.length === 0) {
    return <Robotito errorMessage={<h3 style={{ color: "#1c1c1c" }}>No se hallaron coincidencias</h3>} />;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pageNumbersToShow = pages.filter((page) => {
    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(currentPage + 2, totalPages);
    return page >= start && page <= end;
  });

  return (
    <div>
      <ScrollToTop />
      <h2 className="text-center page-title">Resultados para: "{query}"</h2>

      <Container>
        <Row>
          {results.map((result) => {
            const genres =
              result.media_type === "movie" ? movieGenres[result.id] : tvGenres[result.id];

            return (
              <Col md={3} key={result.id}>
                <MovieCard
                  title={result.title || result.name}
                  description={result.overview}
                  imageUrl={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                  type={result.media_type === "tv" ? "Serie" : "Película"}
                  genres={genres}
                  link={
                    result.media_type === "tv"
                      ? `/series-details/${result.id}`
                      : `/movie-details/${result.id}`
                  }
                />
              </Col>
            );
          })}
        </Row>
      </Container>

      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
        {pageNumbersToShow.map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </div>
  );
}

export default Busqueda;
