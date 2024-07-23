import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginRegisterStyle.css";
import { Link } from "react-router-dom";
import posterLogin from "../../../Images/poster-login.jpg";
import Input from "./Input";
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
    }),
  name: z
    .string()
    .min(2, { message: "El nombre es requerido" })
    .max(50, { message: "El nombre es demasiado extenso" }),
  username: z
    .string()
    .min(2, { message: "El nombre de usuario es requerido" })
    .max(50, { message: "El nombre de usuario es demasiado extenso" }),
  dni: z
    .string()
    .regex(/^\d{7,8}$/, { message: "El DNI debe contener solo dígitos" }),
  age: z
    .string()
    .min(1, { message: "La edad es requerida" })
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 18, { message: "Debes tener al menos 18 años" })
    .refine((val) => val <= 120, {
      message: "La edad debe ser menor a 120 años",
    }),
  country: z.string().min(1, { message: "El país es requerido" }),
});

function Register() {
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
        <Row className="register">
          <Col sm="6" className="p-0">
            <div className="contenedor-img">
              <img
                className="register-img"
                src={posterLogin}
                alt="Poster del login"
              />
            </div>
          </Col>
          <Col sm="6" className="col-form col-form-register">
            <h1 className="titulo-login">BEPPOPELIS</h1>
            <div className="contenedor-form contenedor-form-register">
              <h2>¡Bienvenido!</h2>
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

                <Input
                  label="Nombre de Usuario"
                  type="text"
                  name="name"
                  register={register}
                  errors={errors}
                />

                <Input
                  label="Nombre"
                  type="text"
                  name="username"
                  register={register}
                  errors={errors}
                />

                <Input
                  label="DNI"
                  type="text"
                  name="dni"
                  register={register}
                  errors={errors}
                />

                <Input
                  label="Edad"
                  type="number"
                  name="age"
                  register={register}
                  errors={errors}
                />

                <Input
                  label="Pais"
                  type="text"
                  name="country"
                  register={register}
                  errors={errors}
                />

                <Button className="boton-login" variant="primary" type="submit">
                  Registrarse
                </Button>
                <p className="texto-registro">
                  ¿Ya tienes cuenta?{" "}
                  <Link to="/login" className="link-registro">
                    Login
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

export default Register;
