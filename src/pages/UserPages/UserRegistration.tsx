import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
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
  confirmPassword: string;
}

const UserSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInput>({ mode: "onChange" });

  const password = watch("password"); // Watch the password field

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const { name, email, mobile, password } = data;
      const response = await signup(name, email, mobile, password);

      if (response?.data.success) {
        navigate("/user/verify-otp");
      } else {
        toast.error(
          response?.data.message || "An error occurred. Please try again."
        );
        setLoading(false);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fullscreen Wrapper */}
      <div
        className="relative flex items-center justify-center w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://static.independent.co.uk/2023/07/12/11/12103020-d9e4b2e1-ff2f-478f-8bda-783b950117b3.jpg?quality=75&width=1200&auto=webp')`,
        }}
      >

        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Centered Form */}
        <div className="relative z-10 bg-grey bg-opacity-30 backdrop-blur-md border border-gray-900 shadow-lg rounded-lg p-4 max-w-md w-full mx-4 transition-transform transform hover:scale-105 duration-300">
          <div className="text-center mb-4">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-20 h-auto mx-auto" />
            </Link>
          </div>

          <h3 className="text-2xl font-semibold text-center text-white mb-4">
            User Sign Up
          </h3>
          <p className="text-center text-white mb-4">
            Enter your details to create your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Name Field */}
            <input
              className={`w-full px-3 py-2 border rounded-lg bg-gray-900 border-gray-300 focus:outline-none focus:border-blue-500 ${
                errors.name ? "border-red-500" : ""
              }rounded-lg py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-white`}
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^(?=.*[a-zA-Z])[a-zA-Z ]{2,30}$/,
                  message: "Invalid Name",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            {/* Email Field */}
            <input
              className={`w-full px-3 py-2 border rounded-lg bg-gray-900 border-gray-300 focus:outline-none focus:border-blue-500 ${
                errors.email ? "border-red-500" : ""
              }rounded-lg py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-white`}
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Mobile Field */}
            <input
              className={`w-full px-3 py-2 border rounded-lg bg-gray-900 border-gray-300 focus:outline-none focus:border-blue-500 ${
                errors.mobile ? "border-red-500" : ""
              }rounded-lg py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-white`}
              type="tel"
              placeholder="Enter your mobile number"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0]?[789]\d{9}$/,
                  message: "Invalid mobile number",
                },
              })}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}

            {/* Password Field */}
            <input
              className={`w-full px-3 py-2 border rounded-lg bg-gray-900 border-gray-300 focus:outline-none focus:border-blue-500 ${
                errors.password ? "border-red-500" : ""
              }rounded-lg py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-white`}
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                  message:
                    "Password should be 6-16 characters long and contain at least one number and one special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Confirm Password Field */}
            <input
              className={`w-full px-3 py-2 border rounded-lg bg-gray-900 border-gray-300 focus:outline-none focus:border-blue-500 ${
                errors.confirmPassword ? "border-red-500" : ""
              }rounded-lg py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-white`}
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Sign Up"
              )}
            </button>

            {/* Sign In Link */}
            <p className="mt-4 text-center text-white">
              Already have an account?{" "}
              <Link
                to="/user/verify-login"
                className="text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserSignUp;
