import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="w-full bg-black text-white py-4">
        <h1 className="text-center text-3xl font-bold">Uber</h1>
      </header>
      <main
        className="flex flex-col items-center justify-end flex-grow bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1567536303373-0eb3957ba696?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D')",
        }}
      >
        <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Get Started with Uber</h2>
          <p className="mb-6">
            Enter your pickup and drop-off locations to request a ride.
          </p>
          <Link to="/user-login"> <button className="flex justify-center items-center gap-5 w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300">
            Get Started <FaArrowRight />
          </button></Link>
        </div>
      </main>
    </div>
  );
};
