import React from "react";
import { Link } from "react-router-dom"; // Importar Link de react-router-dom
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "./footerStyle.css";

function Footer() {
  return (
    <footer className="bg-dark text-white">
      <Container fluid>
        <Row className="px-3">
          <Col
            md={4}
            className="d-flex flex-column align-items-start justify-content-start mt-2 mb-4 mb-md-0 align-items-md-center"
          >
            <div className="flex-column">
              <h5>Sobre nosotros</h5>
              <p>Somos C. Jeremias, L. Franco, C. Maximiliano y P. Mauro.</p>
              <p>
                Esta es una plataforma para ver <strong> Películas</strong> y <strong> Series</strong> de manera
                gratuita, la cual forma parte de un proyecto de fin de carrera
                para la materia <strong> Práctica Profesionalizante</strong> de la carrera
                <strong> Desarrollo de Software</strong>.
              </p>
            </div>
          </Col>
          <Col
            md={4}
            className="d-flex flex-column align-items-start justify-content-start mb-4 align-items-md-center"
          >
            <Nav className="flex-column">
              <h5 className="mb-3">Links</h5>
              <Nav.Item className="footer-link">
                <Link to="/"> Inicio</Link>
              </Nav.Item>
              <Nav.Item className="footer-link">
                <Link to="/peliculas">Películas</Link>
              </Nav.Item>
              <Nav.Item className="footer-link">
                <Link to="/series">Series</Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col
            md={4}
            className="d-flex flex-column align-items-start justify-content-start mb-2 mb-md-4 align-items-md-center"
          >
            <div className="flex-column">
              <h5>Contáctanos</h5>
              <p>E-mail: crotolamo@gmail.com</p>
              <p>Tel: +54 9 3476069420</p>
            </div>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <p className="mb-2">
              &copy; 2024 VePelis. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
