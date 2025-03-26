import { MantineProvider } from "@mantine/core";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUsernameFromToken } from "./helper";
import Index from "./Component/CropAdvisoryBot/Index";

function App() {
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!getUsernameFromToken();
    return isAuthenticated ? children : <Navigate to="/auth" />;
  };

  const PublicRoute = ({ children }) => {
    const isAuthenticated = !!getUsernameFromToken();
    return isAuthenticated ? <Navigate to="/dashboard" /> : children;
  };
  return (
    <MantineProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
