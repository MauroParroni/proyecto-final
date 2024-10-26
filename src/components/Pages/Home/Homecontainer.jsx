import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./homecontainer.css";
import { Link } from "react-router-dom";
import MovieCard from "../../layout/cards/moviecard";
import MovieCarousel from "../../layout/carousel/carousel";

function Home() {
  const movies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      description:
        "Dos hombres encarcelados se forjan una amistad duradera y encuentran redención a través de actos de decencia común.",
      imageUrl:
        "https://m.media-amazon.com/images/I/51x65RBuFnL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 2,
      title: "The Godfather",
      description:
        "El patriarca de una poderosa familia criminal trasfiere el control de su imperio clandestino a su hijo renuente.",
      imageUrl:
        "https://m.media-amazon.com/images/S/pv-target-images/7d2081c07a6afa338191e68c73e1959f7761b53cf9b691d59926aa0ef89874e5.jpg",
    },
    {
      id: 3,
      title: "The Dark Knight",
      description:
        "Cuando el Guasón emerge como un nuevo villano, Batman debe aceptar uno de los mayores desafíos psicológicos y físicos para enfrentarlo.",
      imageUrl:
        "https://m.media-amazon.com/images/S/pv-target-images/fba136c7b31cf00c94edf3bed55173ea1e5005ebf3b95b0d7acfc4523f2ad699.jpg",
    },
    {
      id: 4,
      title: "Schindler's List",
      description:
        "En la Polonia ocupada por los nazis durante la Segunda Guerra Mundial, el industrial Oskar Schindler salva a más de mil refugiados judíos al ofrecerles trabajo en sus fábricas.",
      imageUrl:
        "https://m.media-amazon.com/images/S/pv-target-images/aa5cac95bc315aaabe517ebab283f4157a6006d907db702d807f463f8a15c52c.jpg",
    },
    {
      id: 5,
      title: "Forrest Gump",
      description:
        "La vida de Forrest Gump, un hombre de inteligencia limitada pero con un corazón enorme, mientras presencia y participa en eventos históricos.",
      imageUrl:
        "https://m.media-amazon.com/images/S/pv-target-images/ee36e1b2c68685dc3d3c5815800e8628ba09223fb196acb83baaa885dea3c39c.jpg",
    },
    {
      id: 6,
      title: "Inception",
      description:
        "Un ladrón que roba secretos corporativos mediante el uso de tecnología de sueños compartidos recibe la tarea inversa de implantar una idea en la mente de un director general.",
      imageUrl:
        "https://m.media-amazon.com/images/S/pv-target-images/17a24723ffa0105d2d508586e08ecf72f7e6712888e4ac1a7cad6cd52d6dcd21.jpg",
    },
    {
      id: 7,
      title: "The Matrix",
      description:
        "Un hacker descubre que la realidad tal como la conocemos es una simulación y se une a la rebelión contra las máquinas que la controlan.",
      imageUrl:
        "https://m.media-amazon.com/images/S/pv-target-images/06d86913c84a8e3c32f08eaabc56d8fded1c58943f1b4150c9fd0a9d4cea7a70.jpg",
    },
    {
      id: 8,
      title: "Fight Club",
      description:
        "Un oficinista insomne y un fabricante de jabón forman un club de pelea clandestino que evoluciona hacia algo mucho más grande.",
      imageUrl:
        "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_SY445_.jpg",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <body className="background-container">
        <h1 className="title">Especialistas en el contenido</h1>
        <Container>
          <Row>
            {movies.map((movie) => (
              <Col md={3} key={movie.id}>
                <MovieCard
                  title={movie.title}
                  description={movie.description}
                  imageUrl={movie.imageUrl}
                  link={`/movie-details/${movie.id}`}
                />
              </Col>
            ))}
          </Row>
        </Container>
        <h1 className="title">Nuestra mejor selección</h1>

        <MovieCarousel />

        <div className="slider-container">
          <h1 className="title">Todos los titles</h1>
          <Container>
            <Slider {...settings}>
              {movies.map((movie) => (
                <div key={movie.id} className="slider-item">
                  <img
                    className="carousel-img"
                    src={movie.imageUrl}
                    alt={movie.title}
                  />
                </div>
              ))}
            </Slider>
          </Container>
        </div>
      </body>
    </>
  );
}

export default Home;
