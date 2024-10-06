import toast from "react-hot-toast";
import { verifyLogin } from "../../api/adminAPI";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminCredentials } from "../../redux/slice/authSlice";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../src/public/images/logo.jpeg";

interface IFormInput {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;
    const response = await verifyLogin(email, password);
    if (response?.data.success) {
      console.log(response.data);
      dispatch(setAdminCredentials(response.data.token));
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <div
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://image.freepik.com/free-photo/pregnant-woman-hospital_293060-116.jpg')",
        }}
      >
        {/* Overlay for dark effect */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Form container */}
        <div className="relative z-10 bg-grey bg-opacity-30 backdrop-blur-md border border-gray-200 shadow-lg rounded-lg p-6 max-w-md w-full mx-4 transition-transform transform hover:scale-105 duration-300">
          {/* Logo */}
          <Link to="/" className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "100px", height: "70px" }}
              className="rounded-lg shadow-md"
            />
          </Link>

          {/* Form heading */}
          <p className="text-2xl text-black font-semibold text-center mb-8">
            Admin Login
          </p>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email field */}
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#B0D4FF] focus:border-[#2F76FF] focus:outline-none transition-colors duration-300 bg-white bg-opacity-70"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="absolute text-red-500 text-xs mt-1">
                  Email is required
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="relative">
              <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#B0D4FF] focus:border-[#2F76FF] focus:outline-none transition-colors duration-300 bg-white bg-opacity-70"
                placeholder="Password"
              />
              {errors.password && (
                <p className="absolute text-red-500 text-xs mt-1">
                  Password is required
                </p>
              )}
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#19328F] hover:bg-[#2F76FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#599EFF] transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminLogin;
