

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";
import store from './redux/store.ts';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import App from './App.tsx';
import './index.css';
import { setupInterceptors } from "./Services/axios.ts";

// AppWrapper is used to inject navigation into axios interceptors
const AppWrapper = () => {
  const navigate = useNavigate();
  setupInterceptors(navigate);
  return <App />;
};

// Rendering the application
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<AppWrapper />} />
          </Routes>
        </Router>
      </ThemeProvider>
      <Toaster
        position="top-center"
        containerStyle={{
          zIndex: 99999, // Very high z-index
          top: "1rem",
        }}
      />
    </React.StrictMode>
  </Provider>
);
