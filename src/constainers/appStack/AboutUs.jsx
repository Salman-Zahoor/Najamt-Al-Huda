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
                <p className='location fw-bold'>YEARS OF EXPERIENCE</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="count count-bar text-center">
                <h2 className='fw-bold'>
                  <CountUp start={0} end={24} duration={3} />
                </h2>
                <p className='location fw-bold'>HAIRDRESSERS</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="count count-bar text-center">
                <h2 className='fw-bold'>
                  <CountUp start={0} end={430} duration={3} suffix="+" />
                </h2>
                <p className='location fw-bold'>SERVICES COMPLETED</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="count text-center">
                <h2 className='fw-bold'>
                  <CountUp start={0} end={300} duration={3} suffix="+" />
                </h2>
                <p className='location fw-bold'>HAPPY CUSTOMERS</p>
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nisi autem molestias, modi vitae commodi veniam inventore doloremque dignissimos consequatur, vel excepturi, incidunt recusandae velit necessitatibus odit. Ex cumque est quibusdam, veniam optio, consectetur ipsum quis fugit praesentium laboriosam quas itaque dolor. Vero temporibus id et excepturi illo voluptatibus animi.</p>
              </div>
            </div>
            <div className="col-md-6 our-vision text-center bg-white d-flex align-items-center justify-content-center flex-column">
              <i className="fa-solid fa-lightbulb mission-icon mb-3 location"></i>
              <h2>Our Vision</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis consequuntur molestiae voluptatem facere maxime commodi possimus ducimus? Dicta est asperiores iure molestias necessitatibus pariatur possimus ex facere fugit maiores, cumque voluptatum sed placeat quaerat consectetur rem laboriosam dolore cum nam tenetur repellendus veniam doloremque doloribus. Esse in cupiditate quibusdam pariatur!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
