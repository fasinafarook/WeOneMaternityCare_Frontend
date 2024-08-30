import { Link, useNavigate } from "react-router-dom";
// import loginImage from "/candidateLogin.png";
// import Navbar from "../../components/welcome_page/Navbar";
import { useForm, SubmitHandler } from "react-hook-form";
import { verifyLogin } from "../../api/serviceProviderAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setServiceProviderCredentials } from "../../redux/slice/authSlice";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../public/images/logo.jpeg";

interface IFormInput {
  email: string;
  password: string;
}

const SericeProviderLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;
    const response = await verifyLogin(email, password);

    if (!response.success) {
      console.log("response: ", response)
      toast.error(response.message );
    }

    const { hasCompletedDetails } = response.data;

    if (!hasCompletedDetails) {
      dispatch(setServiceProviderCredentials(response.data.token))
      navigate("/serviceProvider/verify-details");
    } else if (response.success) {

      console.log(response.data)
      const {token, isApproved} = response.data
      const sericeProviderInfo = {
        token, isApproved
      }
      dispatch(setServiceProviderCredentials(sericeProviderInfo))
      navigate("/serviceProvider/home");
    }
  };

  return (
    <>
      {/* <Navbar /> */}

      <div className="flex h-screen w-full bg-white">

      <Link to="/">
      <img
        src={logo}
        alt="Logo"
        style={{ width: '100px', height: '70px' }}
      />
    </Link>
    <img src="https://media.istockphoto.com/id/1341609914/vector/pregnant-couple-background-vector-illustration-with-a-husband-takes-care-and-hugs-his-wife.jpg?s=612x612&w=0&k=20&c=IZ7k7IktzY_x61KybAj2yBioHTLk6r86jafhB3ExN0E=" alt="Login Image" className="  " style={{height:'80%', width:'50%'}}  />

        <div className="w-full lg:w-1/2 flex items-center justify-center p-5 lg:p-10">
          <div style={{ backgroundColor: 'rgb(173 185 198)' }} className=" rounded-lg shadow-lg border max-w-md w-full p-8">

            <p className="text-xl text-gray-600 text-center">
              Login as Service Provider
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div  className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500 mt-1 text-sm">
                    Password is required
                  </p>
                )}
                <Link
                  to="/user/verify-login"
                  className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                >
                  Login As User
                </Link>
              </div>

              <div className="mt-8">
                <button className="bg-[#142057] text-white font-bold py-2 px-4 w-full rounded hover:bg-[#19328F]" style={{background:" rgb(27, 145, 187)"}}>
                  Login
                </button>
              </div>
            </form>

            <a
              href="#"
              className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
             
            </a>
            <div className="mt-4 flex items-center w-full text-center">
              <Link
                to="/serviceProvider/serviceProvider-register"
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                Don&apos;t have any account yet?
                <span className="text-blue-700"> Sign Up</span>
              </Link>
            </div>
          </div>
          </div>
        </div>
        <Footer/>
    </>
  );
};

export default SericeProviderLogin;