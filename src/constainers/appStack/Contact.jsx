import React from 'react'
import Navbar from '../../components/Navbar'
import TextFeilds from '../../components/TextFeilds'
import TextField from '@mui/material/TextField';
import Buttons from '../../components/Buttons';
import ContactUsForm from '../../components/ContactUsForm';

const Contact = () => {
  return (
    <>
      <div className="about-page-container">
<div className="hero-container">
  <Navbar />
  <div className="about-hero-content d-flex align-items-center justify-content-center flex-column">
    <div className="container">
      <div className="row ">
        <div className="col-md-6 flex-column text-white">
          <h1 className="mt-5">GET IN TOUCH</h1>
        </div>
      </div>
    </div>
  </div>  
  
  </div>
</div>
<div className="contact-container section-height mt-4 d-flex align-items-center justify-content-center flex-column">
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-md-6">
                 <div className="row">
                  <div className="col-md-6 map-embedded">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722544.6272144164!2d51.305971177361656!3d24.33612786894189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e48dfb1ab12bd%3A0x33d32f56c0080aa7!2sUnited%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1715191153632!5m2!1sen!2sus" width="550" height="274" style={{border:0, borderRadius:"10px"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                 </div>
                 <div className="row mt-4 d-flex align-items-center justify-content-center">
                  <div className="col-md-6">
                  <div className="location-card w-100 d-flex align-items-center text-start justify-content-start p-3 gap-2 bg-white">
                 <i class="fa-solid fa-location-dot location fs-2"></i>
                 <div className="text-dark w-100">
                    <h5>We Are Located</h5>
                    <span>Jumerah, Dubai</span> 
                    </div>
                 </div>
                  </div> 
                  <div className="col-md-6">
                  <div className="location-card w-100 d-flex align-items-center text-start justify-content-start p-3 gap-2 bg-white">
                  <i class="fa-solid fa-phone fs-2 location"></i>
                 <div className="text-dark w-100">
                 <h5>Call Us</h5>
                    <span>+971 123 38998</span>
                    </div>
                 </div>
                  </div> 
                  
                 </div>
                 <div className="row mt-4 d-flex align-items-center justify-content-center">
                  <div className="col-md-6">
                  <div className="location-card w-100 d-flex align-items-center text-start justify-content-start p-3 gap-2 bg-white">
                  <i class="fa-solid fa-envelope-open fs-2 location"></i>
                 <div className="text-dark w-100">
                 <h5>Email</h5>
                    <span>Nahws@gmail.com</span>
                    </div>
                 </div>
                  </div> 
                  <div className="col-md-6">
                  <div className="location-card book-appoin w-100 d-flex align-items-center text-start justify-content-center p-3 gap-2 bg-white">
                  <i class="fa-solid fa-calendar-check fs-2 location"></i>
                    <h5>Book Appointment</h5>
                 </div>
                  </div> 
                  
                 </div>
                
              </div>
              <div className="col-md-5">
               <ContactUsForm/>
              </div>
            </div>
          </div>
         </div>

    </>
  )
}

export default Contact