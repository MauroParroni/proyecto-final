import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import MovieCard from '../../layout/cards/moviecard';
import { PacmanLoader } from "react-spinners";
import useFetchItems from '../../../hooks/useFetchMovies';
import Robotito from '../../layout/RobotError/Robotito';

const Generos = ({ tipo }) => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState([]);

  const { items, loading, error, totalPages, getGenres } = useFetchItems(
    tipo === "peliculas" ? "movie" : "tv",
    currentPage,
    parseInt(id)
  );

  useEffect(() => {
    if (!loading && items.length > 0) {
      const filtered = items.filter((item) =>
        item.genre_ids.includes(parseInt(id))
      );
      setFilteredItems(filtered);
    }
  }, [items, id, loading]);

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

  const tituloTipo = tipo === "peliculas" ? "Películas" : "Series";

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pageNumbersToShow = pages.filter((page) => {
    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(currentPage + 2, totalPages);
    return page >= start && page <= end;
  });

  return (
    <Container>
      {filteredItems.length > 0 && (
        <h2 className="page-title">
          {tituloTipo}: {getGenres([parseInt(id)], tipo === "peliculas" ? "movie" : "tv")[0]}
        </h2>
      )}
      <Row>
        {filteredItems.length === 0 ? (
          <Col>
            <Robotito errorMessage={`No se encontraron Películas o Series con ese género.`} />
          </Col>
        ) : (
          filteredItems.map((item) => {
            const title = item.title || item.name;
            const description = item.overview || "Sin descripción";
            const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
            const genres = getGenres(item.genre_ids, tipo === "peliculas" ? "movie" : "tv").join(", ");

            return (
              <Col xs={6} sm={6} md={4} lg={3} key={item.id}>
                <MovieCard
                  title={title}
                  description={description}
                  imageUrl={imageUrl}
                  link={`/${tipo === 'peliculas' ? 'movie-details' : 'series-details'}/${item.id}`}
                  genres={genres}
                />
              </Col>
            );
          })
        )}
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
};

export default Generos;
