import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Importing all pages
import HomePage from "./pages/Home_Page/Home";
import ClientRegister from "./pages/UserPages/UserRegistration";
import OtpVerification from "./pages/UserPages/otp";
import UserLogin from "./pages/UserPages/UserLogin";
import AdminLogin from "./pages/AdminPages/adminLogin";
import ServiceProviderSignUp from "./pages/ServiceProviderPages/ServiceProviderRegitration";
import ServiceProviderOtp from "./pages/ServiceProviderPages/ServiceProviderOTP";
import ServiceProviderLogin from "./pages/ServiceProviderPages/ServiceProviderLogin";
import ServiceProviderDetails from "./pages/ServiceProviderPages/ServiceProviderDetails";
import AdminDashBoard from "./pages/AdminPages/AdminDahboard";
import ProviderDashboard from "./pages/ServiceProviderPages/ServiceProviderDashboard";
import ClientDashboard from "./pages/UserPages/UserDashboard";
import Users from "./pages/AdminPages/Users";
import ServiceProviders from "./pages/AdminPages/ServiceProvider";
import SingleServiceProviderDetails from "./pages/AdminPages/SingleServiceProviderDetails";
import Profile from "./pages/UserPages/Profile";
import Category from "./pages/AdminPages/Category";
import AddCategory from "./pages/AdminPages/AddCategory";
import ApprovedProviders from "./pages/UserPages/ServiceProvider";
import ProviderDetails from "./pages/UserPages/SingleProvider";
import SlotsList from "./pages/ServiceProviderPages/ProviderSlotLists";
import AddSlot from "./pages/ServiceProviderPages/ProviderAddSlot";
import ProviderAndSlotDetails from "./pages/UserPages/ProviderAndSolots";
import PaymentSuccess from "./pages/UserPages/PaymentSuccess";
import PaymentFailed from "./pages/UserPages/PaymentFailed";
import OutsourcedBookings from "./pages/UserPages/BookingsList";
import ScheduledBookings from "./pages/ServiceProviderPages/ScheduledBookings";
import PaymentsDashboard from "./pages/ServiceProviderPages/PayementPage";
import Blog from "./pages/AdminPages/Blog";
import AddBlog from "./pages/AdminPages/AddBlog";
import AddWebinar from "./pages/AdminPages/AddWebinars";
import ListWebinars from "./pages/AdminPages/Webinars";
import WebinarsList from "./pages/UserPages/Webinars";
import BlogList from "./pages/UserPages/Blogs";
import Wallet from "./pages/UserPages/Wallet";
import UserVideoCall from "./pages/UserPages/videoCall";
import ProviderVideoCall from "./pages/ServiceProviderPages/ProviderVideo";
import EditSlot from "./pages/ServiceProviderPages/EditSlot";

import FileComplaint from "./pages/UserPages/Complaint";
import ComplaintsList from "./pages/UserPages/AllComplaints";
import ComplaintsPage from "./pages/AdminPages/Complaint";
import Chat from "./pages/UserPages/Chat";
import useSocket from "./hooks/useSocket";
import ForgotPassword from "./pages/UserPages/ForgotPassword";
import ForgotPasswords from "./pages/ServiceProviderPages/ForgotPassword";
import About from "./components/common_pages/About";

import ProfileManagement from "./pages/ServiceProviderPages/ProfileManagement";
import NotFound from "./components/common_pages/NotFoundPage";

import AdminBookingList from "./pages/AdminPages/BookingList";
// import ProtectedRoute, { AdminProtectedRoute, ServiceProviderProtectedRoute } from './components/PrivetProtected';
import {
  UserProtectedRoute,
  PublicUserProtectedRoute,
  // PublicSpProtectedRoute,
  PublicAdminProtectedRoute,
  SpProtectedRoute,
  AdminProtectedRoute,
} from "../src/components/PrivetProtected";

