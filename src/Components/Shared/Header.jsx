import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/logo.svg";

function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand tag="div">
          <Nav.Link href="#home">
            <img
              src={logo}
              className="spin"
              alt="Logo"
              style={{ height: 50, width: 50 }}
            />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar />
      </Container>
    </Navbar>
  );
}

export default Header;
