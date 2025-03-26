import { MantineProvider } from "@mantine/core";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUsernameFromToken } from "../helper";
import Index from "./Component/CropAdvisoryBot/Index";
import HomePage from "./Component/HomePage/HomePage";
import AuthPage from "./Component/Auth/AuthPage";
import ListingForm from "./Component/ListProductForm/ListingForm";
import Navbar from "./Component/Navbar/Navbar";
import Sidebar from "./Component/Dashboard/Sidebar";
import Dashboard from "./Component/Dashboard/Dashboard";
import CropListingPage from "./Component/MarketPlace/CropListingPage";
import {CropDetailPage} from "./Component/MarketPlace/CropDetailPage";
import WeatherDashboard from "./Component/Weather/WeatherDashboard";
import ColdStoragePage from "./Component/ColdStorage/ColdStorage";
import MyListing from "./Component/MyProducts/MyListing";
import MyOrders from "./Component/MyOrders/MyOrders";
import Contracts from "./Component/MyContracts/MyContracts";

function App() {
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!getUsernameFromToken();
    return true ? children : <Navigate to="/auth" />;
  };

  const PublicRoute = ({ children }) => {
    const isAuthenticated = !!getUsernameFromToken();
    return isAuthenticated ? <Navigate to="/dashboard" /> : children;
  };

  return (
    <MantineProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <div className="flex flex-col h-screen font-poppins">
                <Navbar />
                <div className="flex flex-1 relative">
                  <Sidebar />
                  <main className="flex-1 ml-16 md:ml-0">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/crop-advisory" element={<Index />} />
                      <Route path="/list-product" element={<ListingForm />} />
                      <Route path="/crops" element={<CropListingPage />} />
                      <Route path="/crop/:id" element={<CropDetailPage />} />
                      <Route path="/weather" element={<WeatherDashboard />} />
                      <Route
                        path="/cold-storage"
                        element={<ColdStoragePage />}
                      />
                      <Route path="/my-listing" element={ <MyListing /> } />
                      <Route path="/my-orders" element={<MyOrders />} />
                      <Route path="/my-contracts" element={<Contracts />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </MantineProvider>
  );
}

export default App;
