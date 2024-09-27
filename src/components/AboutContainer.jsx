import React from 'react'
import about1 from "../assets/about1.webp";
import about2 from "../assets/about2.webp";
import Buttons from "../components/Buttons";
import { Link } from 'react-router-dom';

const AboutContainer = () => {
  return (
    <>
      <div className="about-container d-flex align-items-center justify-content-center section-height">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="about-content">
                <div className="heading">
                  <span className="reveal-text ">KNOW MORE</span>
                  <h2 className="fw-bold" data-aos="fade-right" >ABOUT US</h2>
                </div>
                <p className="mt-3" data-aos="fade-right"  >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia consectetur, doloremque ut assumenda commodi sint
                  accusantium sunt quibusdam optio consequatur odio error
                  excepturi, aliquam in eligendi illum architecto unde!
                  Accusamus unde, dicta ab nesciunt quia dignissimos obcaecati
                  eaque fugit commodi molestiae architecto repellendus, odit, at
                  enim fuga nobis a saepe dolores voluptatem adipisci
                  cupiditate. Molestiae accusantium illum tempora nihil, nostrum
                  ipsam eligendi consequuntur rerum architecto quasi dolores
                  voluptas, deleniti placeat.
                </p>
                <Link class="nav-link" to="/about-us" data-aos="fade-right"  ><Buttons name="About Us" className="about-btn" /></Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="about-image" data-aos="zoom-in" >
                <img src={about1} alt="" className="w-100 rounded-img" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="about-image" data-aos="zoom-in" >
                <img src={about2} alt="" className="w-100 rounded-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutContainer