import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { verifyLogin } from "../../api/userAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../redux/slice/authSlice";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../public/images/logo.jpeg";

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
      <div className="relative flex items-center justify-center w-full h-screen bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://www.hmsmirdifhospital.ae/images/banner/500/what-is-a-gynecologist-min.jpg')`,
        }}
      >
        {/* Dark Overlay */}
        {/* <div className="absolute inset-0 bg-black opacity-60"></div> */}

        {/* Form Container */}
        <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-4 transition-transform transform hover:scale-105 duration-300">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="w-24 h-auto mx-auto"
              />
            </Link>
          </div>

          {/* Login Form */}
          <p className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login as User
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                className={`text-gray-700 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg py-3 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                className={`text-gray-700 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg py-3 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

              {/* Links */}
              <div className="flex justify-between text-sm mt-2">
                <Link
                  to="/serviceProvider/verify-login"
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                >
                  Login as Service Provider
                </Link>
                <Link
                  to="/user/forgot-password"
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mb-6">
              <button
                className="bg-blue-600 text-white font-bold py-3 px-4 w-full rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-200"
              >
                Login
              </button>
            </div>

            {/* Sign Up */}
            <div className="text-center">
              <Link
                to="/user/client-register"
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
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
