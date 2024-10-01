import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { verifyDetails, fetchCategories } from "../../api/serviceProviderAPI";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/common_pages/Footer";
import logo from "../../../public/images/logo.jpeg";

interface IFormInput {
  // name: string;
  // email: string;
  // mobile: number;
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
        setCategories(categoriesData);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await verifyDetails(data);
    if (response) {
      toast.success("Profile information added");
      navigate("/serviceProvider/home");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8"
           style={{ backgroundImage: "url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')" }}>
        <Link to="/" className="mb-8">
          <img src={logo} alt="Logo" className="mx-auto h-20 w-auto" />
        </Link>
        <div className="bg-white bg-opacity-90 shadow-xl rounded-lg overflow-hidden w-full max-w-4xl">
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
              {/* <div>
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
              </div> */}

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
              <div>
                <label htmlFor="rate" className="block text-sm font-medium text-gray-700">Rate (₹ per hour)</label>
                <input
                  id="rate"
                  type="number"
                  {...register("rate", { required: true, min: 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Rate"
                />
                {errors.rate && <p className="mt-2 text-sm text-red-600">This field is required and must be a non-negative number</p>}
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceProviderDetails;
