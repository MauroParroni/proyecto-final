import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const MovieCard = ({ title, description, imageUrl, type, link }) => {
  return (
    <Card className="mb-3">
      <Image src={imageUrl} fluid />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Tipo: {type}
          <br />
          Descripción: {description}
        </Card.Text>
        <Link to={link}>
          <Button variant="primary">Ver Detalles</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
