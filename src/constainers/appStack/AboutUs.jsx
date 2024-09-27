import React from 'react';
import Navbar from '../../components/Navbar';
import about1 from "../../assets/about1.jpg";
import about2 from "../../assets/about2.jpg";
import AboutContainer from '../../components/AboutContainer';
import CountUp from 'react-countup';

const AboutUs = () => {
  return (
    <>
      <div className="about-page-container">
        <div className="hero-container">
          <Navbar />
          <div className="about-hero-content d-flex align-items-center justify-content-center flex-column">
            <div className="container">
              <div className="row">
                <div className="col-md-6 flex-column text-white">
                  <h1 className="mt-5" data-aos="fade-down" data-aos-duration="500">ABOUT US</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Section */}
      <div className="counter mb-5">
        <div className="container counter-container p-4">
          <div className="row">
            <div className="col-md-3">
              <div className="count count-bar text-center">
                <h2 className='fw-bold'>
                  <CountUp start={0} end={10} duration={3} suffix="+" />
                </h2>
                <p className='location'>YEARS OF EXPERIENCE</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="count count-bar text-center">
                <h2 className='fw-bold'>
                  <CountUp start={0} end={24} duration={3} />
                </h2>
                <p className='location'>HAIRDRESSERS</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="count count-bar text-center">
                <h2 className='fw-bold'>
                  <CountUp start={0} end={430} duration={3} suffix="+" />
                </h2>
                <p className='location'>SERVICES COMPLETED</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="count text-center">
                <h2 className='fw-bold'>
                  <CountUp start={0} end={300} duration={3} suffix="+" />
                </h2>
                <p className='location'>HAPPY CUSTOMERS</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AboutContainer />

      {/* Mission and Vision */}
      <div className="mission mt-5 section-height d-flex align-items-center justify-content-center ">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-12 col-md-6">
              <div className="our-mission bg-white text-center d-flex align-items-center justify-content-center flex-column">
                <i className="fa-brands fa-space-awesome mission-icon mb-3 location"></i>
                <h2>Our Mission</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              </div>
            </div>
            <div className="col-md-6 our-vision text-center bg-white d-flex align-items-center justify-content-center flex-column">
              <i className="fa-solid fa-lightbulb mission-icon mb-3 location"></i>
              <h2>Our Vision</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-us section-height d-flex align-items-center justify-content-center flex-column">
        <div className="heading mx-auto text-center">
          <span className="reveal-text">WHY CHOOSE US</span>
          <h2 className="fw-bold">THERE ARE SO MANY REASONS TO LOVE NAJAMT-UL-HUDA!</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
        <div className="why-us-container mt-3">
          <div className="container">
            <div className="row">
              {/* Repeat for each card */}
              <div className="col-md-3">
                <div className="our-card p-3 text-center d-flex align-items-center justify-content-center flex-column">
                  <i className="fa-solid fa-star location"></i>
                  <h5 className="fw-bold">Top rated professionals</h5>
                  <p>Our professionals are reliable & well-trained, with an average rating of 4.78 out of 5!</p>
                </div>
              </div>
              {/* More cards */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
