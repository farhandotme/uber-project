import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { UserRegister } from "./pages/UserRegister";
import { UserLogin } from "./pages/UserLogin";
import { CaptainRegister } from "./pages/CaptainRegister";
import { CaptainLogin } from "./pages/CaptainLogin";
import { UserProtectedWrapper } from "./pages/UserProtectedWrapper";
import { UserLogout } from "./pages/UserLogout";
import { CaptainLogout } from "./pages/CaptainLogout";
import { UserPage } from "./pages/UserPage";
import { CaptainPage } from "./pages/CaptainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user-register" element={<UserRegister />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/captain-register" element={<CaptainRegister />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-logout" element={<CaptainLogout />} />
        <Route path="/user-logout" element={<UserLogout />} />
        <Route path="/user-home" element={
          <UserProtectedWrapper>
            <UserPage />
          </UserProtectedWrapper>
        } />
        <Route path="/captain-home" element={
          <UserProtectedWrapper>
            <CaptainPage />
          </UserProtectedWrapper>
        } />
      </Routes>
    </>
  );
}

export default App;
