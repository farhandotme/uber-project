import { useContext, useEffect } from "react";
import { CaptainContextData } from "../context/CaptainContext";
import axios from 'axios';

export const CaptainPage = () => {
  const { captain, setCaptain } = useContext(CaptainContextData);

  useEffect(() => {
    const fetchCaptain = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data && response.data.captain) {
          setCaptain(response.data.captain);
          console.log("Captain data:", response.data.captain);
        } else {
          console.error("Captain data is not available");
        }
      } catch (error) {
        console.error("Error fetching captain data:", error);
      }
    }
    fetchCaptain();
  }, [setCaptain]);

  return (
    <div>
      <h1>Captain Page</h1>
      {captain && captain.fullname && captain.vehicle ? (
        <>
          <p>Welcome, {captain.fullname.firstname} {captain.fullname.lastname}</p>
          <p>Email: {captain.email}</p>
          <p>Plate: {captain.vehicle.plate}</p>
          <p>Color: {captain.vehicle.color}</p>
          <p>Model: {captain.vehicle.model}</p>
        </>
      ) : (
        <p>Loading captain data...</p>
      )}
    </div>
  );
};