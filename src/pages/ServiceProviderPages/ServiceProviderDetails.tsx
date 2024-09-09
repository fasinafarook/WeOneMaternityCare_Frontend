// import toast from "react-hot-toast";
// // import  { useEffect, useState } from "react";fetchCategories
// import { verifyDetails } from "../../api/serviceProviderAPI";
// import { useForm, SubmitHandler } from "react-hook-form";
// import {Link, useNavigate } from "react-router-dom";
// import Footer from "../../components/common_pages/Footer";
// import logo from "../../../public/images/logo.jpeg";

// interface IFormInput {
//   name: string;
//   email: string;
//   mobile: number;
//   service: number;
//   specialization: string;
//   qualification: string;
//   expYear: number;
//   location: string;
//   profilePicture: File[];
//   experienceCrt: File[];
//   rate: number;
// }

// const ServiceProviderDetails = () => {
//   // const [categories, setCategories] = useState<string[]>([]);

//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IFormInput>();

// //   useEffect(() => {
// //     const loadCategories = async () => {
// //         const categoriesData = await fetchCategories();
// //         console.log('catgry:',categoriesData);
        
// //         setCategories(categoriesData.map((category: { categoryName: string }) => category.categoryName));
// //     };
// //     loadCategories();
// // }, []);

//   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
//     const response = await verifyDetails(data);
//     console.log('hiiii',response );
    
//     if (response) {
//       toast.success("Profile information added");
//       navigate("/serviceProvider/home");
//     } else {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <>
//     <Link to="/" >
//       <img
//         src={logo}
//         alt="Logo"
//         style={{ width: '100px', height: '70px' }}
//       />
//     </Link>
//       <div className="min-h-screen flex items-center justify-center bg-[#D9E9FF] py-24 px-4 sm:px-6 lg:px-8" >
//         <div className="max-w-4xl w-full space-y-8 bg-white shadow-2xl rounded-3xl p-10" >
//           <div className="text-center" style={{background:" rgb(133 146 150)"}}>
//             <h2 className="mt-6 text-4xl font-extrabold text-[#142057]">
//               Set Your Profile
//             </h2>
//             <p className="mt-2 text-sm text-gray-600">
//               Please fill out the information below for profile verification
//             </p>
//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} style={{background:" rgb(133 146 150)"}}>
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label htmlFor="name" className="sr-only">Name</label>
//                   <input
//                     id="name"
//                     type="text"
//                     {...register("name", { required: true })}
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                     placeholder="Name"
//                   />
//                   {errors.name && <p className="mt-2 text-sm text-red-600">This field is required</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="sr-only">Email</label>
//                   <input
//                     id="email"
//                     type="email"
//                     {...register("email", { required: true })}
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                     placeholder="Email"
//                   />
//                   {errors.email && <p className="mt-2 text-sm text-red-600">This field is required</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="mobile" className="sr-only">Mobile</label>
//                   <input
//                     id="mobile"
//                     type="tel"
//                     {...register("mobile", { required: true, pattern: /^\d+$/ })}
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                     placeholder="Mobile Number"
//                   />
//                   {errors.mobile && <p className="mt-2 text-sm text-red-600">This field is required and should be a number</p>}
//                 </div>
//                 <div>
//                 {/* <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label> */}
//                 {/* <select
//                     id="service"
//                     {...register("service", { required: true })}
//                     className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 >
//                     <option value="">Select a service</option>
//                     {categories.map((category, index) => (
//                         <option key={index} value={category}>
//                             {category}
//                         </option>
//                     ))}


//                 </select> */}

// <div>
//                   <label htmlFor="service" className="block text-sm font-medium text-gray-700">
//                     Service
//                   </label>
//                   <select
//                     id="service"
//                     {...register("service", { required: true })}
//                     className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   >
//                     <option value="">Select a service</option>
//                     <option value="Doctor">Doctor</option>
//                     <option value="Nurse">Nurse</option>
//                     <option value="preDelivaryCare">preDelivaryCare</option>
//                     <option value="PostDeliveryCare">PostDeliveryCare</option>
//                     <option value="Home Taker">Home Taker</option>
//                     <option value="Yoga Therapy">Yoga Therapy</option>
//                   </select>
//                   {errors.service && (
//                     <p className="mt-2 text-sm text-red-600">
//                       This field is required
//                     </p>
//                   )}
//                 </div>
//                 {errors.service && <p className="mt-2 text-sm text-red-600">This field is required</p>}
//             </div>
//                 <div>
//                   <label htmlFor="specialization" className="sr-only">Specialization</label>
//                   <input
//                     id="specialization"
//                     type="text"
//                     {...register("specialization", { required: true })}
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                     placeholder="Specialization"
//                   />
//                   {errors.specialization && <p className="mt-2 text-sm text-red-600">This field is required</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="qualification" className="sr-only">Qualification</label>
//                   <input
//                     id="qualification"
//                     type="text"
//                     {...register("qualification", { required: true })}
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                     placeholder="Qualification"
//                   />
//                   {errors.qualification && <p className="mt-2 text-sm text-red-600">This field is required</p>}
//                 </div>
//                 <div>
//                   <label htmlFor="expYear" className="block text-sm font-medium text-gray-700">
//                     Years of Experience
//                   </label>
//                   <input
//                     id="expYear"
//                     type="number"
//                     {...register("expYear", { required: true, min: 0 })}
//                     className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     placeholder="Years of Experience"
//                   />
//                   {errors.expYear && (
//                     <p className="mt-2 text-sm text-red-600">
//                       This field is required and must be a non-negative number
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label htmlFor="location" className="sr-only">Location</label>
//                   <input
//                     id="location"
//                     type="text"
//                     {...register("location", { required: true })}
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                     placeholder="Location"
//                   />
//                   {errors.location && <p className="mt-2 text-sm text-red-600">This field is required</p>}
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
//                 <input
//                 id="profilePicture"
//                 type="file"
//                 {...register("profilePicture", { required: true })}
//                 multiple={false}
//                 className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                 />
//                 {errors.profilePicture && <p className="mt-2 text-sm text-red-600">This field is required</p>}
//               </div>
//               <div>
//                 <label htmlFor="experienceCrt" className="block text-sm font-medium text-gray-700">Experience Certificate</label>
//                 <input
//                   id="experienceCrt"
//                   type="file"
//                   {...register("experienceCrt", { required: true })}
//                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                 />
//                 {errors.experienceCrt && <p className="mt-2 text-sm text-red-600">This field is required</p>}
//               </div>
//               <div>
//                   <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
//                     Consultation Rate
//                   </label>
//                   <input
//                     id="rate"
//                     type="number"
//                     {...register("rate", { required: true, min: 0 })}
//                     className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     placeholder="Consultation Rate"
//                   />
//                   {errors.rate && (
//                     <p className="mt-2 text-sm text-red-600">
//                       This field is required and must be a non-negative number
//                     </p>
//                   )}
//                 </div>
//             </div>
// <br />
//             <div > 
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#142057] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"  style={{background:" rgb(27, 145, 187)"}}
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer/>
//     </>
//   );
// };

