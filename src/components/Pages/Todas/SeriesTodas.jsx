import React, { useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import MovieCard from "../../layout/cards/moviecard";
import useFetchItems from "../../../hooks/useFetchMovies";
import { PacmanLoader } from "react-spinners";
import './todasStyles.css';
import Lottie from "react-lottie";
import * as robotError from "../../../assets/robot-error.json";
import Robotito from "../../layout/RobotError/Robotito";
import ScrollToTop from "../../layout/Scroll/scrolltoTop";

function Series() {
  const [currentPage, setCurrentPage] = useState(1);

  const { items: series, loading, error, totalPages, getGenres } = useFetchItems("tv", currentPage);

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
      <ScrollToTop />
      <h1 className="page-title">Series</h1>
      <Row>
        {series.map((serie) => (
          <Col xs={6} sm={6} md={6} lg={3} key={serie.id}>
            <MovieCard
              title={serie.name}
              description={serie.overview}
              imageUrl={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
              genres={getGenres(serie.genre_ids, "tv").join(", ")}
              link={`/series-details/${serie.id}`}
            />
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => setCurrentPage(1)} />
        <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
        {pageNumbersToShow.map((page) => (
          <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
      </Pagination>
    </Container>
  );
}

export default Series;
