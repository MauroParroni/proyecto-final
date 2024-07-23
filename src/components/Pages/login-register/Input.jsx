import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import "./InputStyle.css";

const Input = ({ label, type, name, register, errors }) => {

  useEffect(() => {
    const input = document.getElementById(name);
    const handleInput = () => {
      if (input.value) {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    };
    input.addEventListener('input', handleInput);
    handleInput(); // Check initial value

    return () => {
      input.removeEventListener('input', handleInput);
    };
  }, [name]);

  return (
    <Form.Group className="inputGroup" controlId={name}>
      <Form.Control {...register(name)} type={type} autoComplete="off" />
      <Form.Label>{label}</Form.Label>
      {errors[name] && (
        <p style={{ color: "red" }}>{errors[name].message}</p>
      )}
    </Form.Group>
  );
};

export default Input;
