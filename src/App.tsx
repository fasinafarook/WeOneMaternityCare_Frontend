// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/Home_Page/Home';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ClientRegister from './pages/UserPages/UserRegistration';
// import OtpVerification from './pages/UserPages/otp';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Toaster } from "react-hot-toast";
// import UserLogin from './pages/UserPages/UserLogin';
// import AdminLogin from './pages/AdminPages/adminLogin';
// import ServiceProviderSignUp from './pages/ServiceProviderPages/ServiceProviderRegitration';
// import ServiceProviderOtp from './pages/ServiceProviderPages/ServiceProviderOTP';
// import ServiceProviderLogin from './pages/ServiceProviderPages/ServiceProviderLogin';
// import ServiceProviderDetails from './pages/ServiceProviderPages/ServiceProviderDetails';
// import AdminDashBoard from './pages/AdminPages/AdminDahboard';
// import ProviderPage from './pages/ServiceProviderPages/ServiceProviderDashboard';
// import ClientDashboard from './pages/UserPages/UserDashboard';
// import Users from './pages/AdminPages/Users';
// import ServiceProviders from './pages/AdminPages/ServiceProvider';
// import SingleServiceProviderDetails from "./pages/AdminPages/SingleServiceProviderDetails";
// import Profile from './pages/UserPages/Profile';
// import Category from './pages/AdminPages/Category';
// import AddCategory from './pages/AdminPages/AddCategory';
// import ApprovedProviders from './pages/UserPages/ServiceProvider';
// import ProviderDetails from './pages/UserPages/SingleProvider';


// const App: React.FC = () => {

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/user/client-register" element={<ClientRegister />} />
//         <Route path="/user/verify-otp" element={<OtpVerification />} />
//         <Route path="/user/verify-login" element={<UserLogin />} />
//         <Route path="/user/home" element={<ClientDashboard />} />
//         <Route path="/user/get-profile" element={<Profile />} />
//         <Route path="/user/service-providers" element={<ApprovedProviders />} />
//         <Route path="/user/serviceProviderDetails/:id" element={<ProviderDetails />} />








//         <Route path="/serviceProvider/serviceProvider-register" element={<ServiceProviderSignUp />} />
//         <Route path="/serviceProvider/verify-otp" element={<ServiceProviderOtp />} />
//         <Route path="/serviceProvider/verify-login" element={<ServiceProviderLogin />} />
//         <Route path="/serviceProvider/verify-details" element={<ServiceProviderDetails />} />
//         <Route path="/serviceProvider/home" element={<ProviderPage />} />






//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin/dashboard" element={<AdminDashBoard />} />
//         <Route path="/admin/users-list" element={<Users />} />
//         <Route path="/admin/serviceProviders-list" element={<ServiceProviders />} />
//         <Route path="/admin/serviceProvider/:id" element={<SingleServiceProviderDetails />} />
//         <Route path="/admin/categorys-list" element={<Category/>} />
//         <Route path="/admin/add-category" element={<AddCategory/>} />









//       </Routes>
//       <Toaster
//         position="top-center"
//         containerStyle={{
//           zIndex: 99999, 
//           top: "1rem",
//         }}
//       />
//       <ToastContainer
//         autoClose={2000}
//         theme="colored"
//         position="bottom-right"
//       />
//     </Router>
    
//   );
// };

