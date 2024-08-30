// import { Link, useNavigate } from "react-router-dom";
// // import signUpImage from "/candidateSignUp.png";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { signup } from "../../api/serviceProviderAPI";

// import toast from "react-hot-toast";
// // import Navbar from "../../components/welcome_page/Navbar";
// import { useState } from "react";
// import { FaSpinner } from "react-icons/fa";

// interface IFormInput {
//   name: string;
//   email: string;
//   mobile: number;
//   password: string;
//   service: "",
//   specialization: "",
//   qualification: "",
//   expYear: 0,
//   rate: 0,
//   location: "",
//   experienceCrt: File;
// }

// const ServiceProviderSignUp = () => {
//   const navigate = useNavigate();

//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm<IFormInput>({ mode: "onChange" });
//   const [loading, setLoading] = useState(false);

//   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
//     setLoading(true);

//     try {
//       const { name, email, mobile, password, service, specialization, qualification, expYear, rate, location, experienceCrt } = data;
//       const response = await signup(name, email, mobile, password, service, specialization, qualification, expYear, rate, location, experienceCrt);
//       if (response?.data.success) {
//         navigate("/serviceProvider/verify-otp");
//       } else {
//         toast.error("Email already in use. Please log in or choose another");
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* <Navbar /> */}

//       <div className="h-[100vh bg-[#D9E9FF] items-center flex justify-center pt-20 px-5 lg:px-0">
//         <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
//           <div className="flex-1  text-center hidden md:flex">
//             <div className="m-12 xl:m-16 w-full bg-contain flex justify-center">
//               <img className="w-3/4" src={""} alt="" />
//             </div>
//           </div>

//           <div className="lg:w-1/2 xl:w-5/12 p-6  sm:p-12">
//             <div className=" flex flex-col items-center">
//               <div className="text-center ">
//                 <h1 className="text-2xl  xl:text-3xl font-extrabold text-[#142057]">
//                   Interviewer Sign up
//                 </h1>
//                 <p className="text-[12px]  text-gray-500">
//                   Hey enter your details to create your account
//                 </p>
//               </div>

//               <div className="w-full flex-1 mt-8">
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <div className="mx-auto max-w-xs flex flex-col gap-3">
//                     <input
//                       className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                       type="text"
//                       placeholder="Enter your name"
//                       {...register("name", {
//                         required: true,
//                         pattern: /^(?=.*[a-zA-Z])[a-zA-Z ]{2,30}$/,
//                       })}
//                     />
//                     {errors.name && errors.name.type === "required" && (
//                       <p className="text-red-500 text-sm m-0 p-0">
//                         Name is required
//                       </p>
//                     )}
//                     {errors.name && errors.name.type === "pattern" && (
//                       <p className="text-red-500 text-sm m-0 p-0">
//                         Invalid Name
//                       </p>
//                     )}

//                     <input
//                       className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                       type="email"
//                       placeholder="Enter your email"
//                       {...register("email", {
//                         required: true,
//                         pattern: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
//                       })}
//                     />
//                     {errors.email && errors.email.type === "required" && (
//                       <p className="text-red-500 text-sm">Email is required</p>
//                     )}
//                     {errors.email && errors.email.type === "pattern" && (
//                       <p className="text-red-500 text-sm">
//                         Invalid email address
//                       </p>
//                     )}

//                     <input
//                       className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                       type="tel"
//                       placeholder="Enter your phone"
//                       {...register("mobile", {
//                         required: true,
//                         pattern: /^[0]?[789]\d{9}$/,
//                       })}
//                     />
//                     {errors.mobile && errors.mobile.type === "required" && (
//                       <p className="text-red-500 text-sm">
//                         Mobile number is required
//                       </p>
//                     )}
//                     {errors.mobile && errors.mobile.type === "pattern" && (
//                       <p className="text-red-500 text-sm">
//                         Invalid mobile number
//                       </p>
//                     )}
//                      {/* Service Field */}
//                     <select
//                     className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     {...register("service", { required: true })}
//                     >
//                     <option value="">Select Service</option>
//                     <option value="consulting">Doctors</option>
//                     <option value="training">TakeCare</option>
//                     <option value="development">Therapist</option>
//                     </select>
//                     {errors.service && (
//                     <p className="text-red-500 text-sm">Service is required</p>
//                     )}

//                     {/* Specialization Field */}
//                     <input
//                     className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     type="text"
//                     placeholder="Enter your specialization"
//                     {...register("specialization", { required: true })}
//                     />
//                     {errors.specialization && (
//                     <p className="text-red-500 text-sm">Specialization is required</p>
//                     )}

//                     {/* Qualification Field */}
//                     <input
//                     className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     type="text"
//                     placeholder="Enter your qualification"
//                     {...register("qualification", { required: true })}
//                     />
//                     {errors.qualification && (
//                     <p className="text-red-500 text-sm">Qualification is required</p>
//                     )}

//                     {/* Experience Years Field */}
//                     <input
//                     className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     type="number"
//                     placeholder="Enter your years of experience"
//                     {...register("expYear", {
//                         required: true,
//                         min: 0,
//                         max: 50,
//                     })}
//                     />
//                     {errors.expYear && errors.expYear.type === "required" && (
//                     <p className="text-red-500 text-sm">Experience is required</p>
//                     )}
//                     {errors.expYear && errors.expYear.type === "min" && (
//                     <p className="text-red-500 text-sm">Experience cannot be negative</p>
//                     )}
//                     {errors.expYear && errors.expYear.type === "max" && (
//                     <p className="text-red-500 text-sm">Experience seems too high</p>
//                     )}

