// import { Link } from "react-router-dom";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { signup } from "../../api/userAPI";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { FaSpinner } from "react-icons/fa";
// import "./UserRegistration.css";

// interface IFormInput {
//   name: string;
//   email: string;
//   mobile: number;
//   password: string;
//     confirmPassword: string; // Added confirmPassword

// }

// const UserSignUp = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm<IFormInput>({ mode: "onChange" });

//   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
//     try {
//       setLoading(true);
//       const { name, email, mobile, password } = data;
//       const response = await signup(name, email, mobile, password);
//       if (response?.data.success) {
//         navigate("/user/verify-otp");
//       } else {
//         toast.error("Email already in use. Please log in or choose another.");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
//       <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
//         <div className="hidden md:block md:w-1/2 background-image"></div>
//         <div className="w-full md:w-1/2 p-8">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-800">Candidate Sign Up</h1>
//             <p className="mt-2 text-gray-600">Enter your details to create your account</p>
//           </div>

//           <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
//             <div className="flex flex-col gap-3">
//               <input
//                 className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
//                 type="text"
//                 placeholder="Enter your name"
//                 {...register("name", {
//                   required: "Name is required",
//                   pattern: {
//                     value: /^(?=.*[a-zA-Z])[a-zA-Z ]{2,30}$/,
//                     message: "Invalid Name",
//                   },
//                 })}
//               />
//               {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

//               <input
//                 className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
//                 type="email"
//                 placeholder="Enter your email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
//                     message: "Invalid email address",
//                   },
//                 })}
//               />
//               {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

//               <input
//                 className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
//                 type="tel"
//                 placeholder="Enter your phone"
//                 {...register("mobile", {
//                   required: "Mobile number is required",
//                   pattern: {
//                     value: /^[0]?[789]\d{9}$/,
//                     message: "Invalid mobile number",
//                   },
//                 })}
//               />
//               {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}

//               <input
//                 className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
//                 type="password"
//                 placeholder="Password"
//                 {...register("password", {
//                   required: "Password is required",
//                   pattern: {
//                     value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
//                     message: "Password should be 6-16 characters long and contain at least one number and one special character",
//                   },
//                 })}
//               />
//               {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

//               <button
//                 disabled={loading}
//                 type="submit"
//                 className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
//               >
//                 {loading ? <FaSpinner className="animate-spin mr-2" /> : "Sign Up"}
//               </button>

//               <p className="mt-4 text-center text-gray-600">
//                 Already have an account?{" "}
//                 <Link to="/candidate/login" className="text-blue-600 hover:underline">
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserSignUp;

// import { Link } from "react-router-dom";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { signup } from "../../api/userAPI";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { FaSpinner } from "react-icons/fa";
// import "./UserRegistration.css";

// interface IFormInput {
//   name: string;
//   email: string;
//   mobile: number;
//   password: string;
//   confirmPassword: string; 
// }

// const UserSignUp = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     watch,
   
//   } = useForm<IFormInput>({ mode: "onChange" });

//   const password = watch("password"); 

//   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
//     try {
//       setLoading(true);
//       const { name, email, mobile, password } = data;
//       const response = await signup(name, email, mobile, password);
//       if (response?.data.success) {
//         navigate("/user/verify-otp");
//       } else {
//         toast.error("Email already in use. Please log in or choose another.");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
//       <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
//         <div className="  md:w-1/2 background-image"></div>
//         <div className="w-full md:w-1/2 p-8">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-800">User Sign Up</h1>
//             <p className="mt-2 text-gray-600">Enter your details to create your account</p>
//           </div>

//           <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
//             <div className="flex flex-col gap-3">
//               <input
//                 className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
//                 type="text"
//                 placeholder="Enter your name"
//                 {...register("name", {
//                   required: "Name is required",
//                   pattern: {
//                     value: /^(?=.*[a-zA-Z])[a-zA-Z ]{2,30}$/,
//                     message: "Invalid Name",
//                   },
//                 })}
//               />
//               {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

//               <input
//                 className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
//                 type="email"
//                 placeholder="Enter your email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
//                     message: "Invalid email address",
//                   },
//                 })}
//               />
//               {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

//               <input
//                 className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
//                 type="tel"
//                 placeholder="Enter your phone"
//                 {...register("mobile", {
//                   required: "Mobile number is required",
//                   pattern: {
//                     value: /^[0]?[789]\d{9}$/,
//                     message: "Invalid mobile number",
//                   },
//                 })}
//               />
//               {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}

//               <input
//                 className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
//                 type="password"
//                 placeholder="Password"
//                 {...register("password", {
//                   required: "Password is required",
//                   pattern: {
//                     value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
//                     message: "Password should be 6-16 characters long and contain at least one number and one special character",
//                   },
//                 })}
//               />
//               {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

//               <input
//                 className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
//                 type="password"
//                 placeholder="Confirm Password"
//                 {...register("confirmPassword", {
//                   required: "Please confirm your password",
//                   validate: (value) => value === password || "Passwords do not match",
//                 })}
//               />
//               {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

//               <button
//                 disabled={loading}
//                 type="submit"
//                 className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
//               >
//                 {loading ? <FaSpinner className="animate-spin mr-2" /> : "Sign Up"}
//               </button>

//               <p className="mt-4 text-center text-gray-600">
//                 Already have an account?{" "}
//                 <Link to="/candidate/login" className="text-blue-600 hover:underline">
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserSignUp;
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import "./UserRegistration.css";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../public/images/logo.jpeg";

interface IFormInput {
  name: string;
  email: string;
  mobile: number;
  password: string;
  confirmPassword: string; // Added confirmPassword
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
        toast.error("Email already in use. Please log in or choose another.");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
     <Link to="/">
      <img
        src={logo}
        alt="Logo"
        style={{ width: '100px', height: '70px' }}
      />
    </Link>
    <div className="flex h-screen w-full bg-white">
          <img src="https://media.istockphoto.com/id/1341609914/vector/pregnant-couple-background-vector-illustration-with-a-husband-takes-care-and-hugs-his-wife.jpg?s=612x612&w=0&k=20&c=IZ7k7IktzY_x61KybAj2yBioHTLk6r86jafhB3ExN0E=" alt="Login Image" className="w-full h-full object-cover" />

        <div className="w-full lg:w-1/2 flex items-center justify-center p-5 lg:p-10">
          <div style={{ backgroundColor: 'rgb(173 185 198)' }} className=" rounded-lg shadow-lg border max-w-md w-full p-8">         
          <h3 className="text-xl text-gray-600 text-center mb-6"> User Sign Up</h3>
          <p className="mt-2 text-gray-600">Enter your details to create your account</p>
         
          <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <input
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
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
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              <input
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
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
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              <input
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                type="tel"
                placeholder="Enter your phone"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0]?[789]\d{9}$/,
                    message: "Invalid mobile number",
                  },
                })}
              />
              {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}

              <input
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                    message: "Password should be 6-16 characters long and contain at least one number and one special character",
                  },
                })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

              <input
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

              <button
                disabled={loading}
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center" style={{background:" rgb(27, 145, 187)"}}
              >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : "Sign Up"}
              </button>

              <p className="mt-4 text-center text-gray-600">
                Already have an account?{" "}
                <Link to="/user/verify-login" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      </div>
<Footer/>
</>

 
  );
};





export default UserSignUp;
