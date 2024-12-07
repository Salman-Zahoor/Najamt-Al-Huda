import React, { lazy, useState, useEffect, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import AppProvider from "./context/index";
import Loader from "./components/Loader.jsx";

const Home = lazy(() => import("./constainers/appStack/Home"));
const Services = lazy(() => import("./constainers/appStack/Services"));
const AboutUs = lazy(() => import("./constainers/appStack/AboutUs"));
const Contact = lazy(() => import("./constainers/appStack/Contact"));
const Team = lazy(() => import("./constainers/appStack/Team"));
const Dashboard = lazy(() => import("./constainers/appStack/admin/Dashboard.jsx"));
const Login = lazy(() => import("./constainers/appStack/admin/Login.jsx"));
const SingleProduct = lazy(() => import("./constainers/appStack/SingleProduct"));
const Bookings = lazy(() => import("./constainers/appStack/admin/Bookings.jsx"));
const Category = lazy(() => import("./constainers/appStack/admin/Category.jsx"));
const Employees = lazy(() => import("./constainers/appStack/admin/Employees.jsx"));
const ServicesAdmin = lazy(() => import("./constainers/appStack/admin/ServicesAdmin.jsx"));
const Help = lazy(() => import("./constainers/appStack/Help.jsx"));
const Privacy = lazy(() => import("./constainers/appStack/Privacy.jsx"));

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
  });

  const footerRoutes = [
    "/",
    "/services",
    "/about-us",
    "/team",
    "/contact",
    "/products/:id",
    "/help&support",
    "/privacy&policy",
  ];
  const isFooterVisible = footerRoutes.includes(location.pathname);

  useEffect(() => {
    // Set loading to true on route change
    setLoading(true);

    const timeout = setTimeout(() => {
      // Set loading to false after a delay to simulate loading
      setLoading(false);
    }, 500); // Adjust delay based on your needs

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        {loading ? (
          <Loader />
        ) : (
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/help&support" element={<Help />} />
              <Route path="/privacy&policy" element={<Privacy />} />

              {/* Dashboard Routes */}
              <Route path="admin/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/adminServices" element={<ServicesAdmin />} />
              <Route path="/category" element={<Category />} />
              <Route path="/bookings" element={<Bookings />} />
            </Routes>
            {isFooterVisible && <Footer />}
          </Suspense>
        )}
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
