import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { UserRegister } from "./pages/UserRegister";
import { UserLogin } from "./pages/UserLogin";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user-register" element={<UserRegister />} />
        <Route path="/user-login" element={<UserLogin />} />
      </Routes>
    </>
  );
}

export default App;
