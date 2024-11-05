import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../../layout/cards/moviecard";
import { Container, Row, Col, Pagination } from "react-bootstrap";

function Series() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const seriesPerPage = 16;

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get("https://api.themoviedb.org/3/tv/popular", {
          params: {
            api_key: "4e44d9029b1270a757cddc766a1bcb63",
            language: "es-ES",
            page: currentPage,
          },
        });
        setSeries(response.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [currentPage]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalPages = 500;
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
              link={`/series-details/${serie.id}`}
            />
          </Col>
        ))}
      </Row>

      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(1)} />
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
        {pages.slice(0, 5).map((page) => (
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

export default Series;
