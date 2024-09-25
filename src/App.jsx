import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Login from './constainers/appStack/admin/Login.jsx'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Dashboard from './constainers/appStack/admin/Dashboard.jsx'
import Home from './constainers/appStack/Home'
import Services from './constainers/appStack/Services'
import AppProvider from "./context/index"
import SingleProduct from './constainers/appStack/SingleProduct'
import AboutUs from './constainers/appStack/AboutUs'
import Team from './constainers/appStack/Team'
import Contact from './constainers/appStack/Contact'
import { AuthRoutes } from './routes/authroutes.jsx'
import Employees from './constainers/appStack/admin/Employees.jsx'
import Help from './constainers/appStack/Help.jsx'
import Privacy from './constainers/appStack/Privacy.jsx'
import ServicesAdmin from "./constainers/appStack/admin/ServicesAdmin.jsx"
import Category from "./constainers/appStack/admin/Category.jsx"


function App() {
   const location = useLocation();

   const theme = createTheme({
    typography: {
      fontFamily: [
        "Lato",
        "sans-serif",
        // '"Apple Color Emoji"',
        // '"Segoe UI Emoji"',
        // '"Segoe UI Symbol"',
      ].join(","),
    },
    button: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
  });
   const isNavbarVisible = location.pathname !== '/admin/login' && location.pathname !== '/'
  return (
    <ThemeProvider theme={theme}>
    <AppProvider>
       {/* {isNavbarVisible &&       <Navbar/>} */}
        <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/about-us' element={<AboutUs/>}/>
      <Route path='/team' element={<Team/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/products/:id' element={<SingleProduct/>}/>
      <Route path='/help&support' element={<Help/>}/>
      <Route path='/privacy&policy' element={<Privacy/>}/>

      {/* Dashboard Routes */}
      <Route path='admin/login' element={<Login/>}/>
      <Route path="/" element={<AuthRoutes />}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/employees' element={<Employees/>}/>
      <Route path='/adminServices' element={<ServicesAdmin/>}/>
      <Route path='/category' element={<Category/>}/>
      </Route>
    </Routes>
    <Footer/>
    </AppProvider>

     </ThemeProvider>
  )
}
export default App