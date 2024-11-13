import React, { useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import MovieCard from "../../layout/cards/moviecard";
import useFetchItems from "../../../hooks/useFetchMovies"; 
import { PacmanLoader } from "react-spinners";
import './todasStyles.css'
import Lottie from "react-lottie";
import * as robotError from "../../../assets/robot-error.json";

function Series() {
  const [currentPage, setCurrentPage] = useState(1);
  const { items: series, loading, error, totalPages, getGenres } = useFetchItems("tv", "popular", currentPage);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <PacmanLoader color="#FFD700" size={50} />
    </div>
  );
  if (error) {
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: robotError, // La animación JSON de tu robotito
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

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

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Calculamos qué páginas mostrar en el paginador
  const pageNumbersToShow = pages.filter((page) => {
    const start = Math.max(currentPage - 2, 1); // Muestra 2 páginas antes
    const end = Math.min(currentPage + 2, totalPages); // Muestra 2 páginas después
    return page >= start && page <= end;
  });

  return (
    <Container>
      <h1 className="page-title">Series</h1>
      <Row>
        {series.map((serie) => (
          <Col xs={6} sm={6} md={6} lg={3} key={serie.id}> {/* Ajuste de las columnas para 2 cards por fila */}
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
