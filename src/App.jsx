import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./components/footer.jsx/Footer";
import LoginPage from "././components/logindetails/LoginPage";
import Navbar from "./components/navbar/Navbar";
import AdminDashboard from "./admindashboard/AdminDashboard";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPage setShowLogin={setShowLogin} /> : <></>}
      <div>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
