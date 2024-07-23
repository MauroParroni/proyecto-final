import './navbarStyle.css';

function BarraNav({ onFilterChange }) {
  const handleFilterChange = (filtro) => {
    onFilterChange(filtro); // Llama a la función de filtro proporcionada por el componente padre
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="navbar-transparent sticky-top px-3">
      <Navbar.Brand href="#home">
        <img
          src={logo}
          width="45"
          height="45"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Inicio</Nav.Link>
          <Nav.Link onClick={() => handleFilterChange('Películas')}>Peliculas</Nav.Link>
          <Nav.Link onClick={() => handleFilterChange('Series')}>Series</Nav.Link>
        </Nav>
        <Form className="d-flex ms-auto">
          <FormControl
            type="search"
            placeholder="Buscar"
            className="me-2"
            aria-label="Search"
          />
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

export default BarraNav;
