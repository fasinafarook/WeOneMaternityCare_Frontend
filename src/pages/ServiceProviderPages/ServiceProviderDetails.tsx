import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { verifyDetails, fetchCategories } from "../../api/serviceProviderAPI";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common_pages/Footer";
import AppNavbar from "../../components/common_pages/ProviderHeader";

interface IFormInput {
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
    <AppNavbar/>
    <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/smiling-woman-doctor-shows-pictures-tablet-pregnant-young-woman-hospital_358354-8964.jpg')",
        }}
      >
      
      <div className="relative z-10 bg-grey bg-opacity-30 backdrop-blur-md border border-gray-200 shadow-lg rounded-lg w-full max-w-4xl transition-transform transform hover:scale-105 duration-300">

        {/* <div className="bg-white bg-opacity-90 shadow-xl rounded-lg overflow-hidden w-full max-w-4xl"> */}
          <div className="px-4 py-5 bg-gradient-to-r from-[#2A2A72] to-[#009FFD] sm:px-6">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Set Your Profile
            </h2>
            <p className="mt-1 text-center text-sm text-gray-200">
              Please complete the information below for profile verification
              before you begin the service{" "}
            </p>
          </div>
          <form
            className="px-6 py-8 sm:p-10 space-y-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-black"
                >
                  Service
                </label>
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
                {errors.service && (
                  <p className="mt-2 text-sm text-red-600">
                    This field is required
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="specialization"
                  className="block text-sm font-medium text-black"
                >
                  Specialization
                </label>
                <input
                  id="specialization"
                  type="text"
                  {...register("specialization", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Specialization"
                />
                {errors.specialization && (
                  <p className="mt-2 text-sm text-red-600">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="qualification"
                  className="block text-sm font-medium text-black"
                >
                  Qualification
                </label>
                <input
                  id="qualification"
                  type="text"
                  {...register("qualification", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Qualification"
                />
                {errors.qualification && (
                  <p className="mt-2 text-sm text-red-600">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="expYear"
                  className="block text-sm font-medium text-black"
                >
                  Years of Experience
                </label>
                <input
                  id="expYear"
                  type="number"
                  {...register("expYear", { required: true, min: 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Years of Experience"
                />
                {errors.expYear && (
                  <p className="mt-2 text-sm text-red-600">
                    This field is required and must be a non-negative number
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-black"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  {...register("location", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Location"
                />
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">
                    This field is required
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="profilePicture"
                  className="block text-sm font-medium text-black"
                >
                  Profile Picture
                </label>
                <input
                  id="profilePicture"
                  type="file"
                  {...register("profilePicture", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.profilePicture && (
                  <p className="mt-2 text-sm text-red-600">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="experienceCrt"
                  className="block text-sm font-medium text-black"
                >
                  Experience Certificate
                </label>
                <input
                  id="experienceCrt"
                  type="file"
                  {...register("experienceCrt", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.experienceCrt && (
                  <p className="mt-2 text-sm text-red-600">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="rate"
                  className="block text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Rate (₹ per hour)
                </label>
                <input
                  id="rate"
                  type="number"
                  {...register("rate", { required: true, min: 0 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Rate"
                />
                {errors.rate && (
                  <p className="mt-2 text-sm text-red-600">
                    This field is required and must be a non-negative number
                  </p>
                )}
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