// export default App;
// App.tsx

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Importing all pages
// import HomePage from './pages/Home_Page/Home';
// import ClientRegister from './pages/UserPages/UserRegistration';
// import OtpVerification from './pages/UserPages/otp';
// import UserLogin from './pages/UserPages/UserLogin';
// import AdminLogin from './pages/AdminPages/adminLogin';
// import ServiceProviderSignUp from './pages/ServiceProviderPages/ServiceProviderRegitration';
// import ServiceProviderOtp from './pages/ServiceProviderPages/ServiceProviderOTP';
// import ServiceProviderLogin from './pages/ServiceProviderPages/ServiceProviderLogin';
// import ServiceProviderDetails from './pages/ServiceProviderPages/ServiceProviderDetails';
// import AdminDashBoard from './pages/AdminPages/AdminDahboard';
// import ProviderPage from './pages/ServiceProviderPages/ServiceProviderDashboard';
// import ClientDashboard from './pages/UserPages/UserDashboard';
// import Users from './pages/AdminPages/Users';
// import ServiceProviders from './pages/AdminPages/ServiceProvider';
// import SingleServiceProviderDetails from "./pages/AdminPages/SingleServiceProviderDetails";
// import Profile from './pages/UserPages/Profile';
// import Category from './pages/AdminPages/Category';
// import AddCategory from './pages/AdminPages/AddCategory';
// import ApprovedProviders from './pages/UserPages/ServiceProvider';
// import ProviderDetails from './pages/UserPages/SingleProvider';




// const App: React.FC = () => {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<HomePage />} />
//       <Route path="/user/client-register" element={<ClientRegister />} />
//       <Route path="/user/verify-otp" element={<OtpVerification />} />
//       <Route path="/user/verify-login" element={<UserLogin />} />
//       <Route path="/serviceProvider/serviceProvider-register" element={<ServiceProviderSignUp />} />
//       <Route path="/serviceProvider/verify-otp" element={<ServiceProviderOtp />} />
//       <Route path="/serviceProvider/verify-login" element={<ServiceProviderLogin />} />
//       <Route path="/admin/login" element={<AdminLogin />} />

//       {/* Protected Routes - User */}
//       <Route path="/user/home" element={<ClientDashboard />} />
//       <Route path="/user/get-profile" element={<Profile />} />
//       <Route path="/user/service-providers" element={<ApprovedProviders />} />
//       <Route path="/user/serviceProviderDetails/:id" element={<ProviderDetails />} />

//       {/* Protected Routes - Service Provider */}
//       <Route path="/serviceProvider/verify-details" element={<ServiceProviderDetails />} />
//       <Route path="/serviceProvider/home" element={<ProviderPage />} />

//       {/* Protected Routes - Admin */}
//       <Route path="/admin/dashboard" element={<AdminDashBoard />} />
//       <Route path="/admin/users-list" element={<Users />} />
//       <Route path="/admin/serviceProviders-list" element={<ServiceProviders />} />
//       <Route path="/admin/serviceProvider/:id" element={<SingleServiceProviderDetails />} />
//       <Route path="/admin/categorys-list" element={<Category />} />
//       <Route path="/admin/add-category" element={<AddCategory />} />
//     </Routes>
//   );
// };

// export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Importing all pages
import HomePage from './pages/Home_Page/Home';
import ClientRegister from './pages/UserPages/UserRegistration';
import OtpVerification from './pages/UserPages/otp';
import UserLogin from './pages/UserPages/UserLogin';
import AdminLogin from './pages/AdminPages/adminLogin';
import ServiceProviderSignUp from './pages/ServiceProviderPages/ServiceProviderRegitration';
import ServiceProviderOtp from './pages/ServiceProviderPages/ServiceProviderOTP';
import ServiceProviderLogin from './pages/ServiceProviderPages/ServiceProviderLogin';
import ServiceProviderDetails from './pages/ServiceProviderPages/ServiceProviderDetails';
import AdminDashBoard from './pages/AdminPages/AdminDahboard';
import ProviderPage from './pages/ServiceProviderPages/ServiceProviderDashboard';
import ClientDashboard from './pages/UserPages/UserDashboard';
import Users from './pages/AdminPages/Users';
import ServiceProviders from './pages/AdminPages/ServiceProvider';
import SingleServiceProviderDetails from './pages/AdminPages/SingleServiceProviderDetails';
import Profile from './pages/UserPages/Profile';
import Category from './pages/AdminPages/Category';
import AddCategory from './pages/AdminPages/AddCategory';
import ApprovedProviders from './pages/UserPages/ServiceProvider';
import ProviderDetails from './pages/UserPages/SingleProvider';
import SlotsList from './pages/ServiceProviderPages/ProviderSlotLists';
import AddSlot from './pages/ServiceProviderPages/ProviderAddSlot';
import ProviderAndSlotDetails from './pages/UserPages/ProviderAndSolots';
import PaymentSuccess from './pages/UserPages/PaymentSuccess';
import PaymentFailed from './pages/UserPages/PaymentFailed';
import OutsourcedBookings from './pages/UserPages/BookingsList';
import ScheduledBookings from './pages/ServiceProviderPages/ScheduledBookings';
import PaymentsDashboard from './pages/ServiceProviderPages/PayementPage';
import Blog from './pages/AdminPages/Blog';
import AddBlog from './pages/AdminPages/AddBlog';
import AddWebinar from './pages/AdminPages/AddWebinars';
import ListWebinars from './pages/AdminPages/Webinars';
import WebinarsList from './pages/UserPages/Webinars';
import BlogList from './pages/UserPages/Blogs';
import Wallet from './pages/UserPages/Wallet';

