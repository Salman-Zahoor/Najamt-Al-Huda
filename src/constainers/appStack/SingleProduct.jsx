import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../../assets/logo2.png";
import UAE from "../../assets/uae.png";
import ENGLISH from "../../assets/english.png";
import massage from "../../assets/massage.jpg";


const SingleProduct = () => {
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
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="product-image bg-danger">
                      <img src={massage} alt="massage" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="single-product-content">
                        
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
