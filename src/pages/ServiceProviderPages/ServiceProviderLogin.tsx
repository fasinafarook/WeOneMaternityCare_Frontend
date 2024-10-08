import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { verifyLogin } from "../../api/serviceProviderAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setServiceProviderCredentials } from "../../redux/slice/authSlice";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../src/public/images/logo.jpeg";

interface IFormInput {
  email: string;
  password: string;
}

const SericeProviderLogin = () => {
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

    if (!response.success) {
      toast.error(response.message);
    }

    // const { hasCompletedDetails } = response.data;

    // if (!hasCompletedDetails) {
    //   dispatch(setServiceProviderCredentials(response.data.token));
    //   navigate("/serviceProvider/verify-details");
    // } else
    if (response.success) {
      const { token, isApproved } = response.data;
      const sericeProviderInfo = {
        token,
        isApproved,
      };
      dispatch(setServiceProviderCredentials(sericeProviderInfo));
      navigate("/serviceProvider/home");
    }
  };

  return (
    <>
      {/* Main container with full-screen background image */}
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

          {/* Title */}
          <p className="text-2xl text-white font-semibold text-center mb-6">
            Login as Service Provider
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email field */}
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password field */}
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
              <div className="flex justify-between mt-2 text-sm">
                <Link
                  to="/user/verify-login"
                  className="text-white hover:text-gray-900"
                >
                  Login As User
                </Link>
                <Link
                  to="/serviceProvider/forgot-password"
                  className="text-white hover:text-gray-900"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>

          {/* Sign Up link */}
          <div className="mt-4 text-center">
            <Link
              to="/serviceProvider/serviceProvider-register"
              className="text-sm text-white hover:text-blue-700"
            >
              Don&apos;t have an account yet?{" "}
              <span className="text-blue-600">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SericeProviderLogin;
