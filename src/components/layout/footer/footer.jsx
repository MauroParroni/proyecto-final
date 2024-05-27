import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "./footerStyle.css";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Final project for Programming and Professional Practices. We are
              C. Jeremias, C. Maximiliano, L. Fran, and P. Mauro. This is a
              website to watch movies 100% free.
            </p>
          </Col>
          <Col md={4}>
            <h5>Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="#home" className="text-white">
                Inicio
              </Nav.Link>
              <Nav.Link href="#link" className="text-white">
                Peliculas
              </Nav.Link>
              <Nav.Link href="#link" className="text-white">
                Series
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: crotolamo@gmail.com</p>
            <p>Phone: +54 9 3476366681</p>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; 2024 BeppoPelis. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
