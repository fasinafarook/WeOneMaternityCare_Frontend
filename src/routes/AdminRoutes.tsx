import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashBoard from "../pages/AdminPages/AdminDahboard";
import Users from "../pages/AdminPages/Users";
import ServiceProviders from "../pages/AdminPages/ServiceProvider";
import SingleServiceProviderDetails from "../pages/AdminPages/SingleServiceProviderDetails";
import Category from "../pages/AdminPages/Category";
import AddCategory from "../pages/AdminPages/AddCategory";
import Blog from "../pages/AdminPages/Blog";
import AddBlog from "../pages/AdminPages/AddBlog";
import AddWebinar from "../pages/AdminPages/AddWebinars";
import ListWebinars from "../pages/AdminPages/Webinars";
import ComplaintsPage from "../pages/AdminPages/Complaint";
import AdminBookingList from "../pages/AdminPages/BookingList";
import AdminLogin from "../pages/AdminPages/adminLogin";
import { AdminProtectedRoute ,PublicAdminProtectedRoute} from "../components/PrivetProtected";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>

        

        <Route element={<PublicAdminProtectedRoute />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

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
        <Route path="/admin/complaints" element={<ComplaintsPage />} />
        <Route path="/admin/bookings" element={<AdminBookingList />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
