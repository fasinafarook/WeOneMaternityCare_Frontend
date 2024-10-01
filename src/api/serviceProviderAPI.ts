import Api from "../Services/axios";

import serviceProviderEndpoint from "../Services/endpoints/serviceProviderEndpoint";

export const signup = async (
  name: string,
  email: string,
  mobile: number,
  password: string
) => {
  try {
    const response = await Api.post(
      serviceProviderEndpoint.serviceProviderSignUp,
      {
        name,
        email,
        mobile,
        password,
      }
    );
    const token = response.data.data;
    localStorage.setItem("serviceProviderOtp", token);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async (otp: string) => {
  try {
    let token = localStorage.getItem("serviceProviderOtp");
    const response = await Api.post(
      serviceProviderEndpoint.verifyOtp,
      { otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      localStorage.removeItem("serviceProviderOtp");
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const resendOtp = async () => {
  try {
    const token = localStorage.getItem("serviceProviderOtp");
    const response = await Api.post(serviceProviderEndpoint.resendOtp, "", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newToken = response.data.token;
    localStorage.setItem("serviceProviderOtp", newToken);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyLogin = async (email: string, password: string) => {
  try {
    const response = await Api.post(serviceProviderEndpoint.verifyLogin, {
      email,
      password,
    });
    console.log("response: ", response);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

interface ServiceProviderDetails {
  // name: string;
  // mobile: number;
  // email: string;
  service: string;
  specialization?: string;
  qualification: string;
  expYear: number;
  location: string;
  profilePicture?: File[];
  rate?: number;
  experienceCrt?: File[];
}

export const verifyDetails = async (
  serviceProviderDetails: ServiceProviderDetails
) => {
  try {
    const formData = new FormData();

    for (const key in serviceProviderDetails) {
      console.log("sp", serviceProviderDetails);

      if (serviceProviderDetails.hasOwnProperty(key)) {
        const value =
          serviceProviderDetails[key as keyof ServiceProviderDetails];
        if (key === "profilePicture" || key === "experienceCrt") {
          formData.append(key, (value as File[])[0]);
        } else {
          formData.append(key, value as string);
        }
      }
    }
    console.log("for", formData);

    const response = await Api.post(
      serviceProviderEndpoint.verifyDetails,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`, // Attach the token for authentication
        },
      }
    );
    console.log("response", response);
    return response.data;
  } catch (error: any) {
    console.log("Error in verifying details: ", error);
    return error.response?.data;
  }
};

export const logout = async () => {
  const response = await Api.post(serviceProviderEndpoint.logout);
  return response.data;
};

export const fetchCategories = async () => {
  try {
    const response = await Api.get(serviceProviderEndpoint.serviceCategorys);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
};

export const getProfileDetails = async () => {
  try {
    const { data } = await Api.get(serviceProviderEndpoint.getProfileDetails);
    console.log("datas:", data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const homeDetails = async () => {
  const response = await Api.get(serviceProviderEndpoint.homeDetails);
  return response.data;
};

interface Services {
  value: string;
  label: string;
}

interface SlotData {
  description: string;
  timeFrom: Date;
  timeTo: Date;
  title: string;
  status?: "open" | "booked";
  price: number;
  date: Date | null;
  services: Services[];
}

export const addSlot = async (slotData: SlotData) => {
  try {
    const response = await Api.post(serviceProviderEndpoint.addSlot, {
      slotData,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      alert(error.response.data.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const getSlotsList = async (
  page: number,
  limit: number,
  query: string
) => {
  try {
    const response = await Api.get(
      serviceProviderEndpoint.getSlots +
        `?searchQuery=${query}&page=${page}&limit=${limit}`
    );
    console.log("Backend response", response);
    console.log("Backend responsedata", response.data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getDomains = async () => {
  try {
    const response = await Api.get(serviceProviderEndpoint.getDomains);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getSchedulesBookings = async (page: number, limit: number) => {
  try {
    const response = await Api.get(
      serviceProviderEndpoint.getSchedulesBookings +
        `?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getPaymentDashboardDetails = async () => {
  try {
    const { data } = await Api.get(
      serviceProviderEndpoint.getPaymentDashboardDetails
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateWallet = async (amount: number) => {
  try {
    const type = "debit";
    const { data } = await Api.put(serviceProviderEndpoint.updateWallet, {
      amount,
      type,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const processRefund = async (bookingId: string, amount: number) => {
  try {
    console.log("Sending refund request:", { bookingId, amount });

    const response = await Api.post(
      `${serviceProviderEndpoint.processRefund}/${bookingId}`,
      { amount }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error processing refund");
  }
};

export const editSlot = async (slotId: string, slotData: any) => {
  try {
    const response = await Api.put(
      `/serviceProvider/edit-slot/${slotId}`,
      slotData
    );
    console.log("Backend response", response);
    console.log("Backend responsedata", response.data);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error updating slot");
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  status: string
) => {
  try {
    const response = await Api.put(
      `${serviceProviderEndpoint.updateBookingStatus}/${bookingId}`,
      { status }
    );
    return response.data;
  } catch (error: any) {
    console.log("Error updating booking status:", error);
    return error.response?.data;
  }
};

export const forgorPassword = async (email: string) => {
  try {
    const response = await Api.post(serviceProviderEndpoint.ForgotPassword, {
      email,
    });
    localStorage.setItem("intResetPassword", response.data.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const resetPassword = async (otp: string, password: string) => {
  try {
    const token = localStorage.getItem("intResetPassword");
    const response = await Api.post(
      serviceProviderEndpoint.resetPassword,
      { otp, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      localStorage.removeItem("intResetPassword");
    }
    return response.data;
  } catch (error: any) {
    console.log("inseide catch in api: ", error.response.data);
    return error.response.data;
  }
};

export const editPassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const { data } = await Api.put(serviceProviderEndpoint.editPassword, {
      currentPassword,
      newPassword,
    });
    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const editProfile = async (details: ServiceProviderDetails) => {
  try {
    const { data } = await Api.put(serviceProviderEndpoint.editProfile, {
      details,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDashboardData = async () => {
  try {
    const response = await Api.get("/serviceProvider/dashboard");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw error;
  }
};

export const notifyLeaveAndRefund = async (bookingId: string, cancelReason: string) => {
  return await Api.post(`/serviceProvider/notify-leave/${bookingId}`, { cancelReason });
};