import HeaderWithoutAuth from "../Components/Shared/HeaderWithoutAuth";
import Footer from "../Components/Shared/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../Services/auth-service";

function NoAuthLayout() {
  const navigate = useNavigate();
  if (isLoggedIn()) {
    navigate("/dashboard");
  }
  return (
    <>
      <HeaderWithoutAuth></HeaderWithoutAuth>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default NoAuthLayout;
