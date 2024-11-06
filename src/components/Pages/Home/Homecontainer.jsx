import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./homecontainer.css";
import MovieCard from "../../layout/cards/moviecard";
import useFetchMovies from "../../../hooks/useFetchMovies";

function Home() {
  const { items: movies, loading: loadingMovies, error: errorMovies } = useFetchMovies("movie", "popular");
  const { items: series, loading: loadingSeries, error: errorSeries } = useFetchMovies("tv", "top_rated");

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (loadingMovies || loadingSeries) return <div>Cargando...</div>;
  if (errorMovies || errorSeries) return <div>Error: {errorMovies || errorSeries}</div>;

  return (
    <>
      <body className="background-container">
        <h1 className="title">Especialistas en el contenido</h1>
        
        {/* Sección de Películas */}
        <h2 className="title">Películas Populares</h2>
        <Container>
          <Row>
            {movies.map((movie) => (
              <Col md={3} key={movie.id}>
                <MovieCard
                  title={movie.title}
                  description={movie.overview}
                  imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  link={`/movie-details/${movie.id}`}
                />
              </Col>
            ))}
          </Row>
        </Container>

        {/* Sección de Series */}
        <h2 className="title">Series Populares</h2>
        <Container>
          <Row>
            {series.map((serie) => (
              <Col md={3} key={serie.id}>
                <MovieCard
                  title={serie.name}
                  description={serie.overview}
                  imageUrl={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                  link={`/series-details/${serie.id}`}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </body>
    </>
  );
}

export default Home;
