import Api from "../Services/axios";

import adminEndpoint from "../Services/endpoints/adminEndpoint";

export const verifyLogin = async (email: string, password: string) => {
  try {
    const response = await Api.post(adminEndpoint.adminLogin, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (page: number, limit: number) => {
  try {
    const response = await Api.get(
      adminEndpoint.getUsers + `?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const blockUser = async (userId: string) => {
  try {
    const response = await Api.put(adminEndpoint.blockUser + `/${userId}`);
    return response.data;
  } catch (error) {
    console.log("Error blocking user", error);
  }
};

export const getServiceProviders = async (page: number, limit: number) => {
  try {
    const response = await Api.get(
      adminEndpoint.getServiceProviders + `?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching ServiceProviders: ", error);
  }
};

export const getServiceProviderDetails = async (id: string) => {
  try {
    const response = await Api.get(
      adminEndpoint.getServiceProviderDetails + `/${id}`
    );
    console.log("res", response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const approveServiceProvider = async (serviceProviderId: string) => {
  try {
    const response = await Api.put(
      adminEndpoint.approveServiceProvider + `/${serviceProviderId}`
    );
    return response;
  } catch (error) {
    console.log("Error in approving ServiceProvider");
  }
};

export const blockProvider = async (serviceProviderId: string) => {
  try {
    const response = await Api.put(
      adminEndpoint.blockProvider + `/${serviceProviderId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error blocking user", error);
  }
};

export const logout = async () => {
  try {
    const response = await Api.post(adminEndpoint.logout);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

interface categoryData {
  categoryName: string;
  subCategories: string[];
}

export const addCategory = async (categoryData: categoryData) => {
  try {
    const { categoryName, subCategories } = categoryData;
    const response = await Api.post(adminEndpoint.addCategory, {
      categoryName,
      subCategories,
    });
    return response.data;
  } catch (error: any) {
    console.log("Error adding category", error);
    if (error.response) {
      console.log(error.response);
      return error.response.data;
    } else {
      throw new Error("Failed to add category");
    }
  }
};

export const getCategorys = async (page: number, limit: number) => {
  try {
    const response = await Api.get(
      adminEndpoint.getCategorys + `?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching categoy");
  }
};

export const unlistCategory = async (categoryId: string) => {
  try {
    const response = await Api.put(
      adminEndpoint.unlistCategory + `/${categoryId}`
    );
    console.log("resp: ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogs = async (page: number, limit: number) => {
  try {
    const response = await Api.get(
      adminEndpoint.getBlogs + `?page=${page}&limit=${limit}`
    );
    console.log("Fetched blogs:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching blogs:", error);
    return { success: false, data: [], total: 0 }; // Ensure it returns a consistent structure
  }
};

export const unlistBlog = async (blogId: string) => {
  try {
    const response = await Api.put(adminEndpoint.unlistBlog + `/${blogId}`);
    console.log("Response from unlisting:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error unlisting blog:", error);
    throw error; // Ensure errors are thrown so they can be caught in the component
  }
};

// interface BlogData {
//     title: string;
//     image: File | null;
//     content: string;
//     date?: Date;
// }

export const addBlog = async (formData: FormData) => {
  try {
    const response = await Api.post(adminEndpoint.addBlog, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.log("Error adding blog", error);
    if (error.response) {
      console.log(error.response);
      return error.response.data;
    } else {
      throw new Error("Failed to add blog");
    }
  }
};

export const updateBlogStatus = async (blogId: string, isListed: boolean) => {
  try {
    const response = await Api.put(
      `${adminEndpoint.updateBlogStatus}/${blogId}`,
      { isListed }
    );
    return response.data;
  } catch (error) {
    console.log("Error updating blog status:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const addWebinar = async (formData: FormData) => {
  try {
    const response = await Api.post(adminEndpoint.addWebinar, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response", response.data);

    return response.data;
  } catch (error: any) {
    console.log("Error adding webinar", error);
    if (error.response) {
      console.log(error.response);
      return error.response.data;
    } else {
      throw new Error("Failed to add webinar");
    }
  }
};

export const getWebinars = async (page: number, limit: number) => {
  try {
    const response = await Api.get(
      adminEndpoint.getWebinars + `?page=${page}&limit=${limit}`
    );
    // console.log('responsedata',response.data);

    return response.data;
  } catch (error) {
    console.log("Error fetching webinars:", error);
    return { success: false, data: [], total: 0 };
  }
};

export const toggleWebinarListing = async (
  webinarId: string,
  isListed: boolean
) => {
  try {
    const response = await Api.put(
      adminEndpoint.toggleWebinarListing + `/${webinarId}`,
      { isListed: !isListed }
    );
    return response.data;
  } catch (error) {
    console.log("Error toggling webinar listing:", error);
    throw error;
  }
};

export const unlistWebinar = async (webinarId: string) => {
  try {
    const response = await Api.put(
      adminEndpoint.unlistWebinar + `/${webinarId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error unlisting webinar:", error);
    throw error;
  }
};




export const fetchComplaints = async () => {
  try {
    const response = await Api.get(
      `${adminEndpoint.getAllComplaints}`
    );    return response.data;
  } catch (error) {
    console.error('Error fetching complaints:', error);
    throw error;
  }
};


interface RespondToComplaintParams {
  complaintId: string;
  response: string;
}

export const respondToComplaint = async ({ complaintId, response }: RespondToComplaintParams) => {
  try {
    const res = await Api.put(`${adminEndpoint.respondToComplaint}/${complaintId}`, { responseMessage: response });
    console.log('res',res);
    
    return res.data;
  } catch (error) {
    console.error('Error responding to complaint:', error);
    throw new Error('Failed to respond to complaint');
  }
};


export const getBookings = async (page: number, limit: number) => {
  try {
    const response = await Api.get(`${adminEndpoint.getBookings}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch bookings");
  }
};


export const getDashboardDetails = async () => {
  try {
      const {data} = await Api.get(adminEndpoint.getDashboardDetails)
      console.log('dfgg',data);
      
      return data
  } catch (error) {
      console.log(error)
  }
}