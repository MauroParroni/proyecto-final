import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RecommendationCarousel from "../../layout/carousel/RecommendationCarousel";
import useFetchItems from "../../../hooks/useFetchMovies"; 
import "./moviedetailStyles.css";
import { PacmanLoader } from "react-spinners";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const { items: genres, getGenres } = useFetchItems("movie", "popular");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: "4e44d9029b1270a757cddc766a1bcb63",
            language: "es-ES",
          },
        });
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);
  useEffect(() => {
    const fetchMoviesRecommendations = async () => {
      if (movie) {
        try {
        
          const selectedGenres = movie.genres.map(genre => genre.id);
    
          const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
            params: {
              api_key: "4e44d9029b1270a757cddc766a1bcb63",
              language: "es-ES",
              with_genres: selectedGenres.join(','), 
              page: 1,  
            },
          });
    
          setRecommendedMovies(response.data.results); 
        } catch (err) {
          setError(err.message);  
        }
      }
    };
    
    fetchMoviesRecommendations();
  }, [id, movie]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <PacmanLoader color="#FFD700" size={50} />
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  const embedLink = `https://www.2embed.cc/embed/${movie.imdb_id}`;
  const bannerUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div>
      {movie && (
        <>
          {/* Banner */}
          <div
            className="movie-banner"
            style={{
              backgroundImage: `url(${bannerUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "35vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="banner-overlay">
              <h1 className="movie-title">{movie.title}</h1>
            </div>
          </div>

          {/* Movie Details */}
          <div className="movie-details-content">
            <div className="movie-poster">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
            <div>
            <h2>{movie.title}</h2>
            <p><strong>Género:</strong> {movie.genres.map(genre => genre.name).join(", ")}</p>
            <p><strong>Duración:</strong> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</p>
            <p><strong>Año:</strong> {movie.release_date.split("-")[0]}</p>
            <p><strong>Sinopsis:</strong> {movie.overview}</p>
            <p><strong>Rating:</strong> {movie.vote_average * 10}%</p>
            </div>
          </div>

           {/* Reproductor de video */}
           <div className="movie-video">
            <iframe
              className="embed"
              src={embedLink}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="movie trailer"
            ></iframe>
          </div>

                   {/* Carrusel de recomendaciones */}
                   {recommendedMovies.length > 0 && (
              <RecommendationCarousel recommendedItems={recommendedMovies} type="movie" />
            )}
        </>
      )}
    </div>
  );
}

export default MovieDetails;