import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../Services/auth-service";

const UserRedirect = () => {
  let navigate = useNavigate();

  useEffect(() => {
    navigate(!isLoggedIn() ? "/login" : "/dashboard");
  }, [navigate]);

  return <></>;
};

export default UserRedirect;
