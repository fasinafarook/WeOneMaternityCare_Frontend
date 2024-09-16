import axios from "axios";
import store from "../redux/store";
import Swal from "sweetalert2";  // Import Swal
import { userLogout, serviceProviderLogout } from "../redux/slice/authSlice";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export const setupInterceptors = (navigate: any) => {
  Api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 403) {
        const state = store.getState();
        const { userInfo, serviceProviderInfo } = state.auth;

        console.log("Interceptors error:", error.response.status);
        console.log("Service provider info:", serviceProviderInfo);

        if (serviceProviderInfo) {
          store.dispatch(serviceProviderLogout());

          Swal.fire({
            icon: "error",
            title: "Account Blocked",
            text: "Your account has been blocked. You have been logged out.",
          }).then(() => {
            navigate("/serviceProvider/verify-login");
          });
        } else if (userInfo) {
          store.dispatch(userLogout());

          Swal.fire({
            icon: "error",
            title: "Account Blocked",
            text: "Your account has been blocked. You have been logged out.",
          }).then(() => {
            navigate("/user/verify-login");
          });
        }
      }
      return Promise.reject(error);
    }
  );
};

export default Api;