// Import ProtectedRoute HOC
import ProtectedRoute, { AdminProtectedRoute, ServiceProviderProtectedRoute } from './components/PrivetProtected';

const App: React.FC = () => {
    return (
        <>
            <ToastContainer />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/user/client-register" element={<ClientRegister />} />
                <Route path="/user/verify-otp" element={<OtpVerification />} />
                <Route path="/user/verify-login" element={<UserLogin />} />
                <Route path="/serviceProvider/serviceProvider-register" element={<ServiceProviderSignUp />} />
                <Route path="/serviceProvider/verify-otp" element={<ServiceProviderOtp />} />
                <Route path="/serviceProvider/verify-login" element={<ServiceProviderLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/webinars" element={<WebinarsList />} />
                <Route path="/blogs" element={<BlogList />} />

                {/* Protected Routes - User */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/user/home" element={<ClientDashboard />} />
                    <Route path="/user/get-profile" element={<Profile />} />
                    <Route path="/user/service-providers" element={<ApprovedProviders />} />
                    <Route path="/user/serviceProviderDetails/:id" element={<ProviderDetails />} />
                    <Route path="/user/get-service-providers-slots-details/:serviceProviderId" element={<ProviderAndSlotDetails />} />
                    <Route path="/user/payment-success" element={<PaymentSuccess />} />
                    <Route path="/user/payment-failed" element={<PaymentFailed />} />
                    <Route path="/user/get-scheduled-Bookings" element={<OutsourcedBookings />} />
                    <Route path="/user/wallet" element={<Wallet />} />



                </Route>

                {/* Protected Routes - Service Provider */}
                <Route element={<ServiceProviderProtectedRoute />}>
                    <Route path="/serviceProvider/verify-details" element={<ServiceProviderDetails />} />
                    <Route path="/serviceProvider/home" element={<ProviderPage />} />
                    <Route path="/serviceProvider/get-slots" element={<SlotsList />} />
                    <Route path="/serviceProvider/add-slot" element={<AddSlot />} />
                    <Route path="/serviceProvider/get-scheduled-bookings" element={<ScheduledBookings />} />
                    <Route path="/serviceProvider/getPaymentDashboardDetails" element={<PaymentsDashboard />} />
                </Route>

                {/* Protected Routes - Admin */}
                <Route element={<AdminProtectedRoute />}>
                    <Route path="/admin/dashboard" element={<AdminDashBoard />} />
                    <Route path="/admin/users-list" element={<Users />} />
                    <Route path="/admin/serviceProviders-list" element={<ServiceProviders />} />
                    <Route path="/admin/serviceProvider/:id" element={<SingleServiceProviderDetails />} />
                    <Route path="/admin/categorys-list" element={<Category />} />
                    <Route path="/admin/add-category" element={<AddCategory />} />
                    <Route path="/admin/blogs" element={<Blog />} />
                    <Route path="/admin/add-blogs" element={<AddBlog />} />
                    <Route path="/admin/add-webinars" element={<AddWebinar />} />
                    <Route path="/admin/webinars" element={<ListWebinars />} />


                </Route>
            </Routes>
        </>
    );
};

export default App;
