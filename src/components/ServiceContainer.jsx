import React from 'react'
import { Link } from "react-router-dom";
import hair from "../assets/head.jpg";
import skin from "../assets/skin.jpg";
import massage from "../assets/massage.jpg";
import Buttons from "../components/Buttons";


const ServiceContainer = () => {
  return (
    <>
     <div className="service-container section-height p-5 d-flex align-items-center justify-content-center flex-column">
        <div className="heading mx-auto text-center">
          <span className="reveal-text ">SERVICES</span>
          <h2 className="fw-bold" data-aos="fade-down"  data-aos-duration="800" data-aos-delay="500">OUR SERVICES</h2>
          <p  data-aos="fade-down"  data-aos-duration="800" data-aos-delay="700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            aperiam <br />
            earum odio mollitia ad error!
          </p>
        </div>

        <div className="service_cards"> 
        <div className="container d-flex align-items-center justify-content-center">
            <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-4">
            <div class="card" data-aos="fade-up"
     data-aos-duration="800" style={{width:"18rem"}}>
            <img src={hair} class="card-img-top" alt="..."/>
            <div class="card-body p-3"> 
                <div className="d-flex align-items-center justify-content-between">
                <h5 class=" pt-2 ">Hair</h5>
                <span className="price fw-bold">AED 50.00</span>
                </div>
            <ul class=" card-ul pt-1">
                <li class="">Iron With Curls</li>
                <li class="">Blow Dry Simple Stard</li>
                <li class="">Differents Kinds Of Hair Cut</li>
            </ul>
                <div className="text-center pb-2 d-none">
                <Buttons
                name="Book Now"
                className="w-75 card-book "
                />
                </div>
                </div>
            </div>
            </div>
            <div className="col-md-4">
            <div class="card" data-aos="fade-up"
     data-aos-duration="1000" style={{width:"18rem"}}>
            <img src={massage} class="card-img-top" alt="..."/>
            <div class="card-body p-3"> 
                <div className="d-flex align-items-center justify-content-between">
                <h5 class=" pt-2 ">Massage</h5>
                <span className="price fw-bold">AED 50.00</span>
                </div>
            <ul class="card-ul pt-1">
                <li class="">Head & Foot Massage</li>
                <li class="">Neck & Shoulders Massage</li>
                <li class="">Back & Lags Massage</li>
            </ul>
                <div className="text-center pb-2 d-none">
                <Buttons
                name="Book Now"
                className="w-75 card-book "
                />
                </div>
                </div>
            </div>
            </div>
            <div className="col-md-4">
            <div class="card" data-aos="fade-up"
     data-aos-duration="1200" style={{width:"18rem"}}>
            <img src={skin} class="card-img-top" alt="..."/>
            <div class="card-body p-3"> 
                <div className="d-flex align-items-center justify-content-between">
                <h5 class=" pt-2 ">Skin Service</h5>
                <span className="price fw-bold">AED 50.00</span>
                </div>
            <ul class=" card-ul pt-1">
                <li class="">Facial Whitening</li>
                <li class="">Herbal Facial</li>
                <li class="">Deep Cleansing Facial</li>
            </ul>
                <div className="text-center pb-2 d-none">
                <Buttons
                name="Book Now"
                className="w-75 card-book "
                />
                </div>
                </div>
            </div>
            </div>
            </div>
        </div>
        </div>

        <div className="view-services mx-auto text-center mt-4">
        <Link class="nav-link" to="/services" data-aos="fade-up"
     data-aos-duration="3000"> <Buttons name="View All Services" className="view-all-btn"/></Link>
        </div>
      </div>
    </>
  )
}

export default ServiceContainer