import { useState } from "react";
import { useAuthContext } from "../../Auth";


const VerifyOtpPage = ({ signupData, otp, setOtp, onVerified,  onBack }) => {

  const { axiosInstance } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");


  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);


    try {

      const payload = {
        email: signupData.email,
        otp: otp
      }

      const response = await axiosInstance.post('auth/verify', payload);
      console.log(response);

      if (response.data?.veriftied || response.status === 200) {
        if (response.data?.token) {
          localStorage.setItem("access_token", response.data.token);
        }
        if (response.data?.refreshToken) {
          localStorage.setItem("refresh_token", response.data.refreshToken);
        }
        onVerified?.(response.data);
      } else {
        setError("OTP verification failed. Please try again.");
      }

    } catch (error) {

    } finally {
      setLoading(false);
    }

  };


  const onResendOtp = async () => {
    setResendMessage("");
    setResendLoading(true);

    console.log(signupData);
    
    try {
      const response = await axiosInstance.post('/auth/signup', {
        name : signupData.name,
        email: signupData.email,
        password: signupData.password
      });
      console.log("Resend OTP response:", response);
      
      setResendMessage("OTP has been resent successfully.");
    } catch (error) {
      console.log("Resend OTP error:", error);
      setError("Failed to resend OTP. Please try again later.");
    } finally {
      setResendLoading(false);
    }
  }
  return (
    <form onSubmit={handleVerify} className="login-popup-container">
      <div className="login-popup-title">
        <h2>Verify OTP</h2>
        <div onClick={onBack} style={{ cursor: "pointer" }}>← Back</div>
      </div>

      <div className="login-popup-inputs">
        <p>Enter the OTP sent to <b>{signupData.email}</b></p>
        <input
          type="text"
          placeholder="Enter 4-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          maxLength={6}
        />
      </div>

      {error && <div style={{ color: "crimson", marginBottom: 8 }}>{error}</div>}
      {resendMessage && <div style={{ color: "green", marginBottom: 8 }}>{resendMessage}</div>}


      <button type="submit">Verify</button>
      <p>
        Didn’t receive OTP?{" "}
        <span onClick={onResendOtp} >Resend</span>
      </p>
    </form>
  );
};

export default VerifyOtpPage;
