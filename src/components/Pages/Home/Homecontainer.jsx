import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap"; 
import MovieCarousel from "../../layout/carousel/MoviesCarousel"; 
import SeriesCarousel from "../../layout/carousel/seriescarousel"; 
import useFetchItems from "../../../hooks/useFetchMovies"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./homecontainer.css";
import { PacmanLoader } from "react-spinners";
import Robotito from "../../layout/RobotError/Robotito";

function Home() {
  const [movieGenres, setMovieGenres] = useState({});
  const [seriesGenres, setSeriesGenres] = useState({}); 
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const { items: movies, loading: loadingMovies, error: errorMovies, getGenres: getMovieGenres } = useFetchItems("movie", 1);
  const { items: series, loading: loadingSeries, error: errorSeries, getGenres: getSeriesGenres } = useFetchItems("tv", 1);

  useEffect(() => {
    if (movies.length > 0) {
      const movieGenresMap = {};
      movies.forEach((movie) => {
        const genres = getMovieGenres(movie.genre_ids, "movie").join(", ");
        movieGenresMap[movie.id] = genres;
      });
      setMovieGenres(movieGenresMap);
    }
  }, [movies, getMovieGenres]);

  useEffect(() => {
    if (series.length > 0) {
      const seriesGenresMap = {};
      series.forEach((serie) => {
        const genres = getSeriesGenres(serie.genre_ids, "tv").join(", ");
        seriesGenresMap[serie.id] = genres;
      });
      setSeriesGenres(seriesGenresMap);
    }
  }, [series, getSeriesGenres]);

  useEffect(() => {
    const hasAcceptedDisclaimer = localStorage.getItem("hasAcceptedDisclaimer");
    if (hasAcceptedDisclaimer) {
      setShowDisclaimer(false);
    }
  }, []);

  if (errorMovies || errorSeries) return <div>Error: {errorMovies || errorSeries}</div>;
  if (loadingMovies || loadingSeries) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <PacmanLoader color="#FFD700" size={50} />
      </div>
    );
  }

  if (errorMovies || errorSeries) return <Robotito errorMessage={errorMovies || errorSeries} />;
  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem("hasAcceptedDisclaimer", "true");
  };

  return (
    <>
      {/* Modal Disclaimer con estilo */}
      <Modal show={showDisclaimer} onHide={handleCloseDisclaimer} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>📢 Advertencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Este es un proyecto educativo sin fines de lucro. Se utiliza contenido de películas y series con derechos de autor
            exclusivamente con fines demostrativos y de aprendizaje. No se busca infringir ningún derecho de propiedad intelectual.
          </p>
          <p>
            Al continuar, aceptas que este proyecto está destinado solo para fines educativos y no tiene fines comerciales.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseDisclaimer}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>

      <body className="background-container">
        <h1 className="title">Especialistas en el contenido</h1>
        
        {/* Sección de Películas Populares */}
        <h2 className="title">Películas Populares</h2>
        <MovieCarousel movies={movies} genres={movieGenres} />

        {/* Sección de Series Populares */}
        <h2 className="title">Series Populares</h2>
        <SeriesCarousel series={series} genres={seriesGenres} />
      </body>
    </>
  );
}

export default Home;
