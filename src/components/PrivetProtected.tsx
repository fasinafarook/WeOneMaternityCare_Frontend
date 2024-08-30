import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ProtectedRoute: React.FC = () => {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    return userInfo ? <Outlet /> : <Navigate to="/user/verify-login" />;
};

export default ProtectedRoute;

export const AdminProtectedRoute: React.FC = () => {
    const adminInfo = useSelector((state: RootState) => state.auth.adminInfo);
    return adminInfo ? <Outlet /> : <Navigate to="/admin/login" />;
};

export const ServiceProviderProtectedRoute: React.FC = () => {
    const serviceProviderInfo = useSelector((state: RootState) => state.auth.serviceProviderInfo);
    return serviceProviderInfo ? <Outlet /> : <Navigate to="/serviceProvider/verify-login" />;
};
