import toast from "react-hot-toast";
import { verifyLogin } from "../../api/adminAPI";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminCredentials } from "../../redux/slice/authSlice";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../public/images/logo.jpeg";

interface IFormInput {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;
    const response = await verifyLogin(email, password);
    if (response?.data.success) {
      console.log(response.data);
      dispatch(setAdminCredentials(response.data.token));
      navigate('/admin/dashboard');
    } else {
      toast.error("Invalid credentials");
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
            <p className="text-xl text-gray-600 text-center mb-6">Login as Admin</p>
            
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#B0D4FF] focus:border-[#2F76FF] focus:outline-none transition-colors duration-300 bg-white bg-opacity-50"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="absolute text-red-500 text-xs mt-1">Email is required</p>
                  )}
                </div>
                <br />
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    {...register("password", { required: true })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#B0D4FF] focus:border-[#2F76FF] focus:outline-none transition-colors duration-300 bg-white bg-opacity-50"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="absolute text-red-500 text-xs mt-1">Password is required</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#19328F] hover:bg-[#2F76FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#599EFF] transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg" style={{background:" rgb(27, 145, 187)"}}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    <Footer/>
    </>
  );
};

export default AdminLogin