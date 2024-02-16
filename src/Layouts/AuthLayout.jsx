import React, { useEffect } from "react";
import HeaderWithAuth from "../Components/Shared/HeaderWithAuth";
import Footer from "../Components/Shared/Footer";
import { Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../Services/auth-service";

function AuthLayout() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

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
