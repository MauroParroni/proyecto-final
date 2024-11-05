import React from "react";
import { Carousel } from "react-bootstrap";

const carouselItems = [
  {
    imgSrc: "https://i.ytimg.com/vi/pfoOH2bKz3Y/maxresdefault.jpg",
    altText: "First slide",
    title: "En las profundidades del Sena",
    description:
      "Para salvar París de un baño de sangre, una afligida científica se ve obligada a enfrentarse a su trágico pasado cuando un tiburón gigante aparece en el Sena.",
  },
  {
    imgSrc: "https://e.rpp-noticias.io/xlarge/2024/05/17/575457_1583517.webp",
    altText: "Second slide",
    title: "Chabuca",
    description:
      "Chabuca​ es una película biográfica peruana de 2024, producida por la productora Tondero Producciones y dirigida por Jorge Carmona, basada en la vida del presentador y drag queen peruano Ernesto Pimentel.",
  },
  {
    imgSrc: "https://i.ytimg.com/vi/uFR1wbwaORg/mqdefault.jpg",
    altText: "Third slide",
    title: "Jaque mate",
    description:
      "Un agente secreto retirado se ve forzado a regresar a la acción cuando su sobrina es secuestrada, siendo obligado a robar una fórmula científica como el pago para su liberación.",
  },
];

const MovieCarousel = () => {
  return (
    <Carousel>
      {carouselItems.map((item, index) => (
        <Carousel.Item key={index} className="mx-0">
          <img
            className="d-block w-100"
            src={item.imgSrc}
            alt={item.altText}
          />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MovieCarousel;
