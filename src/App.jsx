import React, { lazy, useState, useEffect, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import AppProvider from "./context/index";
import Loader from "./components/Loader.jsx";
import 'aos/dist/aos.css';
import Aos from "aos";

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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  useEffect(()=> {

    setIsLoading(true)
  },[isLoading])

  const theme = createTheme({
    typography: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
  });


  const adminRoutes = [
    "/dashboard",
    "/employees",
    "/adminServices",
    "/category",
    "/bookings",
    "admin/login",
  ];

  const isFooterVisible = !adminRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
 

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Suspense fallback={<Loader isLoading={isLoading}/>}>
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
        </Suspense>
        {isFooterVisible && <Footer />}
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
