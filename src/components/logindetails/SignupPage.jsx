import { useState } from "react";
import { useAuthContext } from "../../Auth.jsx";

const SignupPage = ({ signupData, setSignupData, onOtpSent, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { axiosInstance } = useAuthContext();


  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Signup data:", signupData);
    console.log(axiosInstance);
    
    

    // API request for OTP
    try {
      const response = await axiosInstance.post("/auth/signup", {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password
      });
      console.log("Signup response:", response);
      
      

    

      onOtpSent?.();
    } catch (error) {
      console.log("Signup error:", error);
      if (error.response) {
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="login-popup-container" >
      <div className="login-popup-title">
        <h2>Sign Up</h2>
        <div onClick={onCancel} style={{ cursor: "pointer" }}>✖</div>
      </div>

      <div className="login-popup-inputs">
        <input
          type="text"
          placeholder="Enter Your Name"
          value={signupData.name}
          onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Enter your Email"
          value={signupData.email}
          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Enter your Password"
          value={signupData.password}
          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>

      {/* <div className="login-popup-condition">
        <input type="checkbox" required />
        <p>By continuing, I agree to the terms of use & privacy policy</p>
      </div> */}

      <p>
        Already have an account?{" "}
        <span onClick={onCancel}>Login Here</span>
      </p>
    </form>
  );
};

export default SignupPage;
