import HeaderWithAuth from "../Components/Shared/HeaderWithAuth";
import Footer from "../Components/Shared/Footer";
import { Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../Services/auth-service";

function AuthLayout() {
  const navigate = useNavigate();
  console.log('isLoggedIn() Login',isLoggedIn())
  if (!isLoggedIn()) {
    navigate("/login");
  }
  return (
    <>
      <HeaderWithAuth></HeaderWithAuth>
      <Container>
        <Outlet />
      </Container>
      <Footer></Footer>
    </>
  );
}

export default AuthLayout;
