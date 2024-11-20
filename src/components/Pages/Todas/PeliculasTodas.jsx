import React, { useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import MovieCard from "../../layout/cards/moviecard";
import { PacmanLoader } from "react-spinners";
import './todasStyles.css';
import useFetchItems from "../../../hooks/useFetchMovies";
import Robotito from "../../layout/RobotError/Robotito";

function Peliculas() {
  const [currentPage, setCurrentPage] = useState(1);

  const { items: movies, loading, error, totalPages, getGenres } = useFetchItems("movie", currentPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <PacmanLoader color="#FFD700" size={50} />
      </div>
    );
  }

  if (error) {
    return <Robotito errorMessage={error} />;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pageNumbersToShow = pages.filter((page) => {
    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(currentPage + 2, totalPages);
    return page >= start && page <= end;
  });

  return (
    <Container>
      <h1 className="page-title">Películas</h1>
      <Row>
        {movies.map((movie) => (
          <Col xs={6} sm={6} md={6} lg={3} key={movie.id}>
            <MovieCard
              title={movie.title}
              description={movie.overview}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              genres={getGenres(movie.genre_ids, "movie").join(", ")}
              link={`/movie-details/${movie.id}`}
            />
          </Col>
        ))}
      </Row>

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
    </Container>
  );
}

export default Peliculas;
