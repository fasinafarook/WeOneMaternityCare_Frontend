import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "../../api/serviceProviderAPI";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../src/public/images/logo.jpeg";

interface IFormInput {
  name: string;
  email: string;
  mobile: number;
  password: string;
}

const ServiceProviderSignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({ mode: "onChange" });
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);

    try {
      const { name, email, mobile, password } = data;
      const response = await signup(name, email, mobile, password);
      if (response?.data.success) {
        navigate("/serviceProvider/verify-otp");
      } else {
        toast.error("Email already in use. Please log in or choose another");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          <h3 className="text-xl md:text-2xl font-semibold text-center text-white mb-4">
            Service Provider Sign Up
          </h3>
          <p className="text-sm text-white text-center mb-4">
            Hey, enter your details to create your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              {/* Name Input */}
              <input
                className="w-full px-4 py-2 md:py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all "
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: true,
                  pattern: /^(?=.*[a-zA-Z])[a-zA-Z ]{2,30}$/,
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">
                  Name is required and should be valid
                </p>
              )}

              {/* Email Input */}
              <input
                className="w-full px-4 py-2 md:py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  pattern: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">Invalid email address</p>
              )}

              {/* Mobile Input */}
              <input
                className="w-full px-4 py-2 md:py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                type="tel"
                placeholder="Enter your phone"
                {...register("mobile", {
                  required: true,
                  pattern: /^[0]?[789]\d{9}$/,
                })}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs">Invalid mobile number</p>
              )}

              {/* Password Input */}
              <input
                className="w-full px-4 py-2 md:py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  Password must be 6-16 characters long and contain at least one
                  number and one special character
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-blue-600 text-white font-semibold py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none"
              >
                {loading ? (
                  <FaSpinner className="w-5 h-5 animate-spin" />
                ) : (
                  "Sign Up"
                )}
              </button>

              {/* Redirect to Login */}
              <p className="mt-4 text-center text-white text-xs">
                Already have an account?{" "}
                <Link to="/serviceProvider/verify-login">
                  <span className="text-blue-600 font-semibold">Sign in</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceProviderSignUp;
