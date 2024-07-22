import React, { useState } from "react";
import { Card, Row, Col, Modal } from "react-bootstrap";
import BarraNav from "../../layout/navbar/navbar";
import Footer from "../../layout/footer/footer";
import "./moviedetailStyles.css";

const movie = {
  title: "Cars",
  genero: "Animación, Aventura, Comedia",
  description:
    "Un coche de carreras llamado Rayo McQueen se pierde en Radiador Springs, donde encuentra el verdadero significado de la amistad y la familia.",
  imageUrl:
    "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/A6A0477DA809F962FBA9A54E53C40E66F6182B822AC8CF0AD1BCDFB8D8CBEC6A/scale?width=1200&aspectRatio=1.78&format=webp",
  videoUrl: "https://www.youtube.com/embed/5jktC_W-_M0",
};
const relatedMovies = [
  {
    title: "Toy Story",
    genero: "Animación, Aventura, Comedia",
    description:
      "La vida de los juguetes toma un giro inesperado cuando el favorito de Andy, Buzz Lightyear, se une al grupo.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0420/1044/3928/products/00719ToyStory_Blackstone__Rounded.png?v=1628182506",
    videoUrl: "https://www.youtube.com/embed/XYZ123",
  },
  {
    title: "Monsters, Inc.",
    genero: "Animación, Aventura, Comedia",
    description:
      "En el mundo de los monstruos, la empresa Monsters, Inc. genera energía a partir de las risas de los niños, pero un pequeño error lo cambia todo.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMTY1NTI0ODUyOF5BMl5BanBnXkFtZTgwNTEyNjQ0MDE@._V1_FMjpg_UX1000_.jpg",
    videoUrl: "https://www.youtube.com/embed/ABC456",
  },
  {
    title: "Finding Nemo",
    genero: "Animación, Aventura, Comedia",
    description:
      "Cuando su hijo Nemo es capturado por un buzo, el pez payaso Marlin emprende un viaje épico para encontrarlo con la ayuda de la olvidadiza Dory.",
    imageUrl:
      "https://es.web.img3.acsta.net/pictures/14/02/13/11/08/054573.jpg",
    videoUrl: "https://www.youtube.com/embed/DEF789",
  },
  {
    title: "The Incredibles",
    genero: "Animación, Aventura, Comedia",
    description:
      "La familia de superhéroes Parr intenta llevar una vida normal, pero cuando el malvado Syndrome amenaza al mundo, deben unirse para salvarlo.",
    imageUrl:
      "https://es.web.img2.acsta.net/medias/nmedia/18/89/87/86/20070947.jpg",
    videoUrl: "https://www.youtube.com/embed/GHI012",
  },
  {
    title: "Ratatouille",
    genero: "Animación, Aventura, Comedia",
    description:
      "Remy, una rata con un paladar excepcional, sueña con convertirse en chef y se embarca en una aventura culinaria en París.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0051/8845/2401/products/00875Rataouille_Blackstone__Rounded_300x.png?v=1630065927",
    videoUrl: "https://www.youtube.com/embed/JKL345",
  },
];

const Moviedetails = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const relatedMoviesFiltered = relatedMovies.filter(
    (movie) => movie.genero === movie.genero
  );

  const groupedRelatedMovies = [];
  for (let i = 0; i < relatedMoviesFiltered.length; i += 4) {
    groupedRelatedMovies.push(relatedMoviesFiltered.slice(i, i + 4));
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < relatedMovies.length - 4 ? prevIndex + 1 : prevIndex
    );
  };
  return (
    <>
      <BarraNav />
      <div>
        <Card className="bg-dark text-white">
          <Row noGutters>
            <Col md={4}>
              <Card.Img
                src={movie.imageUrl}
                alt={movie.title}
                style={{ height: "100%", objectFit: "cover" }}
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <h2>{movie.title}</h2>
                <Card.Text>
                  <strong>Género:</strong> {movie.genero}
                </Card.Text>
                <Card.Text>{movie.description}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="mt-4 netflix-player">
        <div className="video-container">
          <video controls className="video-player">
            <source src={movie.videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="container text-center mt-4 ">
        <h1 className="text-white">Películas Relacionadas</h1>
        <div className="related-movies-carousel">
          <button className="carousel-control prev" onClick={handlePrev}>
            &lt;
          </button>
          <div className="carousel-inner">
            {relatedMovies
              .slice(currentIndex, currentIndex + 4)
              .map((relatedMovie, index) => (
                <Card className="bg-dark text-white related-movie-card">
                  <Card.Img
                    src={relatedMovie.imageUrl}
                    alt={relatedMovie.title}
                    className="img-related-movies"
                  />
                </Card>
              ))}
          </div>
          <button className="carousel-control next" onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Moviedetails;
