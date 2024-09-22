

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
      const userInfo = response.data.data; // Assuming this is where your user info is returned
      dispatch(setUserCredentials(userInfo));
      navigate("/user/home");
    } else {
      toast.error(response?.data.message , {
        style: {  
          border: "1px solid #dc3545",
          padding: "16px",
          color: "#721c24",  // Text color
          backgroundColor: "#f8d7da",  // Background color
          fontSize: "14px",  // Ensure text size is readable
          
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
            <p className="text-xl text-gray-600 text-center mb-6">Login as User</p>
            

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">Password is required</p>
                )}
                <Link
                  to="/serviceProvider/verify-login"
                  className="text-xs text-gray-500 hover:text-gray-900 text-end block mt-2"
                >
                  Login as Service Provider
                </Link>

                <Link
                  to="/user/forgot-password"
                  className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="mb-6"  style={{background:" rgb(27 145 187)"}}>
                <button className="bg-[#142057] text-Dark font-bold py-2 px-4 w-full rounded hover:bg-[#19328F]"  style={{background:" rgb(27, 145, 187)"}}>
                  Login
                </button>
              </div>
              
              <div className="text-center">
                <Link
                  to="/user/client-register"
                  className="text-xs text-gray-500 capitalize"
                >
                  Don&apos;t have an account yet? <span className="text-blue-700">Sign Up</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default UserLogin;
