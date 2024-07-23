import React from "react";
import { Card, Image } from 'react-bootstrap';

const MovieCard = ({ title, description, imageUrl, type }) => {
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
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
