import React from "react";
import Slider from "react-slick";
import MovieCard from "../cards/moviecard";
import "./carrouselStyles.css";

const SeriesCarousel = ({ series, genres }) => {
   // Configuración del carrusel 
const sliderSettings = {
    dots: false, 
    infinite: true,
    speed: 800,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true, 
    cssEase: "ease-in-out", // Esto hace que la transición sea más suave
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } }, // 3 cards en pantallas medianas
      { breakpoint: 768, settings: { slidesToShow: 2 } },  // 2 cards en pantallas pequeñas
      { breakpoint: 480, settings: { slidesToShow: 1 } },  // 1 card en pantallas muy pequeñas
    ],
    nextArrow: (
      <button style={{ right: "5px", zIndex: 100 }} className="slick-next">
       
      </button>
    ),
    prevArrow: (
      <button style={{ left: "5px", zIndex: 100 }} className="slick-prev">
       
      </button>
    ),
  };
  

  return (
    <Slider {...sliderSettings}>
      {series.map((serie) => (
        <div key={serie.id}>
          <MovieCard
            title={serie.name}
            description={serie.overview}
            imageUrl={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
            genres={genres[serie.id]} // Mostrar géneros
            link={`/series-details/${serie.id}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default SeriesCarousel;
