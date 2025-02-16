import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextData } from "../context/UserContext";

export const UserRegister = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useContext(UserContextData);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      firstname,
      lastname,
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        user
      );
      console.log("response", response);
      if (response.status === 201) {
        toast.success(response.data.message);
        setUser(response.data.user);
        localStorage.setItem("token", JSON.stringify(response.data.token));
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
            <button className="bg-black flex justify-center items-center gap-5 text-white p-2 h-12 rounded mt-5 text-xl">
              Register <FaArrowRight />
            </button>
          </form>
          <div>
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/user-login" className="text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-6">
        <Link to="/captain-register">
          <button className="bg-[#10b461] w-85 h-15 text-white p-2 rounded text-xl">
            Register as Captain
          </button>
        </Link>
      </div>
    </div>
  );
};
