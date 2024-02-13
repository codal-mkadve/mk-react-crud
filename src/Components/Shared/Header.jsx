import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand tag="div">
          <Nav.Item href="#home">
            <img
              src={logo}
              className="spin"
              alt="Logo"
              style={{ height: 50, width: 50 }}
            />
          </Nav.Item>
        </Navbar.Brand>
        <Nav className="me-auto" navbar>
          <Nav.Item className="nav-link">
            <Link to="/">Dashboard</Link>
          </Nav.Item>
          <Nav.Item className="nav-link">
            <Link to="/users">Users</Link>
          </Nav.Item>
        </Nav>
        <Navbar />
      </Container>
    </Navbar>
  );
}

export default Header;