const App: React.FC = () => {
  useSocket();
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/webinars" element={<WebinarsList />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<PublicAdminProtectedRoute />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* <Route element={<PublicSpProtectedRoute />}> */}
        <Route
          path="/serviceProvider/verify-details"
          element={<ServiceProviderDetails />}
        />
        <Route
          path="/serviceProvider/serviceProvider-register"
          element={<ServiceProviderSignUp />}
        />
        <Route
          path="/serviceProvider/verify-otp"
          element={<ServiceProviderOtp />}
        />
        <Route
          path="/serviceProvider/verify-login"
          element={<ServiceProviderLogin />}
        />

        <Route
          path="/serviceProvider/forgot-password"
          element={<ForgotPasswords />}
        />

        {/* </Route> */}

        <Route element={<PublicUserProtectedRoute />}>
          <Route path="/user/client-register" element={<ClientRegister />} />
          <Route path="/user/verify-otp" element={<OtpVerification />} />
          <Route path="/user/verify-login" element={<UserLogin />} />
          <Route path="/user/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Routes - User */}
        <Route element={<UserProtectedRoute />}>
          <Route path="/user/home" element={<ClientDashboard />} />
          <Route path="/user/about" element={<About />} />
          <Route path="/user/get-profile" element={<Profile />} />
          <Route
            path="/user/service-providers"
            element={<ApprovedProviders />}
          />
          <Route
            path="/user/serviceProviderDetails/:id"
            element={<ProviderDetails />}
          />
          <Route
            path="/user/get-service-providers-slots-details/:serviceProviderId"
            element={<ProviderAndSlotDetails />}
          />
          <Route path="/user/payment-success" element={<PaymentSuccess />} />
          <Route path="/user/payment-failed" element={<PaymentFailed />} />
          <Route
            path="/user/get-scheduled-Bookings"
            element={<OutsourcedBookings />}
          />
          <Route path="/user/wallet" element={<Wallet />} />
          <Route
            path="/user/video-call/:roomId/:userId"
            element={<UserVideoCall></UserVideoCall>}
          />
          <Route path="/user/new-complaint" element={<FileComplaint />} />
          <Route path="/user/complaints" element={<ComplaintsList />} />
          <Route path="/user/messages" element={<Chat />} />
        </Route>

        {/* Protected Routes - Service Provider */}
        <Route element={<SpProtectedRoute />}>
          <Route path="/serviceProvider/home" element={<ProviderDashboard />} />
          <Route path="/serviceProvider/about" element={<About />} />

          <Route path="/serviceProvider/get-slots" element={<SlotsList />} />
          <Route path="/serviceProvider/add-slot" element={<AddSlot />} />
          <Route
            path="/serviceProvider/get-scheduled-bookings"
            element={<ScheduledBookings />}
          />
          <Route
            path="/serviceProvider/getPaymentDashboardDetails"
            element={<PaymentsDashboard />}
          />
          <Route
            path="/serviceProvider/edit-slot/:slotId"
            element={<EditSlot />}
          />
          <Route
            path="/video-call/:roomId/:serviceProviderId"
            element={<ProviderVideoCall></ProviderVideoCall>}
          />
          <Route
            path="/serviceProvider/get-profile"
            element={
              <ProfileManagement
                setShowEdit={(show) => console.log("setShowEdit", show)}
                serviceProviderDetails={{
                  name: "",
                  mobile: 0,
                  email: "",
                  service: "",
                  location: "",
                  qualification: "",
                  expYear: 0,
                  rate: 0,
                }}
                onProfileEdit={(updatedData) =>
                  console.log("onProfileEdit", updatedData)
                }
              />
            }
          />
        </Route>

        {/* Protected Routes - Admin */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashBoard />} />
          <Route path="/admin/users-list" element={<Users />} />
          <Route
            path="/admin/serviceProviders-list"
            element={<ServiceProviders />}
          />
          <Route
            path="/admin/serviceProvider/:id"
            element={<SingleServiceProviderDetails />}
          />
          <Route path="/admin/categorys-list" element={<Category />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/blogs" element={<Blog />} />
          <Route path="/admin/add-blogs" element={<AddBlog />} />
          <Route path="/admin/add-webinars" element={<AddWebinar />} />
          <Route path="/admin/webinars" element={<ListWebinars />} />
          <Route path="/admin/complaints" element={<ComplaintsPage />} />
          <Route path="/admin/bookings" element={<AdminBookingList />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
