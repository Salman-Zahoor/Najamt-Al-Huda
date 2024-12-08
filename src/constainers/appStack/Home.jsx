import {
  Avatar
} from "@mui/material";

import React, { useEffect, useState } from "react";
import about1 from "../../assets/about1.webp";
import about2 from "../../assets/about2.webp";
import p1 from "../../assets/p1.webp";
import p2 from "../../assets/p2.webp";
import p3 from "../../assets/p3.webp";
import p4 from "../../assets/p4.jpg";
import p5 from "../../assets/p5.jpg";
import p6 from "../../assets/p6.jpg";
import Buttons from "../../components/Buttons";
import Navbar from "../../components/Navbar";
import ServiceSection from "../../components/ServiceSection";
// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import hair from "../../assets/head.jpg";
import skin from "../../assets/skin.jpg";
import massage from "../../assets/massage.jpg";
import TextFeilds from "../../components/TextFeilds";
import TextField from '@mui/material/TextField';
import offer from "../../assets/offer.jpg"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AboutContainer from "../../components/AboutContainer";
import ServiceContainer from "../../components/ServiceContainer";
import WhyChooseUsContainer from "../../components/WhyChooseUsContainer";
import TeamContainer from "../../components/TeamContainer";
import Loader from "../../components/Loader";
import ContactUsForm from "../../components/ContactUsForm";


const Home = (args) => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggle = () => setModal(!modal);

  // useEffect(()=>{
  //   setModal(true)
  //   const seenModal = localStorage.getItem('seenModal')
  //   if(seenModal){
  //     setModal(false)
  //   }else{
  //     localStorage.setItem('seenModal')
  //   }
  // },[])

   
  useEffect(()=>{
    setIsLoading(true)
  },[isLoading])
  return (
    <>
    {isLoading && <Loader/>}
      <div className="home-container">
        <div className="hero-container">
          <Navbar />
          <div className="hero-content d-flex align-items-center justify-content-center flex-column" data-aos="fade-down" data-aos-duration="1500">
            <div className="container">
              <div className="row ">
                <div className="col-md-6 flex-column text-white">
                  <h1 className="reveal-text">Najamt Al Huda </h1>
                  <h1 className="fs-2" data-aos="fade-down"  data-aos-duration="800" data-aos-delay="300">
                    Women's Salon & Beauty <br /> Services At Home In The UAE
                  </h1>
                  <Link class="nav-link text-white" to="/services" data-aos="fade-down"  data-aos-duration="800" data-aos-delay="500"> <Buttons name="Services" className="book-app mt-3" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* ABOUT CONTAINER */}
    <AboutContainer/>

     {/* SERVICE CONTAINER */}
     <ServiceContainer/>
      
      {/* WHY CHOOSE US CONTAINER */}
      <WhyChooseUsContainer/>

{/* TEAM CONTAINER */}
<TeamContainer/>
      

      <div className="contact mt-5">
      <div className="heading mx-auto text-center">
          <span className="reveal-text ">CONTACT US</span>
          <h2 className="fw-bold">Feel Free To Contact Us!</h2>
        </div>

      <div className="contact-container section-height d-flex align-items-center justify-content-center flex-column">
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-md-7">
                <div className="map-embedded">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722544.6272144164!2d51.305971177361656!3d24.33612786894189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e48dfb1ab12bd%3A0x33d32f56c0080aa7!2sUnited%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1715191153632!5m2!1sen!2sus" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
              <div className="col-md-5">
              <ContactUsForm/>
              </div>
            </div>
          </div>
         </div>
      </div>
      

     {/* OFFER BANNER MODAL */}

     <Modal isOpen={modal} toggle={toggle} {...args} className='modal-offer'>
        <img src={offer} alt="offer" className="modal-image" />
        <i class="fa-solid fa-xmark fs-2 text-white cancel-modal"></i>
      </Modal>

    </>
  );
};

export default Home;
