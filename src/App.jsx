import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./components/footer.jsx/Footer";
import LoginPage from "././components/logindetails/LoginPage";
import Navbar from "./components/navbar/Navbar";
import AdminDashboard from "./admindashboard/AdminDashboard";
import CheckOutPage from "./pages/checkout/CheckOutPageOne";
import CheckOutPageOne from "./pages/checkout/CheckOutPageOne";
import AuthPopup from "./components/logindetails/AuthPopup";


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (isAdmin) navigate("/admin");
    else navigate("/");
  }, [isAdmin]);

  return (
    <>
      {showLogin ? (
        <AuthPopup
          setShowLogin={setShowLogin}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
      ) : (
        <></>
      )}
      <div>
        <Routes>
          <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
          <Route
            path="/admin"
            element={
              <AdminDashboard isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            }
          />
          <Route path="/checkoutpageone" element={<CheckOutPageOne />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
