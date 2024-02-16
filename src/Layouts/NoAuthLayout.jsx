import React,  { useEffect } from 'react';
import HeaderWithoutAuth from "../Components/Shared/HeaderWithoutAuth";
import Footer from "../Components/Shared/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../Services/auth-service";

function NoAuthLayout() {
    let navigate = useNavigate();

    useEffect(() => {
      if (isLoggedIn()) {
        navigate("/dashboard");
      }
    }, [navigate]);
  return (
    <>
      <HeaderWithoutAuth></HeaderWithoutAuth>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default NoAuthLayout;
