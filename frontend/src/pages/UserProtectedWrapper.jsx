import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null || token === undefined || token === "" || !token) {
      navigate("/user-login");
    }
  }, [token, navigate]);
  return <>{children}</>;
}
