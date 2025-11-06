import { useState } from "react";
import "./LoginPage.css";

const LoginPage = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");

  return (
    <>
      <div className="login-popup">
        <form action="" className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currentState}</h2>

            <div onClick={() => setShowLogin(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
          </div>
          <div className="login-popup-inputs">
            {currentState === "Login" ? (
              <></>
            ) : (
              <input type="text" placeholder="Enter Your Name" required />
            )}
            <input type="email" placeholder="Enter your Email" required />
            <input type="password" placeholder="Enter your Password" required />
          </div>
          <button>
            {currentState === "Sign Up" ? "Create Account" : "Login"}
          </button>

          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>
          {currentState === "Login" ? (
            <p>
              Create New Account ?{" "}
              <span onClick={() => setCurrentState("Sign Up")}>Click Here</span>
            </p>
          ) : (
            <p>
              Already have an account ?{" "}
              <span onClick={() => setCurrentState("Login")}>Login Here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPage;
