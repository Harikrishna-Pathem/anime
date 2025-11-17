import { useState } from "react";
import "./AuthPopup.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import VerifyOtpPage from "./VerifyOtpPage";

const AuthPopup = ({ setShowLogin, setIsAdmin }) => {
  const [step, setStep] = useState("login"); // login | signup | verify
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");

  return (
    <div className="login-popup">
      {step === "login" && (
        <LoginPage
          setShowLogin={setShowLogin}
          setIsAdmin={setIsAdmin}
          onSwitchToSignup={() => setStep("signup")}
        />
      )}

      {step === "signup" && (
        <SignupPage
          signupData={signupData}
          setSignupData={setSignupData}
          onOtpSent={() => setStep("verify")}
          onCancel={() => setStep("login")}
        />
      )}

      {step === "verify" && (
        <VerifyOtpPage
          signupData={signupData}
          otp={otp}
          setOtp={setOtp}
          onVerified={() => {
            alert("Account created successfully!");
            setStep("login");
          }}
          // onResendOtp={() => alert("OTP resent!")}
          onBack={() => setStep("signup")}
        />
      )}
    </div>
  );
};

export default AuthPopup;
