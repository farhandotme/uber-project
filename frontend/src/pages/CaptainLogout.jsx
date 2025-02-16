import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CaptainLogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/captain-login");
  }, [navigate])
}
