import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../api/serviceProviderAPI";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../src/public/images/logo.jpeg";

const ServiceProviderOtp = () => {
  const [counter, setCounter] = useState(30);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const navigate = useNavigate();

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
      navigate("/serviceProvider/verify-login");
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
      {/* Full-screen background with image */}
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/smiling-woman-doctor-shows-pictures-tablet-pregnant-young-woman-hospital_358354-8964.jpg')",
        }}
      >

         {/* Dark Overlay */}
         <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Form Container */}
        <div className="relative z-10 bg-grey bg-opacity-30 backdrop-blur-md border border-gray-200 shadow-lg rounded-lg p-6 max-w-md w-full mx-4 transition-transform transform hover:scale-105 duration-300">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="block mx-auto mb-4"
              style={{ width: "80px", height: "60px" }}
            />
          </Link>


          <h1 className="text-3xl font-bold text-center text-white mb-4">
            OTP Verification
          </h1>
          <p className="text-center text-white mb-6">
            Enter the OTP you received to verify your account.
          </p>

          <div className="flex justify-center space-x-2 mb-6">
            {otpValues.map((value, index) => (
              <input
                key={index}
                value={value}
                className="w-12 h-12 border border-gray-300 text-center text-lg rounded-lg focus:outline-none focus:border-blue-500"
                type="text"
                maxLength={1}
                onChange={(e) => handleOnChange(index, e.target.value)}
              />
            ))}
          </div>

          <div className="flex justify-between items-center mb-4">
            <p className="text-white">
              Time remaining:{" "}
              <span className="font-semibold">{counter}</span> sec
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

          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Verify OTP
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ServiceProviderOtp;
