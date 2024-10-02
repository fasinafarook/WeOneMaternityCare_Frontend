import React, { useEffect } from "react";
import UserNavbar from "../../components/common_pages/UserHeader";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaSave } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  editPassword,
  getProfileDetails,
  editProfile,
} from "../../api/userAPI";
import toast from "react-hot-toast";
import Footer from "../../components/common_pages/Footer";

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
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    setValue: setValueProfile,
    formState: { errors: profileError },
  } = useForm<ProfileData>();
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordError },
  } = useForm<PasswordData>();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await getProfileDetails();
      setValueProfile("name", data.name);
      setValueProfile("email", data.email);
      setValueProfile("mobile", data.mobile);
    };
    fetchUserData();
  }, []);

  const saveProfileChanges: SubmitHandler<ProfileData> = async (data) => {
    try {
      const response = await editProfile({
        name: data.name.trim(),
        mobile: data.mobile,
      });

      if (response.success) {
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const changePassword: SubmitHandler<PasswordData> = async (data) => {
    if (data.currentPassword && data.newPassword) {
      try {
        const response = await editPassword(
          data.currentPassword,
          data.newPassword
        );
        if (response.success) {
          toast.success("Password updated");
          resetPassword();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error("Unexpected error: ", error);
      }
    } else {
      toast.error("Please enter both current and new passwords.");
    }
  };

  return (
    <>
      <UserNavbar />
      <div
        style={{
          minHeight: "100vh",
          background:
            "url(https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          padding: "8px 28px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "linear-gradient(to right, #0f0f0f, #8c8d93)",
              padding: "30px",
              color: "white",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
              Profile Settings
            </h1>
          </div>

          <div style={{ padding: "30px", display: "grid", gap: "20px" }}>
            {/* Personal Information */}
            <form
              onSubmit={handleSubmitProfile(saveProfileChanges)}
              style={{ display: "grid", gap: "20px" }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  borderBottom: "2px solid #ddd",
                  paddingBottom: "10px",
                }}
              >
                Personal Information
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Name
                  </label>
                  <div style={{ position: "relative" }}>
                    <FaUser
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        color: "#999",
                      }}
                    />
                    <input
                      type="text"
                      id="name"
                      {...registerProfile("name", {
                        required: "Name is required",
                        validate: {
                          notWhitespace: (value) =>
                            value.trim() !== "" || "Name cannot be empty",
                        },
                      })}
                      style={{
                        width: "100%",
                        padding: "10px 10px 10px 35px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        outline: "none",
                        fontSize: "14px",
                        transition: "0.3s ease-in-out",
                      }}
                    />
                    {profileError.name && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {profileError.name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Email
                  </label>
                  <div style={{ position: "relative" }}>
                    <FaEnvelope
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        color: "#999",
                      }}
                    />
                    <input
                      type="email"
                      id="email"
                      readOnly
                      {...registerProfile("email", { required: true })}
                      style={{
                        width: "100%",
                        padding: "10px 10px 10px 35px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        outline: "none",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Mobile
                  </label>
                  <div style={{ position: "relative" }}>
                    <FaPhone
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        color: "#999",
                      }}
                    />
                    <input
                      type="tel"
                      id="mobile"
                      {...registerProfile("mobile", {
                        required: "Mobile is required",
                        pattern: {
                          value: /^[0]?[789]\d{9}$/,
                          message: "Enter a valid number",
                        },
                      })}
                      style={{
                        width: "100%",
                        padding: "10px 10px 10px 35px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        outline: "none",
                        fontSize: "14px",
                        transition: "0.3s ease-in-out",
                      }}
                    />
                    {profileError.mobile && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {profileError.mobile.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#1B91BB",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "0.3s ease-in-out",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <FaSave style={{ marginRight: "8px" }} /> Update Profile
                </button>
              </div>
            </form>

            {/* Change Password */}
            <form
              onSubmit={handleSubmitPassword(changePassword)}
              style={{ display: "grid", gap: "20px" }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  borderBottom: "2px solid #ddd",
                  paddingBottom: "10px",
                }}
              >
                Change Password
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <div>
                  <label
                    htmlFor="currentPassword"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Current Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <FaLock
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        color: "#999",
                      }}
                    />
                    <input
                      type="password"
                      id="currentPassword"
                      {...registerPassword("currentPassword", {
                        required: true,
                      })}
                      style={{
                        width: "100%",
                        padding: "10px 10px 10px 35px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        outline: "none",
                        fontSize: "14px",
                      }}
                    />
                    {passwordError.currentPassword && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        Current Password is required
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    New Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <FaLock
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        color: "#999",
                      }}
                    />
                    <input
                      type="password"
                      id="newPassword"
                      {...registerPassword("newPassword", { required: true })}
                      style={{
                        width: "100%",
                        padding: "10px 10px 10px 35px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        outline: "none",
                        fontSize: "14px",
                      }}
                    />
                    {passwordError.newPassword && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        New Password is required
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#1B91BB",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "0.3s ease-in-out",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <FaSave style={{ marginRight: "8px" }} /> Update Password
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

export default Profile;
