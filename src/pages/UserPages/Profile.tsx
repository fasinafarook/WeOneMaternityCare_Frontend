import React, {  useEffect } from 'react';
import UserNavbar from '../../components/common_pages/UserHeader';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaSave } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';
import { editPassword ,getProfileDetails,editProfile} from '../../api/userAPI';
import toast from 'react-hot-toast';
import Footer from '../../components/common_pages/Footer';

interface ProfileData {
  name: string;
  email: string;
  mobile: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string; 
}

const Profile: React.FC = () => {
  

  const { register: registerProfile, handleSubmit: handleSubmitProfile, setValue: setValueProfile, formState: {errors: profileError} } = useForm<ProfileData>();
  const { register: registerPassword, handleSubmit: handleSubmitPassword, reset: resetPassword, formState: {errors: passwordError} } = useForm<PasswordData>();

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => { 
        const {data} = await getProfileDetails()
        console.log('data: ', data)
      setValueProfile('name', data.name);
      setValueProfile('email', data.email);
      setValueProfile('mobile', data.mobile);
    };
    fetchUserData();
  }, []);


  const saveProfileChanges: SubmitHandler<ProfileData> = async (data) => {
    try {
      // Ensure the correct data is being sent
      const response = await editProfile({
        name: data.name.trim(), // Ensure the name is not just whitespace
        mobile: data.mobile,
      });
  
      if (response.success) {
        toast.success("Profile Updated Successfully", {
          style: {
            border: "1px solid #2F76FF",
            padding: "16px",
            color: "#19328F",
            backgroundColor: "#D9E9FF",
          },
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  


  const changePassword: SubmitHandler<PasswordData> = async (data) => {
    if (data.currentPassword && data.newPassword) {
        try {
            const response = await editPassword(data.currentPassword, data.newPassword);
            if(response.success) {
                toast.success("Password updated", {
                    style: {
                        border: "1px solid #2F76FF",
                        padding: "16px",
                        color: "#19328F",
                        backgroundColor: "#D9E9FF",
                    },
                });
                console.log('Password changed');
                resetPassword();
            } else {
                toast.error(response.message, {
                    style: {
                        border: "1px solid #FF0000",
                        padding: "16px",
                        color: "#8F1919",
                        backgroundColor: "#FFD9D9",
                    },
                });
            }
        } catch (error) {
            toast.error("An unexpected error occurred", {
                style: {
                    border: "1px solid #FF0000",
                    padding: "16px",
                    color: "#8F1919",
                    backgroundColor: "#FFD9D9",
                },
            });
            console.error('Unexpected error: ', error);
        }
    } else {
        toast.error("Please enter both current and new passwords.");

    }
};


  return (
    <>
      <UserNavbar />
      <div className="bg-white-100 min-h-screen p-8 md:p-28">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#0f0f0f] to-[#8c8d93] p-6 text-white">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
          </div>

          <div className="p-6 space-y-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              
              {/* <h2 className="mt-4 text-2xl font-semibold">Abhiandn</h2> */}
            </div>

            {/* Personal Information */}
            <form onSubmit={handleSubmitProfile(saveProfileChanges)} className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      {...registerProfile('name', { required: "Name is required", validate: {
                        notWhitespace: value => value.trim() !== "" || "Name cannot be empty",
                      }, })}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                    {
                        profileError.name && <p className='text-sm text-red-500 p-1'>{profileError.name.message}</p>
                    }
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      {...registerProfile('email', { required: true })}
                      readOnly
                      className="focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                 
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="mobile"
                      {...registerProfile('mobile', { required: "Mobile is required" , pattern: {
                        value: /^[0]?[789]\d{9}$/,
                        message: "Enter a valid number",
                      },})}
                      className="focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  {
                        profileError.mobile && <p className='text-sm text-red-500 p-1'>{profileError.mobile.message}</p>
                    }
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button 
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  style={{background:" rgb(27, 145, 187)"}} >
                  <FaSave className="mr-2" /> Update Profile
                </button>
              </div>
            </form>

            {/* Change Password */}
            <form onSubmit={handleSubmitPassword(changePassword)} className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="currentPassword"
                      {...registerPassword('currentPassword', { required: "Password cannot be empty" })}
                      className="focus:ring-indigo-500  p-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  {
                        passwordError.currentPassword && <p className='text-sm text-red-500 p-1'>{passwordError.currentPassword.message}</p>
                    }
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="newPassword"
                      {...registerPassword('newPassword', { required: "Password cannot be empty", pattern:{
                        value:  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                        message: "Password should be 6-16 characters long and contain at least one number and one special character"
                    } })}
                      className="focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  {
                        passwordError.newPassword && <p className='text-sm text-red-500 p-1'>{passwordError.newPassword.message}</p>
                    }
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button 
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  style={{background:" rgb(27, 145, 187)"}}>
                  <FaLock className="mr-2" /> Change Password
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

export default Profile;