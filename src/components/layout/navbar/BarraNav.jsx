import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../../../Images/5c5ce433-8a48-4301-91b9-d7f29644ead5.png';
import './navbarStyle.css';

export function BarraNav() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="navbar-transparent sticky-top px-3">
      <Navbar.Brand href="#home">
        <img
          src={logo}
          width="45"
          height="45"
          className="d-inline-block align-top"
          alt="React Bootstrap logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#homecontainer">Inicio</Nav.Link>
          <Nav.Link href="#link">Peliculas</Nav.Link>
          <Nav.Link href="#link">Series</Nav.Link>
        </Nav>
        <Form className="d-flex ms-auto">
          <FormControl
            type="search"
            placeholder="Buscar"
            className="me-2"
            aria-label="Search" />
          <Button variant="outline-light" className="me-2">Buscar</Button>
        </Form>
        <Dropdown align="end" className="ms-2">
          <Dropdown.Toggle variant="outline-light">
            Login
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#login">Login</Dropdown.Item>
            <Dropdown.Item href="#register">Registrarse</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}
