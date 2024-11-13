import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap"; // Modal y Botón de React-Bootstrap
import MovieCarousel from "../../layout/carousel/MoviesCarousel"; // Carrusel de películas
import SeriesCarousel from "../../layout/carousel/seriescarousel"; // Carrusel de series
import useFetchItems from "../../../hooks/useFetchMovies"; // Hook para obtener datos de la API
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./homecontainer.css";
import { PacmanLoader } from "react-spinners";

function Home() {
  const [movieGenres, setMovieGenres] = useState({});
  const [seriesGenres, setSeriesGenres] = useState({});
  const [showDisclaimer, setShowDisclaimer] = useState(true); // Estado para mostrar el disclaimer

  // Fetch de películas populares
  const { items: movies, loading: loadingMovies, error: errorMovies, getGenres: getMovieGenres } = useFetchItems("movie", "popular");

  // Fetch de series más valoradas
  const { items: series, loading: loadingSeries, error: errorSeries, getGenres: getSeriesGenres } = useFetchItems("tv", "top_rated");

  // Establecer los géneros de películas y series cuando los datos cambian
  useEffect(() => {
    if (movies.length > 0) {
      const movieGenresMap = {};
      movies.forEach((movie) => {
        movieGenresMap[movie.id] = getMovieGenres(movie.genre_ids).join(", ");
      });
      setMovieGenres(movieGenresMap);
    }
  }, [movies, getMovieGenres]);

  useEffect(() => {
    if (series.length > 0) {
      const seriesGenresMap = {};
      series.forEach((serie) => {
        seriesGenresMap[serie.id] = getSeriesGenres(serie.genre_ids).join(", ");
      });
      setSeriesGenres(seriesGenresMap);
    }
  }, [series, getSeriesGenres]);

  // Chequear si el disclaimer ya fue aceptado
  useEffect(() => {
    const hasAcceptedDisclaimer = localStorage.getItem("hasAcceptedDisclaimer");
    if (hasAcceptedDisclaimer) {
      setShowDisclaimer(false); // Si ya aceptó, no mostramos el modal
    }
  }, []);

  // Comprobación de carga y error
  if (errorMovies || errorSeries) return <div>Error: {errorMovies || errorSeries}</div>;
  if (loadingMovies || loadingSeries) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <PacmanLoader color="#FFD700" size={50} />
      </div>
    );
  }

  // Función para cerrar el disclaimer y guardar la preferencia
  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem("hasAcceptedDisclaimer", "true"); // Guardar que ya aceptaron el disclaimer
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
