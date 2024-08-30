// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { verifyOtpAPI } from "../../Services/allAPI";
// // import "./OtpVerification.css";
// import { Col, Row } from "react-bootstrap";

// const OtpVerification: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [otp, setOtp] = useState<string>("");
//   const email = location.state?.email;

//   const handleOtpVerification = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!otp) {
//       toast.warning("Please enter the OTP.");
//       return;
//     }

//     try {
//       console.log("Sending OTP verification request...");
//       const result = await verifyOtpAPI({ email, otp });
//       console.log("Response from server:", result);
//       if (result.status === 200) {
//         toast.success("OTP Verified Successfully");
//         navigate("/login"); // Navigate to login page after successful OTP verification
//       } else {
//         toast.error("Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       toast.error("OTP verification failed. Please try again.");
//       console.error("Error during OTP verification:", error);
//     }
//   };

//   return (
//     <div className="otp_div" style={{ width: "100%", height: "100vh" }}>
//       <Row>
//         <Col md={7}></Col>
//         <Col
//           md={5}
//           className="mt-3 d-flex justify-content-center align-items-center flex-column"
//         >
//           <div className="otp_verification_div mt-5 d-flex justify-content-center align-items-center flex-column">
//             <h3 className="text-white">OTP Verification</h3>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//               className="form-control mb-3 w-50 mt-5"
//               style={{ borderRadius: "50px" }}
//             />
//             <button
//               className="w-50 mt-3 btn btn-danger"
//               onClick={handleOtpVerification}
//               style={{ borderRadius: "50px" }}
//             >
//               VERIFY OTP
//             </button>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default OtpVerification;
import { useEffect, useState } from "react";
// import Navbar from "../../components/welcome_page/Navbar";
import { resendOtp, verifyOtp } from "../../api/userAPI";
import { Link,useNavigate } from "react-router-dom";
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
    console.log(otp);
    if (otp.length !== 4) {
      return toast.error("Enter OTP");
    }
    const response = await verifyOtp(otp);

    if (response?.data.success) {
      toast.success("You've successfully registered!");
      navigate("/user/verify-login");
    } else {
      toast.error("Invalid Otp");
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
     <Link to="/">
      <img
        src={logo}
        alt="Logo"
        style={{ width: '100px', height: '70px' }}
      />
    </Link>

      <div className="h-screen bg-[#D9E9FF] py-20 px-3">
        <div className="container p-20 mx-auto">
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <div className="bg-white h-64 py-3  rounded text-center">
                <h1 className="text-2xl font-bold">OTP Verification</h1>
                <div className="flex flex-col mt-4">
                  <span>Enter the OTP you received </span>
                  {/* <span className="font-bold">+91 ******876</span> */}
                </div>

                <div
                  id="otp"
                  className="flex flex-row justify-center text-center px-2 mt-5"
                >
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      value={value}
                      className="m-2 border h-10 w-10 text-center form-control rounded"
                      type="text"
                      id="fourth"
                      maxLength={1}
                      onChange={(e) => handleOnChange(index, e.target.value)}
                    />
                  ))}
                </div>

                <div className="flex  justify-evenly mt-2 ">
                  <p className="text-[#142057] ">
                    Time remaining :{" "}
                    <span className="font-medium">{counter}</span>
                  </p>
                  <p>
                    {counter === 0 && (
                      <span
                        onClick={handleResendOtp}
                        className="font-medium underline text-[#2F76FF] cursor-pointer"
                      >
                        Resend Otp
                      </span>
                    )}
                  </p>
                </div>

                <div className="mt-5">
                  <button
                    onClick={handleVerify}
                    className="bg-[#142057] hover:bg-[#19328F] font-semibold py-1 px-4 rounded-md text-[#EEF5FF]"
                  >
                    Verify
                  </button>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>

    </>
  );
};

export default OtpVerification