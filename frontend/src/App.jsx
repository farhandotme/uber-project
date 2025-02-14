import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { UserRegister } from "./pages/UserRegister";
import { UserLogin } from "./pages/UserLogin";
import { CaptainRegister } from "./pages/CaptainRegister";
import { CaptainLogin } from "./pages/CaptainLogin";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user-register" element={<UserRegister />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/captain-register" element={<CaptainRegister />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
