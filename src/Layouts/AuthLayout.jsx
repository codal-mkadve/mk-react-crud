import Header from "../Components/Shared/Header";
import Footer from "../Components/Shared/Footer";

import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default AuthLayout;
