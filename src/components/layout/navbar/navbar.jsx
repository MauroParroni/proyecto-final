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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const apiKey = "4e44d9029b1270a757cddc766a1bcb63";

        const [movieResponse, tvResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: { api_key: apiKey, language: "es-ES", query },
          }),
          axios.get(`https://api.themoviedb.org/3/search/tv`, {
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

  useEffect(() => {
    setQuery("");
    setShowDropdown(false);
  }, [location.pathname]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/busqueda?query=${query}`);
    }
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="navbar-transparent sticky-top px-3">
      <Link to="/" className="navbar-brand">
        <img src={logo} width="45" height="45" className="d-inline-block align-top" alt="React Bootstrap logo" />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/" className="nav-link active">Inicio</Link>
          <Link to="/peliculas" className="nav-link active">Peliculas</Link>
          <Link to="/series" className="nav-link active">Series</Link>
        </Nav>
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
                  to={
                    result.media_type === "tv"
                      ? `/series-details/${result.id}`
                      : `/movie-details/${result.id}`
                  }
                  className="search-result-item"
                  onClick={handleResultClick}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                    alt={result.title || result.name}
                    className="result-poster"
                  />
                  <span className="result-title">
                    {result.title || result.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Form>
        {/*<Dropdown align="end">
          <Dropdown.Toggle variant="outline-light">Login</Dropdown.Toggle>
          <Dropdown.Menu>
            <Link to="/login" className="dropdown-item">Login</Link>
            <Link to="/register" className="dropdown-item">Registrarse</Link>
          </Dropdown.Menu>
        </Dropdown>*/}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default BarraNav;
