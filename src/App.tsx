import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import useSocket from "./hooks/useSocket";
import UserRoutes from "./routes/UserRoutes";
import ServiceProviderRoutes from "./routes/ServiceProviderRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import PublicRoutes from "./routes/public";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  useSocket();

  return (
    <Routes>
      {/* User, Service Provider, and Admin routes */}
      <Route path="/*" element={
        <>
          <UserRoutes />
          <ServiceProviderRoutes />
          <AdminRoutes />
        </>
      } />

      {/* Public routes */}
      <Route path="/" element={<PublicRoutes />} />
    </Routes>
  );
};

export default App;
