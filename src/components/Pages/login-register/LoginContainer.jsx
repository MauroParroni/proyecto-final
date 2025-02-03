import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./LoginRegisterStyle.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import posterLogin from "../../../Images/poster-login.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalVariant, setModalVariant] = useState("primary");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(2);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  useEffect(() => {
    let timer;
    if (isLoginSuccessful && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isLoginSuccessful && timeRemaining === 0) {
      setModalShow(false);
      navigate("/profile");
    }
    return () => clearInterval(timer);
  }, [timeRemaining, isLoginSuccessful, navigate]);

  const onSubmit = async (data) => {
    setIsLoggingIn(true);
    setIsLoginSuccessful(false);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setModalTitle("Inicio de sesión exitoso");
        setModalMessage("¡Bienvenido! Serás redirigido en breve.");
        setModalVariant("success");
        setIsLoginSuccessful(true);
        setTimeRemaining(2);
      } else {
        setModalTitle("Error en el inicio de sesión");
        setModalMessage(result.message || "Correo o contraseña incorrectos.");
        setModalVariant("danger");
        setIsLoginSuccessful(false);
      }
      setModalShow(true);
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setModalTitle("Error del servidor");
      setModalMessage("No se pudo conectar al servidor. Inténtalo más tarde.");
      setModalVariant("warning");
      setIsLoginSuccessful(false);
      setModalShow(true);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login">
      <Container className="contenedor-login">
        <Row>
          <Col sm="6" className="p-0">
            <div className="contenedor-img">
              <img src={posterLogin} alt="Poster del login" />
            </div>
          </Col>
          <Col sm="6" className="col-form">
            <h1 className="titulo-login">VePelis</h1>
            <div className="contenedor-form">
              <h2>¡Bienvenido de vuelta!</h2>
              <h4>Ingresa tus datos</h4>
              <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  register={register}
                  errors={errors}
                />
                <Input
                  label="Contraseña"
                  type="password"
                  name="password"
                  register={register}
                  errors={errors}
                />
                <Button
                  className="boton-login"
                  variant="primary"
                  type="submit"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Ingresando..." : "Ingresar"}
                </Button>
                <p className="texto-registro">
                  ¿No tienes cuenta?{" "}
                  <Link to="/register" className="link-registro">
                    Regístrate
                  </Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className={`text-${modalVariant}`}>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant={modalVariant}
            onClick={() => setModalShow(false)}
            disabled={isLoginSuccessful && timeRemaining > 0}
          >
            {isLoginSuccessful && timeRemaining > 0
              ? `Redirigiendo al perfil (${timeRemaining}s)`
              : "Cerrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
