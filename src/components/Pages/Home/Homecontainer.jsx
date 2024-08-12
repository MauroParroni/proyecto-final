import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './homecontainer.css';
import { Link } from "react-router-dom";


function Home() {
  const peliculas = [
    {
      id: 1,
      titulo: "The Shawshank Redemption",
      descripcion: "Dos hombres encarcelados se forjan una amistad duradera y encuentran redención a través de actos de decencia común.",
      imagen: "https://m.media-amazon.com/images/I/51x65RBuFnL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 2,
      titulo: "The Godfather",
      descripcion: "El patriarca de una poderosa familia criminal trasfiere el control de su imperio clandestino a su hijo renuente.",
      imagen: "https://m.media-amazon.com/images/S/pv-target-images/7d2081c07a6afa338191e68c73e1959f7761b53cf9b691d59926aa0ef89874e5.jpg",
    },
    {
      id: 3,
      titulo: "The Dark Knight",
      descripcion: "Cuando el Guasón emerge como un nuevo villano, Batman debe aceptar uno de los mayores desafíos psicológicos y físicos para enfrentarlo.",
      imagen: "https://m.media-amazon.com/images/S/pv-target-images/fba136c7b31cf00c94edf3bed55173ea1e5005ebf3b95b0d7acfc4523f2ad699.jpg",
    },
    {
      id: 4,
      titulo: "Schindler's List",
      descripcion: "En la Polonia ocupada por los nazis durante la Segunda Guerra Mundial, el industrial Oskar Schindler salva a más de mil refugiados judíos al ofrecerles trabajo en sus fábricas.",
      imagen: "https://m.media-amazon.com/images/S/pv-target-images/aa5cac95bc315aaabe517ebab283f4157a6006d907db702d807f463f8a15c52c.jpg",
    },
    {
      id: 5,
      titulo: "Forrest Gump",
      descripcion: "La vida de Forrest Gump, un hombre de inteligencia limitada pero con un corazón enorme, mientras presencia y participa en eventos históricos.",
      imagen: "https://m.media-amazon.com/images/S/pv-target-images/ee36e1b2c68685dc3d3c5815800e8628ba09223fb196acb83baaa885dea3c39c.jpg",
    },
    {
      id: 6,
      titulo: "Inception",
      descripcion: "Un ladrón que roba secretos corporativos mediante el uso de tecnología de sueños compartidos recibe la tarea inversa de implantar una idea en la mente de un director general.",
      imagen: "https://m.media-amazon.com/images/S/pv-target-images/17a24723ffa0105d2d508586e08ecf72f7e6712888e4ac1a7cad6cd52d6dcd21.jpg",
    },
    {
      id: 7,
      titulo: "The Matrix",
      descripcion: "Un hacker descubre que la realidad tal como la conocemos es una simulación y se une a la rebelión contra las máquinas que la controlan.",
      imagen: "https://m.media-amazon.com/images/S/pv-target-images/06d86913c84a8e3c32f08eaabc56d8fded1c58943f1b4150c9fd0a9d4cea7a70.jpg",
    },
    {
      id: 8,
      titulo: "Fight Club",
      descripcion: "Un oficinista insomne y un fabricante de jabón forman un club de pelea clandestino que evoluciona hacia algo mucho más grande.",
      imagen: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_SY445_.jpg",
    }
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <body className="backround-container">
        <h1 className="tittle">Especialistas en el contenido</h1>
        <Container>
      <Row>
        {peliculas.map((pelicula) => (
          <Col md={3} key={pelicula.id}>
            <Card>
              <Card.Img variant="top" src={pelicula.imagen} />
              <Card.Body>
                <Card.Title>{pelicula.titulo}</Card.Title>
                <Card.Text>{pelicula.descripcion}</Card.Text>
                <Link to={`/movie-details`}>
                  <Button variant="primary">Ver Detalles</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
        <h1 className="tittle">Nuestra mejor selección</h1>
        <div className="carousel-container">
          <Container>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src="https://i.ytimg.com/vi/pfoOH2bKz3Y/maxresdefault.jpg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <div className="carousel-text">
                  <h3>En las profundidades del Sena</h3>
                  <p>Para salvar París de un baño de sangre, una afligida científica se ve obligada a enfrentarse a su trágico pasado cuando un tiburón gigante aparece en el Sena.</p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src="https://e.rpp-noticias.io/xlarge/2024/05/17/575457_1583517.webp"
                  alt="Second slide"
                />
                <Carousel.Caption>
                <div className="carousel-text">
                  <h3>Chabuca</h3>
                  <p>Chabuca​ es una película biográfica peruana de 2024, producida por la productora Tondero Producciones y dirigida por Jorge Carmona, basada en la vida del presentador y drag queen peruano Ernesto Pimentel.</p>
                </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src="https://i.ytimg.com/vi/uFR1wbwaORg/mqdefault.jpg"
                  alt="Third slide"
                />
                <Carousel.Caption>
                <div className="carousel-text">
                  <h3>Jaque mate</h3>
                  <p>Un agente secreto retirado se ve forzado a regresar a la acción cuando su sobrina es secuestrada, siendo obligado a robar una fórmula científica como el pago para su liberación.</p>
                </div>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Container>
        </div>

        <div className="slider-container">
        <h1 className="tittle">Todos los titulos</h1>
        <Container>
        <Slider {...settings}>
          {peliculas.map((pelicula) => (
            <div key={pelicula.id} className="slider-item">
              <img className="carousel-img" src={pelicula.imagen} alt={pelicula.titulo} />
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
