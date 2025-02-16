import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CaptainContextData } from "../context/CaptainContext";

export const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const { setCaptain } = useContext(CaptainContextData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/captains/login`,
        { email, password }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setCaptain(response.data.captain);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/captain-home");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
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
          <h1 className="text-2xl text-[#10b461] font-bold">You are Logging in as captain</h1>
          <form onSubmit={handleSubmit} className="flex flex-col m-6 w-full max-w-md p-6 bg-white rounded-lg">
            <label className="text-xl font-bold mt-5 mb-2" htmlFor="email">
              What&apos;s your email?
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-gray-200 p-2 h-12 rounded"
              type="text"
              name="email"
              placeholder="email@example.com"
            />
            <label className="text-xl font-bold mt-5 mb-2" htmlFor="password">
              Enter password
            </label>
            <div className="relative">
              <input
                className="bg-gray-200 p-2 h-12 rounded w-full pr-10"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
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
            <button className="bg-[#10b461] flex justify-center items-center gap-5 text-white p-2 h-12 rounded mt-5 text-xl">
              Login
              <FaArrowRight />
            </button>
          </form>
          <div>
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Link to="/captain-register" className="text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-6">
        <Link to={"/user-login"}>
          <button className="bg-black w-85 h-15 text-white p-2 rounded text-xl">
            Login as User
          </button>
        </Link>
      </div>
    </div>
  );
};