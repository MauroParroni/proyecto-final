import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./moviedetailStyles.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const embedLink = `https://www.2embed.cc/embed/${movie.imdb_id}`;
  
  const bannerUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div>
      {movie && (
        <>
          {movie.backdrop_path && (
            <div
              className="movie-banner"
              style={{
                backgroundImage: `url(${bannerUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "50vh",
              }}
            >
              <div className="banner-overlay">
                <h1>{movie.title}</h1>
              </div>
            </div>
          )}

          <div className="movie-details-content">
            <p>{movie.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <iframe className="embed" src={embedLink} width="100%" height="100%" frameborder="0" allowfullscreen="true"></iframe>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
