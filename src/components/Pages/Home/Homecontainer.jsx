import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MovieCarousel from "../../layout/carousel/MovieCarousel"; // Carrusel de películas
import SeriesCarousel from "../../layout/carousel/seriescarousel"; // Carrusel de series
import useFetchItems from "../../../hooks/useFetchMovies"; // Hook para obtener datos de la API
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./homecontainer.css";

function Home() {
  const [movieGenres, setMovieGenres] = useState({});
  const [seriesGenres, setSeriesGenres] = useState({});

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

  // Comprobación de carga y error
  if (loadingMovies || loadingSeries) return <div>Cargando...</div>;
  if (errorMovies || errorSeries) return <div>Error: {errorMovies || errorSeries}</div>;

  return (
    <>
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
