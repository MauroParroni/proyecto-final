import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from '../../layout/cards/moviecard';
import { PacmanLoader } from "react-spinners";
import useFetchItems from '../../../hooks/useFetchMovies';
import Robotito from '../../layout/RobotError/Robotito';

const Generos = ({ tipo }) => {
  const { id } = useParams();
  const [filteredItems, setFilteredItems] = useState([]);

  const { items, loading, error, getGenres } = useFetchItems(
    tipo === "peliculas" ? "movie" : "tv",
    1,
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
</Container>
  );
};

export default Generos;