// export default ServiceProviderDetails;





import {useState,useEffect} from "react";
import toast from "react-hot-toast";
import { verifyDetails,fetchCategories } from "../../api/serviceProviderAPI";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../public/images/logo.jpeg";

interface IFormInput {
    name: string;
    email: string;
    mobile: number;
    service: string;
    specialization: string;
    qualification: string;
    expYear: number;
    location: string;
    profilePicture: File[];
    experienceCrt: File[];
    rate: number;
  }
  
  const ServiceProviderDetails = () => {
    // const [categories, setCategories] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInput>();
    useEffect(() => {
      const loadCategories = async () => {
        try {
          const categoriesData = await fetchCategories();
          console.log('categoriesData', categoriesData);
          
          // Check the structure of the first item in the array
          setCategories(categoriesData);

        } catch (error) {
          toast.error("Failed to load categories");
        }
      };
      loadCategories();
    }, []);
  
  
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      const response = await verifyDetails(data);
      console.log('hiiii',response );
      
      if (response) {
        toast.success("Profile information added");
        navigate("/serviceProvider/home");
      } else {
        toast.error("Something went wrong");
      }
    };
  

  return (
    <>
      <div className="min-h-screen bg-[#F0F4F8] flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        <Link to="/" className="mb-8">
          <img src={logo} alt="Logo" className="mx-auto h-20 w-auto" />
        </Link>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl">
          <div className="px-4 py-5 bg-gradient-to-r from-[#2A2A72] to-[#009FFD] sm:px-6">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Set Your Profile
            </h2>
            <p className="mt-1 text-center text-sm text-gray-200">
              Please fill out the information below for profile verification
            </p>
          </div>
          <form
            className="px-6 py-8 sm:p-10 space-y-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Name"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">This field is required</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">This field is required</p>}
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  id="mobile"
                  type="tel"
                  {...register("mobile", { required: true, pattern: /^\d+$/ })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Mobile Number"
                />
                {errors.mobile && <p className="mt-2 text-sm text-red-600">This field is required and should be a number</p>}
              </div>
             

              <div>
  <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
  <select
    id="service"
    {...register("service", { required: true })}
    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">Select a service</option>
    {categories.length > 0 ? (
      categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))
    ) : (
      <option value="">No services available</option>
    )}
  </select>
  {errors.service && <p className="mt-2 text-sm text-red-600">This field is required</p>}
</div>

              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization</label>
                <input
                  id="specialization"
                  type="text"
                  {...register("specialization", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Specialization"
                />
                {errors.specialization && <p className="mt-2 text-sm text-red-600">This field is required</p>}
              </div>
              <div>
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">Qualification</label>
                <input
                  id="qualification"
                  type="text"
                  {...register("qualification", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Qualification"
                />
                {errors.qualification && <p className="mt-2 text-sm text-red-600">This field is required</p>}
              </div>
              <div>
                <label htmlFor="expYear" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <input
                  id="expYear"
                  type="number"
                  {...register("expYear", { required: true, min: 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Years of Experience"
                />
                {errors.expYear && <p className="mt-2 text-sm text-red-600">This field is required and must be a non-negative number</p>}
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  id="location"
                  type="text"
                  {...register("location", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Location"
                />
                {errors.location && <p className="mt-2 text-sm text-red-600">This field is required</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <input
                  id="profilePicture"
                  type="file"
                  {...register("profilePicture", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.profilePicture && <p className="mt-2 text-sm text-red-600">This field is required</p>}
              </div>
              <div>
                <label htmlFor="experienceCrt" className="block text-sm font-medium text-gray-700">Experience Certificate</label>
                <input
                  id="experienceCrt"
                  type="file"
                  {...register("experienceCrt", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.experienceCrt && <p className="mt-2 text-sm text-red-600">This field is required</p>}
              </div>
            </div>
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-gray-700">Rate (per hour)</label>
              <input
                id="rate"
                type="number"
                {...register("rate", { required: true, min: 0 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Rate (per hour)"
              />
              {errors.rate && <p className="mt-2 text-sm text-red-600">This field is required and must be a non-negative number</p>}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium leading-5 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ServiceProviderDetails;

