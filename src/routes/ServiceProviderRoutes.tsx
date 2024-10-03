import React from "react";
import { Routes, Route } from "react-router-dom";
import ProviderDashboard from "../pages/ServiceProviderPages/ServiceProviderDashboard";
import SlotsList from "../pages/ServiceProviderPages/ProviderSlotLists";
import AddSlot from "../pages/ServiceProviderPages/ProviderAddSlot";
import ScheduledBookings from "../pages/ServiceProviderPages/ScheduledBookings";
import PaymentsDashboard from "../pages/ServiceProviderPages/PayementPage";
import ProfileManagement from "../pages/ServiceProviderPages/ProfileManagement";
import ProviderVideoCall from "../pages/ServiceProviderPages/ProviderVideo";
import EditSlot from "../pages/ServiceProviderPages/EditSlot";
import ServiceProviderDetails from "../pages/ServiceProviderPages/ServiceProviderDetails";
import ServiceProviderOtp from "../pages/ServiceProviderPages/ServiceProviderOTP";
import SericeProviderLogin from "../pages/ServiceProviderPages/ServiceProviderLogin";
import ServiceProviderSignUp from "../pages/ServiceProviderPages/ServiceProviderRegitration";
import ForgotPasswords from "../pages/ServiceProviderPages/ForgetPassword";
import About from "../components/common_pages/About";
import { SpProtectedRoute,PublicSpProtectedRoute } from "../components/PrivetProtected";

const ServiceProviderRoutes: React.FC = () => {
  return (
    <Routes>
         <Route element={<PublicSpProtectedRoute />}>
        
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
          element={<SericeProviderLogin />}
        />

        <Route
          path="/serviceProvider/forgot-password"
          element={<ForgotPasswords />}
        />

        </Route>


      <Route element={<SpProtectedRoute />}>
        <Route path="/serviceProvider/home" element={<ProviderDashboard />} />
        <Route
          path="/serviceProvider/verify-details"
          element={<ServiceProviderDetails />}
        />
        <Route path="/serviceProvider/about" element={<About />} />
        <Route path="/serviceProvider/get-slots" element={<SlotsList />} />
        <Route path="/serviceProvider/add-slot" element={<AddSlot />} />
        <Route path="/serviceProvider/get-scheduled-bookings" element={<ScheduledBookings />} />
        <Route path="/serviceProvider/getPaymentDashboardDetails" element={<PaymentsDashboard />} />
        <Route path="/serviceProvider/edit-slot/:slotId" element={<EditSlot />} />
        <Route path="/video-call/:roomId/:serviceProviderId" element={<ProviderVideoCall />} />
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
    </Routes>
  );
};

export default ServiceProviderRoutes;
