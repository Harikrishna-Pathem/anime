import { useState } from "react";
import "./LoginPage.css";
import { useAuthContext } from "../../Auth.jsx";

const LoginPage = ({ setShowLogin, setIsAdmin, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { axiosInstance } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    try {

      const response = await axiosInstance.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password: password
      });

      const data = response.data;

      const accessToken = data.token || data.accessToken || data.access_token;
      const refreshToken = data.refreshToken || data.refresh_token;

      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
      }

      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }

      if (response.date?.token) {
        localStorage.setItem("access_token", response.data.token);
      }

      setShowLogin(false);

    } catch (error) {

    } finally {
      setLoading(false);
    }

    // console.log("Logged in:", email);
    setShowLogin(false);
  };

  return (
    <form onSubmit={handleSubmit} className="login-popup-container">
      <div className="login-popup-title">
        <h1>Login</h1>
        <div onClick={() => setShowLogin(false)} style={{ cursor: "pointer" }}>✖</div>
      </div>

      <div className="login-popup-inputs">
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      <button type="submit">Login</button>

      <p>
        Create New Account?{" "}
        <span onClick={onSwitchToSignup}>Click Here</span>
      </p>
    </form>
  );
};

export default LoginPage;
