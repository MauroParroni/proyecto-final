import React, { useState } from "react";
import BarraNav from "../../layout/navbar/navbar";
import Carousel from "react-bootstrap/Carousel";
import { Container, Row, Col, Form, ListGroup, Badge } from 'react-bootstrap';
import Footer from "../../layout/footer/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieCard from "../../layout/cards/moviecard";


function Busqueda() {
    const [genreFilter, setGenreFilter] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('Todos'); // Estado para almacenar el tipo de filtro seleccionado
    const [movies, setMovies] = useState([
        { id: 1, title: 'Película 1', rating: 9.5, type: 'Películas', genre: 'Acción', description: 'Descripción de la película 1.', imageUrl: 'https://es.web.img3.acsta.net/c_310_420/medias/nmedia/18/70/92/02/20149073.jpg' },
    { id: 2, title: 'Película 2', rating: 8.8, type: 'Películas', genre: 'Drama', description: 'Descripción de la película 2.', imageUrl: 'https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FeewRu7UdCHqUOI5JKCLymSroVYK.jpg&w=384&q=75' },
    { id: 3, title: 'Serie 1', rating: 9.3, type: 'Series', genre: 'Drama', description: 'Descripción de la serie 1.', imageUrl: 'https://pics.filmaffinity.com/From_Serie_de_TV-467064856-large.jpg' },
    { id: 4, title: 'Serie 2', rating: 8.9, type: 'Series', genre: 'Comedia', description: 'Descripción de la serie 2.', imageUrl: 'https://cuevana.biz/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F3Skm8boxLsoQZK9xq2chf0rQHfF.jpg&w=384&q=75' },
    ]);


  // Filtrar películas por género y tipo
  const filteredMovies = movies.filter(movie =>
    (genreFilter === '' || movie.genre === genreFilter) &&
    (tipoFiltro === 'Todos' || movie.type === tipoFiltro) // Aplica el filtro por tipo de contenido
  );

  const handleFilterChange = (filtro) => {
    setTipoFiltro(filtro); // Cambia el tipo de filtro según el botón seleccionado
  };

  const handleGenreFilterChange = (genre) => {
    setGenreFilter(genre); // Cambia el filtro de género
  };

    return (
        <>
            <BarraNav onFilterChange={handleFilterChange} />
            <Container>
      <Row className="my-4">
        <Col md={8}>
          <h2>Filtros</h2>
          <Form>
            <Form.Group controlId="filterGenre">
              <Form.Label style={{ display: 'none' }}>Género</Form.Label>
              <Form.Control as="select" value={genreFilter} onChange={(e) => handleGenreFilterChange(e.target.value)}>
                <option value="" disabled hidden>Género</option>
                <option value="">Todos</option>
                <option value="Acción">Acción</option>
                <option value="Comedia">Comedia</option>
                <option value="Drama">Drama</option>
              </Form.Control>
            </Form.Group>
          </Form>

          <h2>Resultados</h2>
          <Row>
            {filteredMovies.map((movie) => (
              <Col key={movie.id} md={6}>
                <MovieCard title={movie.title} description={movie.description} imageUrl={movie.imageUrl} type={movie.type} />
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={4}>
          <h2>Mejores Valoradas</h2>
          <ListGroup>
            {movies.filter(movie => movie.type === tipoFiltro).sort((a, b) => b.rating - a.rating).slice(0, 5).map((movie) => (
              <ListGroup.Item key={movie.id}>
                <Badge pill variant="primary">{movie.rating}</Badge> {movie.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
    <Footer onFilterChange={handleFilterChange} />
            </>
    );
}

export default Busqueda;