//                     {/* Rate Field */}
//                     <input
//                     className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     type="number"
//                     placeholder="Enter your rate (per hour)"
//                     {...register("rate", {
//                         required: true,
//                         min: 0,
//                     })}
//                     />
//                     {errors.rate && errors.rate.type === "required" && (
//                     <p className="text-red-500 text-sm">Rate is required</p>
//                     )}
//                     {errors.rate && errors.rate.type === "min" && (
//                     <p className="text-red-500 text-sm">Rate cannot be negative</p>
//                     )}

//                     {/* Location Field */}
//                     <input
//                     className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     type="text"
//                     placeholder="Enter your location"
//                     {...register("location", { required: true })}
//                     />
//                     {errors.location && (
//                     <p className="text-red-500 text-sm">Location is required</p>
//                     )}
//                       <label
//                         htmlFor="experienceCrt"
//                         className="block text-sm font-medium text-gray-700"
//                         >
//                         Experience Certificates:
//                         </label>
//                         <input
//                         id="experienceCrt"
//                         type="file"
//                         multiple
//                         placeholder="Experience certificate"
//                         accept=".pdf,.docx,.jpg,.jpeg,.png" // Specify allowed file types
//                         {...register("experienceCrt", {
//                             required: "Please upload your certificate.", // Validation rule
//                         })}
//                         />
//                         {errors.experienceCrt && (
//                         <p className="text-red-500 text-sm">
//                             {errors.experienceCrt.message}
//                         </p>
//                         )}
//                     <input
//                       className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                       type="password"
//                       placeholder="Password"
//                       {...register("password", {
//                         required: true,
//                         pattern:
//                           /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
//                       })}
//                     />

//                     {errors.password && errors.password.type === "required" && (
//                       <p className="text-red-500 text-sm">
//                         Password is required
//                       </p>
//                     )}
//                     {errors.password && errors.password.type === "pattern" && (
//                       <p className="text-red-500 text-sm">
//                         Password should be 6-16 characters long and contain at
//                         least one number and one special character
//                       </p>
//                     )}

//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="mt-5 tracking-wide font-semibold bg-[#142057] text-gray-100 w-full py-4 rounded-lg hover:bg-[#19328F] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
//                     >
//                       {loading ? (
//                         <FaSpinner className="w-6 h-6 animate-spin" />
//                       ) : (
//                         <>
//                           <svg
//                             className="w-6 h-6 -ml-2"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//                             <circle cx="8.5" cy="7" r="4" />
//                             <path d="M20 8v6M23 11h-6" />
//                           </svg>
//                           <span className="ml-3">Sign Up</span>
//                         </>
//                       )}
//                     </button>
//                     <p className="mt-6 text-xs text-gray-600 text-center">
//                       Already have an account?{" "}
//                       <Link to="/interviewer/login">
//                         <span className="text-[#142057] font-semibold">
//                           Sign in
//                         </span>
//                       </Link>
//                     </p>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ServiceProviderSignUp;

import { Link, useNavigate } from "react-router-dom";
// import signUpImage from "/candidateSignUp.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "../../api/serviceProviderAPI";
import toast from "react-hot-toast";
// import Navbar from "../../components/welcome_page/Navbar";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../public/images/logo.jpeg";


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
          <h3 className="text-xl text-gray-600 text-center mb-6"> Service Provider Sign Up</h3>
                <p className="text-[12px]  text-gray-500">
                  Hey enter your details to create your account
                </p>
           

              <div className="w-full flex-1 mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mx-auto max-w-xs flex flex-col gap-3">
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your name"
                      {...register("name", {
                        required: true,
                        pattern: /^(?=.*[a-zA-Z])[a-zA-Z ]{2,30}$/,
                      })}
                    />
                    {errors.name && errors.name.type === "required" && (
                      <p className="text-red-500 text-sm m-0 p-0">
                        Name is required
                      </p>
                    )}
                    {errors.name && errors.name.type === "pattern" && (
                      <p className="text-red-500 text-sm m-0 p-0">
                        Invalid Name
                      </p>
                    )}

                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: true,
                        pattern: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                      })}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <p className="text-red-500 text-sm">Email is required</p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <p className="text-red-500 text-sm">
                        Invalid email address
                      </p>
                    )}

                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="tel"
                      placeholder="Enter your phone"
                      {...register("mobile", {
                        required: true,
                        pattern: /^[0]?[789]\d{9}$/,
                      })}
                    />
                    {errors.mobile && errors.mobile.type === "required" && (
                      <p className="text-red-500 text-sm">
                        Mobile number is required
                      </p>
                    )}
                    {errors.mobile && errors.mobile.type === "pattern" && (
                      <p className="text-red-500 text-sm">
                        Invalid mobile number
                      </p>
                    )}

                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        pattern:
                          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                      })}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <p className="text-red-500 text-sm">
                        Password is required
                      </p>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
                      <p className="text-red-500 text-sm">
                        Password should be 6-16 characters long and contain at
                        least one number and one special character
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-5 tracking-wide font-semibold bg-[#142057] text-gray-100 w-full py-4 rounded-lg hover:bg-[#19328F] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" style={{background:" rgb(27, 145, 187)"}}
                    >
                      {loading ? (
                        <FaSpinner className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <svg
                            className="w-6 h-6 -ml-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <path d="M20 8v6M23 11h-6" />
                          </svg>
                          <span className="ml-3" >Sign Up</span>
                        </>
                      )}
                    </button>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Already have an account?{" "}
                      <Link to="/serviceProvider/verify-login">
                        <span className="text-[#142057] font-semibold">
                          Sign in
                        </span>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            </div>
      </div>
      <Footer/>
    </>
  );
};

export default ServiceProviderSignUp