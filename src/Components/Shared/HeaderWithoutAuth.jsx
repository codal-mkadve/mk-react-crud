import logo from "../../assets/images/logo.svg";
import { Container, Nav, Navbar } from "react-bootstrap";

function HeaderWithoutAuth() {
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
        <Navbar />
      </Container>
    </Navbar>
  );
}

export default HeaderWithoutAuth;
