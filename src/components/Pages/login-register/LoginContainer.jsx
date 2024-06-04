import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginRegisterStyle.css";
import { Link } from "react-router-dom";
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
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/[A-Z]/, {
      message: "La contraseña debe tener al menos una letra mayúscula",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe tener al menos una letra minúscula",
    })
    .regex(/\d/, { message: "La contraseña debe tener al menos un número" })
    .regex(/[^A-Za-z0-9]/, {
      message: "La contraseña debe tener al menos un carácter especial",
    })
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
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
            <h1 className="titulo-login">BEPPOPELIS</h1>
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

                <Button className="boton-login" variant="primary" type="submit">
                  Login
                </Button>
                <p className="texto-registro">
                  ¿No tienes cuenta?{" "}
                  <Link to="/register" className="link-registro">
                    Registrate
                  </Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
