import { useEffect, useState } from "react";
import { resendOtp, verifyOtp } from "../../api/userAPI";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../src/public/images/logo.jpeg";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(30);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  const handleOnChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const handleVerify = async () => {
    const otp = otpValues.join("");
    if (otp.length !== 4) {
      return toast.error("Enter OTP");
    }
    const response = await verifyOtp(otp);
    if (response?.data.success) {
      toast.success("You've successfully registered!");
      navigate("/user/verify-login");
    } else {
      toast.error("Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    setCounter(30);
    const response = await resendOtp();
    if (response?.data.success) {
      toast.success("New OTP sent");
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <>
      <div
        className="relative flex items-center justify-center w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://static.independent.co.uk/2023/07/12/11/12103020-d9e4b2e1-ff2f-478f-8bda-783b950117b3.jpg?quality=75&width=1200&auto=webp')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Glassy Form Container */}
        <div className="relative z-10 bg-grey bg-opacity-30 backdrop-blur-md border border-gray-200 shadow-lg rounded-lg p-6 max-w-md w-full mx-4 transition-transform transform hover:scale-105 duration-300">
          {/* Logo */}
          <div className="text-center mb-4">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-28 h-auto mx-auto" />
            </Link>
          </div>
          <h2 className="text-center text-3xl font-bold text-white">
            OTP Verification
          </h2>
          <p className="text-center text-white">
            Enter the OTP sent to your mobile number
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-center space-x-2 mt-4">
            {otpValues.map((value, index) => (
              <input
                key={index}
                value={value}
                className="w-12 h-12 text-lg text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ease-in-out"
                type="text"
                maxLength={1}
                onChange={(e) => handleOnChange(index, e.target.value)}
              />
            ))}
          </div>

          {/* Timer & Resend OTP */}
          <div className="mt-4 text-center flex justify-between items-center">
            <p className="text-white">
              Time remaining:{" "}
              <span className="text-blue-600 font-semibold">{counter}</span>s
            </p>
            {counter === 0 && (
              <button
                onClick={handleResendOtp}
                className="text-white font-medium hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Verify Button */}
          <div className="flex justify-center">
            <button
              onClick={handleVerify}
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ease-in-out"
            >
              Verify OTP
            </button>
          </div>

          {/* Contact Support Link */}
          <p className="text-center text-white mt-6">
            Didn't receive the OTP?{" "}
            <Link
              to="/"
              className="text-blue-600 font-medium hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </div>

      </div>
      <Footer />

    </>
  );
};

export default OtpVerification;
