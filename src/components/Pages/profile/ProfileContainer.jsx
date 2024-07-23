import React from "react";
import "./ProfileStyle.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Profile(props) {
  return (
    <div className="profile">
      <h1 className="titulo-pagina">Mi perfil</h1>
      <Container>
        <Row>
          <Col className="contenedor-imagen">
            <img
              src={require("./foto-perfil.png")}
              alt={`"Foto de ${props.nombre}"`}
              className="imagen-perfil"
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="contenedor-datos">
          <Col sm="6">
            <div className="datos datos-div1">
              <p><i class="bi bi-person-fill"></i>
                <strong>
                  Nombre <br />{" "}
                </strong>
                {props.nombre}
              </p>
              <p><i class="bi bi-person-square"></i>
                <strong>
                  Nombre de usuario <br />{" "}
                </strong>
                {props.usuario}
              </p>
              <p><i class="bi bi-globe"></i>
                <strong>
                  Nacionalidad <br />{" "}
                </strong>
                {props.nacionalidad}
              </p>
            </div>
          </Col>
          <Col sm="6">
            <div className="datos datosdiv2">
              <p><i class="bi bi-envelope-at"></i>
                <strong>
                  Email <br />{" "}
                </strong>
                {props.email}
              </p>
              <p><i class="bi bi-gender-neuter"></i>
                <strong>
                  Genero <br />{" "}
                </strong>
                {props.genero}
              </p>
              <p><i class="bi bi-hash"></i>
                <strong>Edad</strong> <br />
                {props.edad}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <hr className="separador" />
      <h2 className="titulo-peliculas">Películas favoritas</h2>
      <Container>
        <Row className="contenedor-peliculas">
          <Col sm="6" md="4" lg="3" xxl="2">
            <div className="pelicula-favorita">
              <h3 className="titulo-pelicula">{props.nombrePelicula}Rocky</h3>
              <img
                className="poster-pelicula"
                src={require("./poster-rocky.jpg")}
                alt=""
              />
            </div>
          </Col>
          <Col sm="6" md="4" lg="3" xxl="2">
            <div className="pelicula-favorita">
              <h3 className="titulo-pelicula">Rocky</h3>
              <img
                className="poster-pelicula"
                src={require("./poster-rocky.jpg")}
                alt=""
              />
            </div>
          </Col>
          <Col sm="6" md="4" lg="3" xxl="2">
            <div className="pelicula-favorita">
              <h3 className="titulo-pelicula">Rocky</h3>
              <img
                className="poster-pelicula"
                src={require("./poster-rocky.jpg")}
                alt=""
              />
            </div>
          </Col>
          <Col sm="6" md="4" lg="3" xxl="2">
            <div className="pelicula-favorita">
              <h3 className="titulo-pelicula">Rocky</h3>
              <img
                className="poster-pelicula"
                src={require("./poster-rocky.jpg")}
                alt=""
              />
            </div>
          </Col>
          <Col sm="6" md="4" lg="3" xxl="2">
            <div className="pelicula-favorita">
              <h3 className="titulo-pelicula">Rocky</h3>
              <img
                className="poster-pelicula"
                src={require("./poster-rocky.jpg")}
                alt=""
              />
            </div>
          </Col>
          <Col sm="6" md="4" lg="3" xxl="2">
            <div className="pelicula-favorita">
              <h3 className="titulo-pelicula">Rocky</h3>
              <img
                className="poster-pelicula"
                src={require("./poster-rocky.jpg")}
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
