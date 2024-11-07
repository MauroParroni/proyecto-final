import React from "react";
import Slider from "react-slick";
import MovieCard from "../cards/moviecard";
import useFetchItems from "../../../hooks/useFetchMovies"; 
import "./carrouselStyles.css";

const RecommendationCarousel = ({ recommendedItems, type, genres }) => {
    const { items: series, loading, error, totalPages, getGenres} = useFetchItems("tv", "popular");
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
      <button className="slick-next">
      </button>
    ),
    prevArrow: (
      <button className="slick-prev">
      </button>
    ),
  };

  return (
<div className={`recommendation-carousel ${type}`}>
  <h2>{type === "movie" ? "Películas Recomendadas" : "Series Recomendadas"}</h2>
  <Slider {...sliderSettings}>
    {recommendedItems.map((item) => (
      <div key={item.id} className="carousel-item">
        <MovieCard
          title={type === "movie" ? item.title : item.name}
          description={item.overview}
          imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          genres={type === "movie" 
            ? getGenres(item.genre_ids).join(", ")  
            : getGenres(item.genre_ids).join(", ")} 
          link={`/${type}-details/${item.id}`}
        />
      </div>
    ))}
  </Slider>
</div>
  );
};

export default RecommendationCarousel;
