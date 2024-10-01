import { useEffect, useState } from "react";
import { resendOtp, verifyOtp } from "../../api/userAPI";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../public/images/logo.jpeg";

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
        className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')`,
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-10">
          <img src={logo} alt="Logo" className="w-28 h-auto" />
        </Link>

        {/* OTP Form Container */}
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 lg:p-10 space-y-6 ring-1 ring-gray-200 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            OTP Verification
          </h2>
          <p className="text-center text-gray-600">
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
            <p className="text-gray-700">
              Time remaining:{" "}
              <span className="text-blue-600 font-semibold">{counter}</span>s
            </p>
            {counter === 0 && (
              <button
                onClick={handleResendOtp}
                className="text-blue-600 font-medium hover:underline"
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
          <p className="text-center text-gray-600 mt-6">
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
