import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./seriedetailStyles.css";

function SerieDetails() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
          params: {
            api_key: "4e44d9029b1270a757cddc766a1bcb63",
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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const embedLink = `https://www.2embed.cc/embedtv/${id}&s=${selectedSeason}&e=${selectedEpisode}`;

  const bannerUrl = `https://image.tmdb.org/t/p/original${series.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${series.poster_path}`;

  return (
    <div>
      {series && (
        <>
          {series.backdrop_path && (
            <div
              className="series-banner"
              style={{
                backgroundImage: `url(${bannerUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "50vh",
              }}
            >
              <div className="banner-overlay">
                <h1>{series.name}</h1>
              </div>
            </div>
          )}

          <div className="series-details-content">
            <img src={posterUrl} alt={series.name} />
            <h2>{series.name}</h2>
            <p>{series.overview}</p>
            <p><strong>Temporadas:</strong> {series.number_of_seasons}</p>
            <p><strong>Episodios:</strong> {series.number_of_episodes}</p>

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

            <iframe className="embed" src={embedLink} width="100%" height="100%" frameborder="0" allowfullscreen="true"></iframe>
          </div>
        </>
      )}
    </div>
  );
}

export default SerieDetails;
