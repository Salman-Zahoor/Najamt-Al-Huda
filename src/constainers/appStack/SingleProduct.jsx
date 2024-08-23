import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo2 from "../../assets/logo2.png";
import UAE from "../../assets/uae.png";
import ENGLISH from "../../assets/english.png";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HorizontalLinearStepper from "../../components/Stepper";
import { getSingleServiceData } from "../../services/products/Products";

const SingleProduct = () => {
  const {id} = useParams();
  const [singlePageData, setSinglePageData] = useState([]);
  
  useEffect(()=>{
    getSingleServiceData(id).then((res)=>{
      console.log(res, 'sadsad')
      if(res?.status === 200){
        let data = res?.data?.data;
         setSinglePageData(data)
      }
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  return (
    <>
      <div className="top-navbar bg-dark">
        <div className="container-fluid">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-4">
              <div className="date">
                <small className="text-white">
                  MON – SAT: 7.00–18.00 <span className="m-2">/</span> SUNDAY:
                  CLOSED
                </small>
              </div>
            </div>
            <div className="col-md-8 text-end">
              <div className="social-icons d-flex align-items-center justify-content-end gap-3 text-white">
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-x-twitter"></i>
                <i class="fa-brands fa-behance"></i>
                <i class="fa-brands fa-instagram"></i>
                <div className="book-now border-left">
                  {/* <Buttons
          name="Book Now"
          className="book-app"
          /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg p-3">
        <div class="container">
          <Link class="navbar-brand" to="/">
            <img src={logo2} alt="logo" className="site_logo" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  class="nav-link active text-dark"
                  aria-current="page"
                  to="/"
                >
                  HOME
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link text-dark" to="/services">
                  SERVICES
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link text-dark" to="/services">
                  TEAM
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link text-dark" to="/about-us">
                  ABOUT
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link text-dark" to="#">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
          <div class="dropdown d-none">
            <button
              class="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={UAE} alt="UAE-Flag" className="uae-flag" />
            </button>
            <ul
              class="dropdown-menu lang-change"
              aria-labelledby="dropdownMenuButton1"
            >
              <li className="lan-menu">
                <a class="dropdown-item" href="#">
                  <img src={UAE} alt="UAE-Flag" className="uae-flag m-2" />
                  UAE
                </a>
              </li>
              <li className="lan-menu">
                <a class="dropdown-item" href="#">
                  <img src={ENGLISH} alt="UK-Flag" className="uae-flag m-2" />
                  ENG
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* SINGLE PAGE */}
      <div className="single-page-container section-height p-5">
        <div className="container single-page-background">
          <div className="row">
            <div className="col-md-8">
              <Container className="">
                <Box
                  sx={{ 
                    bgcolor: "#E9BEC4",
                    borderRadius: "10px",
                    height: "89vh",
                  }}
                  className="p-4 scrollable"
                >
                  <HorizontalLinearStepper singlePageData={singlePageData}/>
                </Box>
              </Container>
            </div>
            <div className="col-md-4">
            <div className="row">
                <div className="col-md-12">
                <div className="price-card p-3" style={{minHeight:'30%', overflowY:'scroll'}}>
                  <h4  className="">Include Services : </h4>
                  <div className="text-start d-flex align-items-center justify-content-start flex-column" >
                    {singlePageData?.features?.length > 0 ?  (
                      singlePageData?.features?.map((item, index)=>{
                        <span>{item?.feature}</span>
                      })
                    ) : (
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="mb-5">Not Found</span>
                        </div>
                    )}
                  </div>
                </div>
                <div className="price-card p-3 mt-3">
                  <h4>Booking Details</h4>
                  {/* <div className="user-address mt-3 d-flex align-items-center justify-content-between">
                    <p className="fw-bold">Address</p> 
                    <p className="w-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quo?</p>
                  </div> */}
                  <div className="selected-service mt-4 d-flex align-items-center justify-content-between">
                  <p className="fw-bold">Service</p> 
                    <p className="w-50">{singlePageData?.name}</p>
                  </div>
                </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="price-card price__card p-3"> 
                    <h4>Payment Summary</h4>
                    <div className="user-address mt-3 d-flex align-items-center justify-content-between">
                      <p className="fw-bold">Total</p>
                      <p className="w-50 fw-bold text-end">AED {singlePageData.price}</p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
