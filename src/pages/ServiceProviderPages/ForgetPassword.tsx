import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/images/logo.jpeg";
import { forgorPassword, resetPassword } from "../../api/serviceProviderAPI";
import toast from "react-hot-toast";

interface IForm {
  email: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ForgotPasswords: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<IForm>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  const navigate = useNavigate();
  const onSubmit = async (data: IForm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await forgorPassword(data.email);
      if (!response.success) {
        setError(response.message);
      } else {
        setShowResetForm(true);
        reset();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onResetSubmit = async (data: IForm) => {
    // Implement password reset logic here
    console.log("Reset password data:", data);
    const { otp, newPassword } = data;

    const response = await resetPassword(otp as string, newPassword as string);
    console.log("resonse indised reset submit: ", response);
    if (response.success) {
      toast.success("Password Changed successfully");
      navigate("/serviceProvider/verify-login");
    } else {
      // alert(response.message)
      toast.error(response.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100">
      <Link to="/">
        <img src={logo} alt="Logo" style={{ width: "100px", height: "70px" }} />
      </Link>{" "}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full relative mt-20 max-w-md space-y-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-[#142057]">
                {showResetForm
                  ? "Reset Your Password"
                  : "Forgot your password?"}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {showResetForm
                  ? "Enter the OTP and your new password"
                  : "No worries! We will send you reset instructions."}
              </p>
            </div>

            {!showResetForm ? (
              <EmailForm
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                loading={loading}
                error={error}
              />
            ) : (
              <ResetForm
                onSubmit={handleSubmit(onResetSubmit)}
                register={register}
                errors={errors}
                loading={loading}
                getValues={getValues}
              />
            )}

            <div className="mt-6 text-center">
              <Link
                to="/serviceProvider/verify-login"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remember your password? Log in
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const EmailForm: React.FC<{
  onSubmit: () => void;
  register: any;
  errors: any;
  loading: boolean;
  error: string | null;
}> = ({ onSubmit, register, errors, loading, error }) => (
  <form className="mt-8 space-y-6" onSubmit={onSubmit}>
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email address
      </label>
      <div className="mt-1">
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : ""
          }`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>
      {error && <p className="text-sm mt-1 text-red-500">{error}</p>}
    </div>
    <SubmitButton loading={loading} text="Send Otp" />
  </form>
);

const ResetForm: React.FC<{
  onSubmit: () => void;
  register: any;
  errors: any;
  loading: boolean;
  getValues: any;
}> = ({ onSubmit, register, errors, loading, getValues }) => (
  <form className="mt-8 space-y-6" onSubmit={onSubmit}>
    <InputField
      id="otp"
      type="number"
      label="OTP"
      register={register}
      errors={errors}
      validationRules={{ required: "OTP is required" }}
    />
    <InputField
      id="newPassword"
      type="password"
      label="New Password"
      register={register}
      errors={errors}
      validationRules={{
        required: "New Password is required",
        minLength: { value: 8, message: "Minimum 8 characters" },
      }}
    />
    <InputField
      id="confirmPassword"
      type="password"
      label="Confirm Password"
      register={register}
      errors={errors}
      validationRules={{
        validate: (value: string) =>
          value === getValues("newPassword") || "Passwords do not match",
      }}
    />
    <SubmitButton loading={loading} text="Reset Password" />
  </form>
);

const InputField: React.FC<{
  id: string;
  type: string;
  label: string;
  register: any;
  errors: any;
  validationRules: any;
}> = ({ id, type, label, register, errors, validationRules }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        id={id}
        type={type}
        {...register(id, validationRules)}
        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
          errors[id]
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : ""
        }`}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {errors[id] && (
        <p className="text-sm text-red-500 mt-1">{errors[id].message}</p>
      )}
    </div>
  </div>
);

const SubmitButton: React.FC<{ loading: boolean; text: string }> = ({
  loading,
  text,
}) => (
  <button
    type="submit"
    disabled={loading}
    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
  >
    {loading ? "Processing..." : text}
  </button>
);

const Footer: React.FC = () => (
  <div className="flex justify-center space-x-4 mt-6">
    <a
      href="#"
      className="text-sm text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out"
    >
      Contact Support
    </a>
    <span className="text-gray-500">|</span>
    <a
      href="#"
      className="text-sm text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out"
    >
      Privacy Policy
    </a>
  </div>
);

export default ForgotPasswords;
