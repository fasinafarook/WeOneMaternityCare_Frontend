import axios from "axios";
import store from "../redux/store";
import { userLogout, serviceProviderLogout } from "../redux/slice/authSlice";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// export const setupInterceptors = (navigate: any) => {
//     Api.interceptors.response.use(
//         (response) => response,
//         async(error) => {
//             if(error.response && error.response.status === 403) {
//                 const state = store.getState();
//                 const {userInfo}= state.auth
//                 if(userInfo){
//                     // store.dispatch(setBlockedStatus(true))
//                     console.log('inside interceptor: ', userInfo)
//                     store.dispatch(userLogout())
//                     alert("your account has been blocked. You have been logged out.")
//                     navigate('/user/login')
//                 }
//             }
//             return Promise.reject(error)
//         }
//     )
// }

export const setupInterceptors = (navigate: any) => {
  Api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 403) {
        const state = store.getState();
        const { userInfo, serviceProviderInfo } = state.auth;

        if (serviceProviderInfo) {
          store.dispatch(serviceProviderLogout());
          alert("Your account has been blocked. You have been logged out.");
          navigate("/serviceProvider/verify-login");
        } else if (userInfo) {
          store.dispatch(userLogout());
          alert("Your account has been blocked. You have been logged out.");
          navigate("/user/verify-login");
        }
      }
      return Promise.reject(error);
    }
  );
};

export default Api;
