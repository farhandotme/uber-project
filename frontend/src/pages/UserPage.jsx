import { useContext, useEffect } from "react";
import { UserContextData } from "../context/UserContext";
import axios from "axios";

export const UserPage = () => {
  const { user, setUser } = useContext(UserContextData);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser()
  }, [setUser]);
  console.log(user);
  return (
    <div>
      {user && user.fullname ? (
        <>
          <h1>Welcome, {user.fullname.firstname} {user.fullname.lastname}</h1>
          <p>Email: {user.email}</p>
          <p>User ID: {user._id}</p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};
