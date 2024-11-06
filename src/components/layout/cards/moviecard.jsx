import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa"; // Icono de Play de react-icons
import "./moviecardstyle.css";

const MovieCard = ({ title, description, imageUrl, link, genres }) => {
  return (
    <Card className="movie-card mb-3">
      <div className="movie-card-container">
        <Image src={imageUrl} fluid className="movie-image" />
        <div className="movie-info">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
            <Card.Text>
              <strong>Géneros:</strong> {genres || "Sin géneros"}
            </Card.Text>
              <strong>Descripción:</strong> {description || "Sin descripción"}
            </Card.Text>
            <Link to={link}>
              <button className="play-button">
                <FaPlay />
              </button>
            </Link>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
