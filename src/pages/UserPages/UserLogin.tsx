import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { verifyLogin } from "../../api/userAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../redux/slice/authSlice";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../src/public/images/logo.jpeg";

interface IFormInput {
  email: string;
  password: string;
}

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;

    const response = await verifyLogin(email, password);

    if (response?.data.success) {
      const userInfo = response.data.data;
      dispatch(setUserCredentials(userInfo));
      navigate("/user/home");
    } else {
      toast.error(response?.data.message, {
        style: {
          border: "1px solid #dc3545",
          padding: "16px",
          color: "#721c24",
          backgroundColor: "#f8d7da",
          fontSize: "14px",
        },
        iconTheme: {
          primary: "#dc3545",
          secondary: "#721c24",
        },
      });
    }
  };

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

          {/* Login Form */}
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Login as User
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                className={`text-gray-900 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all`}
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
              
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-1">
                Password
              </label>
              <input
                className={`text-gray-900 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg py-2 px-3 block w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all`}
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}

              {/* Links */}
              <div className="flex justify-between text-sm mt-2">
                <Link
                  to="/serviceProvider/verify-login"
                  className="text-white hover:text-blue-500 transition-colors"
                >
                  Login as Service Provider
                </Link>
                <Link
                  to="/user/forgot-password"
                  className="text-white hover:text-blue-500 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2 px-4 w-full rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-transform transform hover:scale-105 duration-200">
                Login
              </button>
            </div>

            {/* Sign Up */}
            <div className="text-center">
              <Link
                to="/user/client-register"
                className="text-sm text-white hover:text-blue-600 transition-colors"
              >
                Don&apos;t have an account yet?{" "}
                <span className="text-blue-600 hover:underline">Sign Up</span>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserLogin;
