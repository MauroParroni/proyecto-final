import React from "react";
import Slider from "react-slick";
import MovieCard from "../cards/moviecard"; // Asume que el componente MovieCard está correctamente configurado
import "./carrouselStyles.css";

const MovieCarousel = ({ movies, genres }) => {
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
    { breakpoint: 1024, settings: { slidesToShow: 2 } }, // 2 cards en pantallas medianas
    { breakpoint: 768, settings: { slidesToShow: 2 } },  // 2 cards en pantallas pequeñas
    { breakpoint: 550, settings: {slidesToShow: 1}},    // 1 card en pantallas muy pequeñas
    { breakpoint: 480, settings: { slidesToShow: 1 } },  // 1 card en pantallas muy pequeñas
  ],
  nextArrow: (
    <button className="slick-next">
    </button>
  ),
  prevArrow: (
    <button className="slick-prev">
    </button>
  ),
};

  return (
    <Slider {...sliderSettings}>
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard
            title={movie.title}
            description={movie.overview}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            genres={genres[movie.id]} // Mostrar géneros
            link={`/movie-details/${movie.id}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default MovieCarousel;
