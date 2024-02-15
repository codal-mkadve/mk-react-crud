import logo from "../../assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Services/auth-service";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

function HeaderWithAuth() {
  let navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    logout();
  };

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
        <Navbar.Text>
          <Button color="info" onClick={handleLogout}>
            <i className="fa fa-power-off me-2"></i>
            Logout
          </Button>
        </Navbar.Text>
        <Navbar />
      </Container>
    </Navbar>
  );
}

export default HeaderWithAuth;
