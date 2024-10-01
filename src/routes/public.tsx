import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home_Page/Home";
import NotFound from "../components/common_pages/NotFoundPage";

const PublicRoutes: React.FC = () => {
    return (
      <Routes>

<Route path="/" element={<HomePage />} />
<Route path="*" element={<NotFound />} />

</Routes>
  );
};

export default PublicRoutes;
