import Api from "../Services/axios";

import userEndpoint from "../Services/endpoints/userEndpoints";

import { ServiceProvider } from "../types/SeviceProviders";

export const signup = async (
  name: string,
  email: string,
  mobile: number,
  password: string
) => {
  try {
    const response = await Api.post(userEndpoint.candidateSignUp, {
      name,
      email,
      mobile,
      password,
    });
    const token = response?.data.token;
    localStorage.setItem("userOtp", token);
    return response;
  } catch (error) {
    console.log(error);
    throw error;


  }
};

export const verifyOtp = async (otp: string) => {
  try {
    const token = localStorage.getItem("userOtp");

    const response = await Api.post(
      userEndpoint.verifyOtp,
      { otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response: ", response);
    if (response?.data.success) {
      localStorage.removeItem("userOtp");
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const resendOtp = async () => {
  try {
    const token = localStorage.getItem("userOtp");
    const response = await Api.post(userEndpoint.resendOtp, "", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newToken = response.data.token;
    localStorage.setItem("userOtp", newToken);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyLogin = async (email: string, password: string) => {
  try {
    const response = await Api.post(userEndpoint.verifyLogin, {
      email,
      password,
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    }
    console.log(error);
  }
};

export const home = async () => {
  try {
    const response = await Api.get(userEndpoint.home);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProfileDetails = async () => {
  try {
    const { data } = await Api.get(userEndpoint.getProfileDetails);
    console.log("data:", data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
interface userDetails {
  name: string;
  mobile: string;
  email?: string;
}
export const editProfile = async (details: userDetails) => {
  try {
    const { data } = await Api.put(userEndpoint.editProfile, details);
    console.log("ed", data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editPassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const { data } = await Api.put(userEndpoint.editPassword, {
      currentPassword,
      newPassword,
    });
    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const fetchApprovedAndUnblockedProviders = async (): Promise<
  ServiceProvider[]
> => {
  try {
    const response = await Api.get(userEndpoint.serviceProviders);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch providers:", error);
    throw new Error("Failed to fetch providers");
  }
};

export const fetchCategories = async () => {
  try {
    const response = await Api.get(userEndpoint.serviceCategorys);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
};

export const getServiceProviderDetails = async (id: string) => {
  try {
    const response = await Api.get(
      userEndpoint.getServiceProviderDetails + `/${id}`
    );
    console.log("res", response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getServiceProviderSlotDetails = async (
  serviceProviderId: string
) => {
  try {
    const response = await Api.get(
      userEndpoint.getInterviewerSlotDetails + `/${serviceProviderId}`,
      {}
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const makePayment = async (data: any, previousUrl: string) => {
  try {
    const response = await Api.post(userEndpoint.makePayment, {
      data,
      previousUrl,
    });
    console.log('data',response.data);
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getScheduledIbookings = async (page: number, limit: number) => {
  try {
    const response = await Api.get(
      userEndpoint.getScheduledBookings + `?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

interface IWebinar {
  webinarId: string;
  title: string;
  quotes: string;
  thumbnail: string;
  videoUrl: string;
  createdAt: string;
  isListed: boolean;
}

export const fetchListedWebinars = async (): Promise<IWebinar[]> => {
  try {
    const response = await Api.get(userEndpoint.getListedWebinars);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch webinars:", error);
    throw new Error("Failed to fetch webinars");
  }
};

export const fetchBlogs = async (page: number, limit: number) => {
  try {
    const response = await Api.get(
      `${userEndpoint.getBlogs}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
};

export const cancelBooking = async (
  bookingId: string,
  cancellationReason: string
) => {
  try {
    const response = await Api.post(
      `${userEndpoint.cancelBooking}/${bookingId}`,
      { cancellationReason }
    );

    return response.data;
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw error;
  }
};

export const getPaymentDashboardDetails = async () => {
  try {
    const { data } = await Api.get(userEndpoint.getPaymentDashboardDetails);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserComplaints = async (userId: string) => {
  try {
    const { data } = await Api.get(`${userEndpoint.getComplaints}/${userId}`);
    return data;
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    throw error;
  }
};

export const fileComplaint = async (
  userId: string,
  subject: string,
  description: string
) => {
  try {
    const response = await Api.post(userEndpoint.submitComplaint, {
      userId,
      subject,
      message: description,
    });
    console.log("Complaint filed successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to file complaint:", error);
    throw new Error("Failed to file complaint");
  }
};

export const getUserchatt = async () => {
  try {
    const { data } = await Api.get(`${userEndpoint.getUserchatt}`);
    console.log("uj", data);

    return data;
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    throw error;
  }
};

export const getUserCompletedBookings = async (userId: string) => {
  try {
    const response = await Api.get(`/user/completed/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch completed bookings:", error);
    throw error;
  }
};

export const forgorPassword = async (email: string) => {
  try {
    const response = await Api.post(userEndpoint.forgorPassword, { email });
    console.log(response.data);
    localStorage.setItem("resetPassword", response.data.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export const resetPassword = async (otp: string, password: string) => {
  try {
    const token = localStorage.getItem("resetPassword");
    const response = await Api.post(
      userEndpoint.resetPassword,
      { otp, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      localStorage.removeItem("resetPassword");
    }
    return response.data;
  } catch (error: any) {
    console.log("inseide catch in api: ", error.response.data);
    return error.response.data;
  }
};
