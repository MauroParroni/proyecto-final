import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../../../Images/VePelis-removebg-preview.png";
import "./navbarStyle.css";

function BarraNav() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [movieGenresList, setMovieGenresList] = useState([]);
  const [tvGenresList, setTvGenresList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchGenres = async () => {
    try {
      const apiKey = "4e44d9029b1270a757cddc766a1bcb63";
      const movieGenres = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
        params: { api_key: apiKey, language: "es-ES" },
      });
      const tvGenres = await axios.get("https://api.themoviedb.org/3/genre/tv/list", {
        params: { api_key: apiKey, language: "es-ES" },
      });
      setMovieGenresList(movieGenres.data.genres);
      setTvGenresList(tvGenres.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const apiKey = "4e44d9029b1270a757cddc766a1bcb63";

        const [movieResponse, tvResponse] = await Promise.all([
          axios.get("https://api.themoviedb.org/3/search/movie", {
            params: { api_key: apiKey, language: "es-ES", query },
          }),
          axios.get("https://api.themoviedb.org/3/search/tv", {
            params: { api_key: apiKey, language: "es-ES", query },
          }),
        ]);

        const movies = movieResponse.data.results.map((item) => ({
          ...item,
          media_type: "movie",
        }));
        const tvShows = tvResponse.data.results.map((item) => ({
          ...item,
          media_type: "tv",
        }));

        setSearchResults([...movies, ...tvShows]);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [query]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(value.trim() !== "");
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      navigate(`/busqueda?query=${query}`);
    }
  };

  const handleResultClick = () => {
    setQuery("");
    setShowDropdown(false);
  };

  const handleLinkClick = () => {
    if (isNavbarOpen) {
      setIsNavbarOpen(false);
    }
  };

  useEffect(() => {
    setQuery("");
    setShowDropdown(false);
  }, [location.pathname]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/busqueda?query=${query}`);
    }
  };

  const handleGenreSelect = (genreId, type) => {
    navigate(`/${type}/genero/${genreId}`);
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="navbar-transparent sticky-top px-3" expanded={isNavbarOpen}>
      <Link to="/" className="navbar-brand" onClick={handleLinkClick}>
        <img src={logo} width="45" height="45" className="d-inline-block align-top" alt="Logo" />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/" className="nav-link active" onClick={handleLinkClick}>Inicio</Link>
          <Link to="/peliculas" className="nav-link active" onClick={handleLinkClick}>Peliculas</Link>
          <Link to="/series" className="nav-link active" onClick={handleLinkClick}>Series</Link>
        </Nav>

        {/* Formulario de búsqueda */}
        <Form className="d-flex ms-auto position-relative" onSubmit={(e) => e.preventDefault()}>
          <FormControl
            type="search"
            placeholder="Buscar"
            className="me-2"
            aria-label="Search"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <Button variant="outline-light" className="me-2" onClick={handleSearchClick}>
            Buscar
          </Button>
          {showDropdown && searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.slice(0, 10).map((result) => (
                <Link
                  key={result.id}
                  to={result.media_type === "tv" ? `/series-details/${result.id}` : `/movie-details/${result.id}`}
                  className="search-result-item"
                  onClick={handleResultClick}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                    alt={result.title || result.name}
                    className="result-poster"
                  />
                  <span className="result-title">{result.title || result.name}</span>
                </Link>
              ))}
            </div>
          )}
        </Form>

        {/* Dropdown para géneros */}
        <Dropdown align="end">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Géneros
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu-two-columns">
            {/* Columna para géneros de Películas */}
            <div className="dropdown-column">
              <h6>Películas</h6>
              <div className="dropdown-list">
              {movieGenresList && movieGenresList.length > 0 ? (
                movieGenresList.map((genre) => (
                  <Dropdown.Item key={genre.id} onClick={() => handleGenreSelect(genre.id, "peliculas")}>
                    {genre.name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>Loading...</Dropdown.Item>
              )}
              </div>
            </div>

            {/* Columna para géneros de Series */}
            <div className="dropdown-column">
              <h6>Series</h6>
                <div className="dropdown-list">
              {tvGenresList && tvGenresList.length > 0 ? (
                tvGenresList.map((genre) => (
                  <Dropdown.Item key={genre.id} onClick={() => handleGenreSelect(genre.id, "series")}>
                    {genre.name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>Loading...</Dropdown.Item>
              )}
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default BarraNav;
