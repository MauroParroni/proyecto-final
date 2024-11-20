import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import * as robotError from "../../../assets/robot-error.json";

const NotFound = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: robotError, // Animación de Lottie
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <Lottie options={defaultOptions} height={200} width={200} />
        <h3 style={{ color: "#FF0000" }}>¡Página no encontrada!</h3>
        <p>Lo sentimos, no pudimos encontrar la página que buscabas.</p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Ir al Inicio
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
