import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserLogout = () => {

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/user-login");
  }, [navigate]);
  
}
