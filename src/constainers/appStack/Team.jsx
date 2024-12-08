import React from "react";
import Navbar from "../../components/Navbar";
import p1 from "../../assets/p1.jpg";
import p2 from "../../assets/p2.jpg";
import p3 from "../../assets/p3.jpg";
import p4 from "../../assets/p4.jpg";
import p5 from "../../assets/p5.jpg";
import p6 from "../../assets/p6.jpg";
import about1 from "../../assets/about1.jpg";
import about2 from "../../assets/about2.jpg";
import {
    Avatar
  } from "@mui/material";
import AboutContainer from "../../components/AboutContainer";
import TeamContainer from "../../components/TeamContainer";

const Team = () => {
  return (
    <>
      <div className="about-page-container">
        <div className="hero-container">
          <Navbar />
          <div className="about-hero-content d-flex align-items-center justify-content-center flex-column">
            <div className="container">
              <div className="row ">
                <div className="col-md-6 flex-column text-white">
                  <h1 className="mt-5 our-pro-head" data-aos="fade-down"  data-aos-duration="500" >OUR PROFESSIONALS</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TeamContainer/>
     <AboutContainer/>
    </>
  );
};

export default Team;
