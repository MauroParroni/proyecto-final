import React, { useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import MovieCard from "../../layout/cards/moviecard";
import useFetchItems from "../../../hooks/useFetchMovies";

function Series() {
  const [currentPage, setCurrentPage] = useState(1);
  const { items: series, loading, error, totalPages, getGenres } = useFetchItems("tv", "top_rated", currentPage);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Container>
      <h1>Series</h1>
      <Row>
        {series.map((serie) => (
          <Col md={3} key={serie.id}>
            <MovieCard
              title={serie.name}
              description={serie.overview}
              imageUrl={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
              genres={getGenres(serie.genre_ids).join(", ")} // Mostrar géneros
              link={`/series-details/${serie.id}`}
            />
          </Col>
        ))}
      </Row>

      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(1)} />
        <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
        {pages.slice(0, 5).map((page) => (
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
