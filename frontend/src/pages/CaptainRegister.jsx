import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContextData } from "../context/UserContext";

export const CaptainRegister = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("");
  const [model, setModel] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useContext(UserContextData);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const captain = {
      firstname,
      lastname,
      email,
      password,
      plate,
      color,
      model,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/captains/register`,
        captain
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        console.log(response.data.captain);
        // token====
        const token = response.data.token;
        localStorage.setItem("token", JSON.stringify(token));

        setUser(response.data.captain);
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <div className="flex-grow">
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-30 mb-6"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaI0-AaIAcwVCkcnR8xdetso-wz9rCOVJB5Q&s"
            alt="Uber Logo"
          />
          <h1 className="text-2xl text-[#10b461] font-bold">
            You are registering as captain
          </h1>

          <form
            className="flex flex-col m-6 w-full max-w-md p-6 bg-white rounded-lg"
            onSubmit={handleRegister}
          >
            <div className="flex justify-between gap-2">
              <div className="flex-1">
                <label
                  className="text-xl font-bold mt-5 mb-2"
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <input
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  className="bg-gray-200 p-2 h-12 rounded w-full"
                  type="text"
                  name="firstname"
                  placeholder="First name"
                />
              </div>
              <div className="flex-1">
                <label
                  className="text-xl font-bold mt-5 mb-2"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  className="bg-gray-200 p-2 h-12 rounded w-full"
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                />
              </div>
            </div>
            <label className="text-xl font-bold mt-5 mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-gray-200 p-2 h-12 rounded"
              type="email"
              name="email"
              placeholder="email@example.com"
            />
            <label className="text-xl font-bold mt-5 mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="bg-gray-200 p-2 h-12 rounded w-full pr-10"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <label className="text-xl font-bold mt-5 mb-2" htmlFor="plate">
              Plate
            </label>
            <input
              onChange={(e) => setPlate(e.target.value)}
              value={plate}
              className="bg-gray-200 p-2 h-12 rounded"
              type="text"
              name="plate"
              placeholder="Plate"
            />
            <label className="text-xl font-bold mt-5 mb-2" htmlFor="color">
              Color
            </label>
            <input
              onChange={(e) => setColor(e.target.value)}
              value={color}
              className="bg-gray-200 p-2 h-12 rounded"
              type="text"
              name="color"
              placeholder="Color"
            />
            <label className="text-xl font-bold mt-5 mb-2" htmlFor="model">
              Model
            </label>
            <input
              onChange={(e) => setModel(e.target.value)}
              value={model}
              className="bg-gray-200 p-2 h-12 rounded"
              type="text"
              name="model"
              placeholder="Model"
            />
            <button className="bg-[#10b461] flex justify-center items-center gap-5 text-white p-2 h-12 rounded mt-5 text-xl">
              Register <FaArrowRight />
            </button>
          </form>
          <div>
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/captain-login" className="text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-6">
        <Link to="/user-register">
          <button className="bg-black w-85 h-15 text-white p-2 rounded text-xl">
            Register as User
          </button>
        </Link>
      </div>
    </div>
  );
};