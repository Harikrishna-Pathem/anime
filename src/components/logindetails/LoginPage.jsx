// ------------------------------------------------------------------
// LoginPage.jsx (updated to include Forgot Password handler)
import { useState } from "react";
import "./LoginPage.css";
import { useAuthContext } from "../../Auth.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setShowLogin, setIsAdmin, onSwitchToSignup, onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { axiosInstance, isLogin, setIsLogin } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = () => useNavigate();

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
      setIsLogin(true);

      const accessToken = data.tokens?.accessToken;
      const refreshToken = data.tokens?.refreshToken;
      const user = data.user;

      if (user) localStorage.setItem("user", JSON.stringify(user));
      if (accessToken) localStorage.setItem("access_token", accessToken);
      if (refreshToken) localStorage.setItem("refresh_token", refreshToken);

      setShowLogin(false);

      if (user?.role === 'admin') {
        setIsAdmin(true);
        navigate('/admin');
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
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

      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      <button type="submit" disabled={loading}>{loading ? 'Logging...' : 'Login'}</button>

      <p>
        Create New Account? {" "}
        <span onClick={onSwitchToSignup} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Click Here</span>
      </p>
      <p>
        Forgot Password? {" "}
        <span onClick={onForgotPassword} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Click Here</span>
      </p>
    </form>
  );
};

export default LoginPage;
