import React, { useEffect, useState } from "react";
// import { MdArrowBack } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { editPassword, editProfile, fetchCategories, getProfileDetails } from "../../api/serviceProviderAPI";
import toast from "react-hot-toast";
import Footer from "../../components/common_pages/Footer";
import AppNavbar from "../../components/common_pages/ProviderHeader";

interface serviceProvider {
  name: string;
  mobile: number;
  email: string;
  service: string;
  location: string;
  qualification: string;
  expYear: number;
  rate: number;
}

interface IPassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface EditSpProps {
  setShowEdit: (show: boolean) => void;
  serviceProviderDetails: serviceProvider;
  onProfileEdit: (updatedData: serviceProvider) => void;
}

const ProfileManagement: React.FC<EditSpProps> = ({  serviceProviderDetails, onProfileEdit }) => {
  const [categories, setCategories] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<serviceProvider>({
    defaultValues: serviceProviderDetails, // Pre-fill fields with current profile details
  });

  const {register: registerPassword, handleSubmit: handleSubmitPassword, reset: resetPassword, formState: {errors:errorsPassword}, watch} = useForm<IPassword>()


  // Fetch user profile details and prefill the form
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await getProfileDetails();
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("mobile", data.mobile);
        setValue("service", data.service);
        setValue("location", data.location);
        setValue("qualification", data.qualification);
        setValue("expYear", data.expYear);
        setValue("rate", data.rate);
      } catch (error) {
        toast.error("Failed to fetch profile details.");
      }
    };
    fetchUserData();
  }, [setValue]);

  // Handle profile update
  const handleEdit: SubmitHandler<serviceProvider> = async (data) => {
    try {
      const response = await editProfile(data);
      console.log("Response:", response); // Log the response for debugging

      if (response.success) {
        toast.success("Profile updated successfully");

        // Check if the onProfileEdit callback exists and call it
        if (onProfileEdit) {
          try {
            onProfileEdit(data);
          } catch (callbackError) {
            console.error("Error in onProfileEdit:", callbackError);
            toast.error("An error occurred after updating the profile.");
          }
        }
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the profile.");
    }
  };


  // Fetch categories for services dropdown
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData); // Update categories for the service dropdown
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  // Handle password change
  const handlePassword: SubmitHandler<IPassword> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await editPassword(data.oldPassword, data.newPassword);
      if (response.success) {
        toast.success("Password updated successfully");
        resetPassword(); // Reset the password fields after a successful update
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while changing password");
    }
  };

  return (
    <>
      <AppNavbar />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#0f0f0f] to-[#8c8d93] p-6 text-white">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
          </div>

          <form onSubmit={handleSubmit(handleEdit)} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300"
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
              </div>

              {/* Mobile Field */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="tel"
                  id="mobile"
                  {...register("mobile", { required: "Mobile number is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300"
                />
                {errors.mobile && <p className="text-sm text-red-600">{errors.mobile.message}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  readOnly
                  {...register("email", { required: "Email is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
              </div>

              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  {...register("location", { required: "Location is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300"
                />
                {errors.location && <p className="text-sm text-red-600">{errors.location.message}</p>}
              </div>

              {/* Service Dropdown */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                  Service
                </label>
                <select
                  id="service"
                  {...register("service", { required: "Service is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300"
                >
                  <option value="">Select a service</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="text-sm text-red-600">{errors.service.message}</p>}
              </div>

              {/* Qualification Field */}
              <div>
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                  Qualification
                </label>
                <input
                  type="text"
                  id="qualification"
                  {...register("qualification", { required: "Qualification is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300"
                />
                {errors.qualification && <p className="text-sm text-red-600">{errors.qualification.message}</p>}
              </div>

              {/* Experience Field */}
              <div>
                <label htmlFor="expYear" className="block text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="expYear"
                  {...register("expYear", { required: "Experience is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300"
                />
                {errors.expYear && <p className="text-sm text-red-600">{errors.expYear.message}</p>}
              </div>

              {/* Rate Field */}
              <div>
                <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
                  Rate per session
                </label>
                <input
                  type="number"
                  id="rate"
                  {...register("rate", { required: "Rate is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300"
                />
                {errors.rate && <p className="text-sm text-red-600">{errors.rate.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-500" style={{background:" rgb(27, 145, 187)"}}>
                Save Changes
              </button>
            </div>
          </form>

          {/* Password Change Form */}
          <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#0f0f0f] to-[#8c8d93] p-6 text-white">
            <h1 className="text-3xl font-bold">Password Settings</h1>
          </div>
        <form onSubmit={handleSubmitPassword(handlePassword)} className="p-6 space-y-4">
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              {...registerPassword("oldPassword", {required:  "Password is required"})}
              placeholder="Enter old password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {
                errorsPassword .oldPassword && <p className="text-sm text-red-600 pt-1">{errorsPassword .oldPassword.message}</p>
            }
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              {...registerPassword("newPassword", {required:  "Password is required",
                pattern:{
                    value:  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                    message: "Password should be 6-16 characters long and contain at least one number and one special character"
                }
                         
              })}
              placeholder="Enter new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {
                errorsPassword .newPassword && <p className="text-sm text-red-600 pt-1">{errorsPassword .newPassword.message}</p>
            }
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...registerPassword("confirmPassword", {required:  "Password is required",
                validate: (val: string) => {
                    if(watch('newPassword') != val){
                        return "Your passwords do not match"
                    }
                }
              })}
              placeholder="Confirm password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {
                errorsPassword .confirmPassword && <p className="text-sm text-red-600 pt-1">{errorsPassword .confirmPassword.message}</p>
            }
          </div>
          <div className="pt-4">
            <button className="w-full px-4 py-2 bg-[#142057] text-white rounded-md hover:bg-[#19328F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{background:" rgb(27, 145, 187)"}}>
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfileManagement;
