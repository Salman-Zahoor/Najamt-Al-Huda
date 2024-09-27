import React from 'react'
import {
    Avatar
  } from "@mui/material";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";

const TeamContainer = () => {
  return (
   <>
     <div className="team-container section-height d-flex align-items-center justify-content-center flex-column">
        <div className="heading mx-auto text-center">
          <span className="reveal-text ">TEAM</span>
          <h2 className="fw-bold" data-aos="fade-down"  data-aos-duration="500">OUR PROFESSIONALS</h2>
          <p data-aos="fade-down"  data-aos-duration="700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            aperiam <br />
            earum odio mollitia ad error!
          </p>
        </div>
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-4">
              <div className="team-cards">
               <div className="imagesss text-center m-auto">
               <Avatar
              alt="Remy Sharp"
              src={p1}
              className="m-auto team_pic"
              sx={{ width: 150, height: 150 }}
            />
               </div>
                <h4 className="text-center mt-3">SARA</h4>
                <p className="text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, provident?</p>
                <div className="stars d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-cards">
               <div className="imagesss text-center m-auto">
               <Avatar
              alt="Remy Sharp"
              src={p2}
              className="m-auto team_pic"
              sx={{ width: 150, height: 150 }}
            />
               </div>
                <h4 className="text-center mt-3">ELIZABETH</h4>
                <p className="text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, provident?</p>
                <div className="stars d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-cards">
               <div className="imagesss text-center m-auto">
               <Avatar
              alt="Remy Sharp"
              src={p3}
              className="team_pic m-auto"
              sx={{ width: 150, height: 150 }}
            />
               </div>
                <h4 className="text-center mt-3">JESSICA</h4>
                <p className="text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, provident?</p>
                <div className="stars d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
            
            
            
          </div>
          <div className="row mt-3 d-none">
            <div className="col-md-4">
              <div className="team-profile mx-auto text-center">
                <img src={p4} alt="team" className="pro-1" />
              </div>
              <div className="team-content text-center mt-3">
              <h4>SARA</h4>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi, voluptate!</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-profile mx-auto text-center">
                <img src={p5} alt="team" className="pro-1" />
              </div>
              <div className="team-content text-center mt-3">
              <h4>SARA</h4>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi, voluptate!</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-profile mx-auto text-center">
                <img src={p6} alt="team" className="pro-1" />
              </div>
              <div className="team-content text-center mt-3">
              <h4>SARA</h4>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi, voluptate!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default TeamContainer