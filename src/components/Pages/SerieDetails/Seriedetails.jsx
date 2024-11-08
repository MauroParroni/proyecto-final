import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RecommendationCarousel from "../../layout/carousel/RecommendationCarousel";
import useFetchItems from "../../../hooks/useFetchMovies"; 
import "./seriedetailStyles.css";
import { PacmanLoader } from "react-spinners";

function SerieDetails() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedSeries, setRecommendedSeries] = useState([]);
  const { items: genres, getGenres } = useFetchItems("tv", "popular");

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
          params: {
            api_key: "4e44d9029b1270a757cddc766a1bcb63",
            language: "es-ES",
          },
        });
        setSeries(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (series) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}`,
            {
              params: {
                api_key: "4e44d9029b1270a757cddc766a1bcb63",
                language: "es-ES",
              },
            }
          );
          setEpisodes(response.data.episodes);
          setSelectedEpisode(1);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchEpisodes();
  }, [id, selectedSeason, series]);

  useEffect(() => {
    const fetchSeriesRecommendations = async () => {
      if (series) {
        try {
          const selectedGenres = series.genres.map(genre => genre.id);
          const response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
            params: {
              api_key: "4e44d9029b1270a757cddc766a1bcb63",
              language: "es-ES",
              with_genres: selectedGenres.join(','), 
              page: 1,

            },
          });
          setRecommendedSeries(response.data.results);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchSeriesRecommendations();
  }, [id, series]);


  if (loading)return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <PacmanLoader color="#FFD700" size={50} />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const embedLink = `https://www.2embed.cc/embedtv/${id}&s=${selectedSeason}&e=${selectedEpisode}`;
  const bannerUrl = `https://image.tmdb.org/t/p/original${series.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${series.poster_path}`;

  return (
    <div>
      {series && (
        <>
          {/* Banner */}
          {series.backdrop_path && (
            <div
              className="series-banner"
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
                <h1 className="series-title">{series.name}</h1>
              </div>
            </div>
          )}

          {/* Series Details */}
          <div className="series-details-content d-flex flex-column flex-sm-row justify-content-center align-items-center ">
            <div className="series-poster">
              <img src={posterUrl} alt={series.name} />
            </div>
            <div>
              <h2>{series.name}</h2>
              <p><strong>Género:</strong> {series.genres.map(genre => genre.name).join(", ")}</p>
              <p><strong>Temporadas:</strong> {series.number_of_seasons}</p>
              <p><strong>Episodios:</strong> {series.number_of_episodes}</p>
              <p><strong>Sinopsis:</strong> {series.overview}</p>

              <div>
                <label htmlFor="season-select"><strong>Selecciona Temporada:</strong></label>
                <select
                  id="season-select"
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(parseInt(e.target.value))}
                >
                  {Array.from({ length: series.number_of_seasons }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Temporada {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="episode-select"><strong>Selecciona Episodio:</strong></label>
                <select
                  id="episode-select"
                  value={selectedEpisode}
                  onChange={(e) => setSelectedEpisode(parseInt(e.target.value))}
                >
                  {episodes.map((episode) => (
                    <option key={episode.id} value={episode.episode_number}>
                      Episodio {episode.episode_number}: {episode.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Reproductor de video */}
          <div className="series-video">
            <iframe
              className="embed"
              src={embedLink}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="series trailer"
            ></iframe>
          </div>

           {/* Carrusel de recomendaciones */}
           {recommendedSeries.length > 0 && (
              <RecommendationCarousel recommendedItems={recommendedSeries} type="series" />
            )}
        </>
      )}
    </div>
  );
}

export default SerieDetails;
