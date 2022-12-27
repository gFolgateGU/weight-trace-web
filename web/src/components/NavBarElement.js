import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

function NavBarElement() {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>EMV VIEW</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">
          <NavLink to="/">Home</NavLink></Nav.Link>
        <Nav.Link href="#about">
          <NavLink to="/about">About</NavLink></Nav.Link>
        <Nav.Link href="#contact">
          <NavLink to="/contact">Contact</NavLink></Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
}

export default NavBarElement;