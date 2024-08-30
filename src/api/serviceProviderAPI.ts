import Api from "../Services/axios";

import serviceProviderEndpoint from "../Services/endpoints/serviceProviderEndpoint";

// // export const signup = async (
// //   name: string,
// //   email: string,
// //   mobile: number,
// //   password: string,
// //   service: string,
// //   specialization: string,
// //   qualification: string,
// //   expYear: number,
// //   rate: number,
// //   location: string,
// //   experienceCrt:File
// // ) => {
// //   try {
// //     const response = await Api.post(interviewerEndpoint.interviewerSignUp, {
// //       name,
// //       email,
// //       mobile,
// //       password,
// //       service,
// //       specialization,
// //       qualification,
// //       expYear,
// //       rate,
// //       location,
// //       experienceCrt
      
      
// //     });

    
// //     const token = response.data.data;
// //     localStorage.setItem("interviewerOtp", token);
// //     return response;
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// export const signup = async (
//   name: string,
//   email: string,
//   mobile: number,
//   password: string,
//   service: string,
//   specialization: string,
//   qualification: string,
//   expYear: number,
//   rate: number,
//   location: string,
//   experienceCrt: File
// ) => {
//   try {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("mobile", mobile.toString());
//     formData.append("password", password);
//     formData.append("service", service);
//     formData.append("specialization", specialization);
//     formData.append("qualification", qualification);
//     formData.append("expYear", expYear.toString());
//     formData.append("rate", rate.toString());
//     formData.append("location", location);
//     formData.append("experienceCrt", experienceCrt);

//     const response = await Api.post(interviewerEndpoint.interviewerSignUp, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     const token = response.data.data;
//     localStorage.setItem("interviewerOtp", token);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };


// export const verifyOtp = async (otp: string) => {
//   try {
//     let token = localStorage.getItem("interviewerOtp");
//     const response = await Api.post(
//       interviewerEndpoint.verifyOtp,
//       { otp },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (response.data.success) {
//       localStorage.removeItem("interviewerOtp");
//     }
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const resendOtp = async () => {
//   try {
//     const token = localStorage.getItem("interviewerOtp");
//     const response = await Api.post(interviewerEndpoint.resendOtp, "", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const newToken = response.data.token;
//     localStorage.setItem("interviewerOtp", newToken);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const verifyLogin = async (email: string, password: string) => {
//   try {
//     const response = await Api.post(interviewerEndpoint.verifyLogin, {
//       email,
//       password,
//     });
//     console.log("response: ", response);
//     return response.data;
//   } catch (error: any) {
//     return error.response.data;
//   }
// };



export const signup = async (
    name: string,
    email: string,
    mobile: number,
    password: string
  ) => {
    try {
      const response = await Api.post(serviceProviderEndpoint.serviceProviderSignUp, {
        name,
        email,
        mobile,
        password,
      });
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
  
//   interface ServiceProviderDetails {
//     name: string;
//     mobile: number;
//     email: string;
//     service: number;
//     specialization: string;
//     qualification: string;
//     expYear: number;
//     location: string;
//     profilePicture: File[];
//     rate: number;
//     experienceCrt: File[];
//   }
  
//   export const verifyDetails = async (serviceProviderDetails: ServiceProviderDetails) => {
//     try {
//       const formData = new FormData();
//       for (const key in serviceProviderDetails) {
//         if (serviceProviderDetails.hasOwnProperty(key)) {
//           const value = serviceProviderDetails[key as keyof ServiceProviderDetails];
//           if (
//             key === "profilePicture" ||
//             key === "experienceCrt"
//           ) {
//             // formData.append(key, interviewerDetails[key][0]);
//             formData.append(key, (value as File[])[0]);
//           } else {
//             // formData.append(key, interviewerDetails[key] );
//             formData.append(key, value as string);
//           }
//         }
//       }
  
//       const response = await Api.post(
//         serviceProviderEndpoint.verifyDetails,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
            
//           },
//         }
//       );
//       console.log('hlooooo',response);
//       return response.data;
//     } catch (error) {
//       console.log("Error in verifying details: ", error);
//     }
//   };
interface ServiceProviderDetails { // Corrected the interface name
    name: string;
    mobile: number;
    email: string;
    service: number;
    specialization: string;
    qualification: string;
    expYear: number;
    location: string;
    profilePicture: File[];
    rate: number;
    experienceCrt: File[];
  }
  
  export const verifyDetails = async (serviceProviderDetails: ServiceProviderDetails) => { // Corrected the function name and interface reference
    try {
      const formData = new FormData();
      for (const key in serviceProviderDetails) {
        if (serviceProviderDetails.hasOwnProperty(key)) {
          const value = serviceProviderDetails[key as keyof ServiceProviderDetails];
          if (key === "profilePicture" || key === "experienceCrt") {
            formData.append(key, (value as File[])[0]);
          } else {
            formData.append(key, value as string);
          }
        }
      }
  
      const token = localStorage.getItem("serviceProviderToken"); // Assuming token is stored in localStorage
      const response = await Api.post(
        serviceProviderEndpoint.verifyDetails,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Attach the token for authentication
          },
        }
      );
      console.log(response);
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

export const getProfileDetails = async() => {
  try {
      const {data} = await Api.get(serviceProviderEndpoint.getProfileDetails)
      console.log('data:',data);

      return data
      
  } catch (error) {
      console.log(error)
  }
}

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
  status: "open" | "booked";
  price: number;
  date: Date | null;
  services: Services[]
  
}

export const addSlot = async (slotData: SlotData) => {
  try {
    const response = await Api.post(serviceProviderEndpoint.addSlot, { slotData });
    return response.data;
  } catch (error: any) { // Cast to `any`
    if (error.response && error.response.status === 401) {
      alert(error.response.data.message); // Display the "You are blocked!" message
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

export const getSlotsList = async (page: number, limit: number, query: string) => {
  try {
    const response = await Api.get(serviceProviderEndpoint.getSlots + `?searchQuery=${query}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    return error.response.data
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


export const getSchedulesBookings = async(page: number, limit: number) => {
  try {
      const response = await Api.get(serviceProviderEndpoint.getSchedulesBookings + `?page=${page}&limit=${limit}`)
      return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const getPaymentDashboardDetails = async() => {
  try {
    const {data} = await Api.get(serviceProviderEndpoint.getPaymentDashboardDetails)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateWallet = async (amount: number) => {
  try {
    const type = "debit"
    const {data} = await Api.put(serviceProviderEndpoint.updateWallet, {amount, type})
    return data
  } catch (error) {
    console.log(error)
  }
}




export const processRefund = async (bookingId: string, amount: number) => {
  try {
    console.log('Sending refund request:', { bookingId, amount });

    const response = await Api.post(`${serviceProviderEndpoint.processRefund}/${bookingId}`, { amount });

    return response.data;
  } catch (error) {
    throw new Error("Error processing refund");
  }
};
