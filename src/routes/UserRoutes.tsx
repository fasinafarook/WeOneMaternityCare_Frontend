import React from "react";
import { Routes, Route } from "react-router-dom";
import ClientRegister from "../pages/UserPages/UserRegistration";
import OtpVerification from "../pages/UserPages/otp";
import UserLogin from "../pages/UserPages/UserLogin";
import ApprovedProviders from "../pages/UserPages/ServiceProvider";
import ProviderDetails from "../pages/UserPages/SingleProvider";
import ProviderAndSlotDetails from "../pages/UserPages/ProviderAndSolots";
import PaymentSuccess from "../pages/UserPages/PaymentSuccess";
import PaymentFailed from "../pages/UserPages/PaymentFailed";
import OutsourcedBookings from "../pages/UserPages/BookingsList";
import Wallet from "../pages/UserPages/Wallet";
import Chat from "../pages/UserPages/Chat";
import ComplaintsList from "../pages/UserPages/AllComplaints";
import Profile from "../pages/UserPages/Profile";
import FileComplaint from "../pages/UserPages/Complaint";
import About from "../components/common_pages/About";
import ForgotPassword from "../pages/UserPages/ForgetPassword";
import ClientDashboard from "../pages/UserPages/UserDashboard";
import BlogList from "../pages/UserPages/Blogs";
import WebinarsList from "../pages/UserPages/Webinars";
import UserVideoCall from "../pages/UserPages/videoCall";
import { UserProtectedRoute, PublicUserProtectedRoute } from "../components/PrivetProtected";

const UserRoutes: React.FC = () => {
  return (
    <Routes>

        
      <Route element={<PublicUserProtectedRoute />}>
        <Route path="/user/client-register" element={<ClientRegister />} />
        <Route path="/user/verify-otp" element={<OtpVerification />} />
        <Route path="/user/verify-login" element={<UserLogin />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route element={<UserProtectedRoute />}>
        <Route path="/user/home" element={<ClientDashboard />} />
        <Route path="/webinars" element={<WebinarsList />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/user/about" element={<About />} />
        <Route path="/user/get-profile" element={<Profile />} />
        <Route path="/user/service-providers" element={<ApprovedProviders />} />
        <Route path="/user/serviceProviderDetails/:id" element={<ProviderDetails />} />
        <Route path="/user/get-service-providers-slots-details/:serviceProviderId" element={<ProviderAndSlotDetails />} />
        <Route path="/user/payment-success" element={<PaymentSuccess />} />
        <Route path="/user/payment-failed" element={<PaymentFailed />} />
        <Route path="/user/get-scheduled-Bookings" element={<OutsourcedBookings />} />
        <Route path="/user/wallet" element={<Wallet />} />
        <Route path="/user/messages" element={<Chat />} />
        <Route path="/user/new-complaint" element={<FileComplaint />} />
        <Route path="/user/complaints" element={<ComplaintsList />} />
        <Route
            path="/user/video-call/:roomId/:userId"
            element={<UserVideoCall></UserVideoCall>}
          />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
