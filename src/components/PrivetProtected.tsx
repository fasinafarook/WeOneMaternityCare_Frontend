// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';

// const ProtectedRoute: React.FC = () => {
//     const userInfo = useSelector((state: RootState) => state.auth.userInfo);
//     return userInfo ? <Outlet /> : <Navigate to="/user/verify-login" />;
// };

// export default ProtectedRoute;

// export const AdminProtectedRoute: React.FC = () => {
//     const adminInfo = useSelector((state: RootState) => state.auth.adminInfo);
//     return adminInfo ? <Outlet /> : <Navigate to="/admin/login" />;
// };

// export const ServiceProviderProtectedRoute: React.FC = () => {
//     const serviceProviderInfo = useSelector((state: RootState) => state.auth.serviceProviderInfo);
//     return serviceProviderInfo ? <Outlet /> : <Navigate to="/serviceProvider/verify-login" />;
// };
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '../redux/store';
// Protected Route for logged-in users
export const UserProtectedRoute = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  return userInfo ? <Outlet /> : <Navigate to="/user/verify-login" />;
};

// Protected Route for logged-in service providers
export const SpProtectedRoute = () => {
  const serviceProviderInfo = useSelector((state: RootState) => state.auth.serviceProviderInfo);
  return serviceProviderInfo ? <Outlet /> : <Navigate to="/serviceProvider/verify-login" />;
};

// Protected Route for logged-in admins
export const AdminProtectedRoute = () => {
  const adminInfo = useSelector((state: RootState) => state.auth.adminInfo);
  return adminInfo ? <Outlet /> : <Navigate to="/admin/login" />;
};

// Public Route for users (only accessible when not logged in)
export const PublicUserProtectedRoute = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  return !userInfo ? <Outlet /> : <Navigate to="/user/home" />;
};

// Public Route for service providers (only accessible when not logged in)
export const PublicSpProtectedRoute = () => {
  const serviceProviderInfo = useSelector((state: RootState) => state.auth.serviceProviderInfo);
  return !serviceProviderInfo ? <Outlet /> : <Navigate to="/serviceProvider/home" />;
};

// Public Route for admins (only accessible when not logged in)
export const PublicAdminProtectedRoute = () => {
  const adminInfo = useSelector((state: RootState) => state.auth.adminInfo);
  return !adminInfo ? <Outlet /> : <Navigate to="/admin/dashboard" />;
};


