import React, { useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import MovieCard from "../../layout/cards/moviecard";
import useFetchItems from "../../../hooks/useFetchMovies";
import { PacmanLoader } from "react-spinners";

function Peliculas() {
  const [currentPage, setCurrentPage] = useState(1);
  const { items: movies, loading, error, totalPages, getGenres } = useFetchItems("movie", "popular", currentPage);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <PacmanLoader color="#FFD700" size={50} />
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Calculamos qué páginas mostrar en el paginador
  const pageNumbersToShow = pages.filter((page) => {
    const start = Math.max(currentPage - 2, 1); // Muestra 2 páginas antes
    const end = Math.min(currentPage + 2, totalPages); // Muestra 2 páginas después
    return page >= start && page <= end;
  });

  return (
    <Container>
      <h1>Películas</h1>
      <Row>
        {movies.map((movie) => (
          <Col md={3} key={movie.id}>
            <MovieCard
              title={movie.title}
              description={movie.overview}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              genres={getGenres(movie.genre_ids).join(", ")} // Mostrar géneros
              link={`/movie-details/${movie.id}`}
            />
          </Col>
        ))}
      </Row>

      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(1)} />
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
        {pageNumbersToShow.map((page) => (
          <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
      </Pagination>
    </Container>
  );
}

export default Peliculas;
