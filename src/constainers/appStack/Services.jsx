import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import ServiceSection from '../../components/ServiceSection'
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Link,useNavigate } from 'react-router-dom'; 
import hair from "../../assets/head.jpg";
import skin from "../../assets/skin.jpg";
import massage from "../../assets/massage.jpg";
import Buttons from '../../components/Buttons';
import makeup from "../../assets/makeup.jpg"
import ServiceSlider from '../../components/ServiceSlider';
import { getAllUserServices, getUserCategories } from '../../services/products/Products';
import WhyChooseUsContainer from '../../components/WhyChooseUsContainer';


const products = [
    {
        id:1,
        name:"HAIR",
        price:"AED 50.00",
        image:hair,
        features: [
            "Iron With Curls",
            "Blow Dry Simple Stard",
            "Differents Kinds Of Hair Cut"
          ],
    },
    {
        id:2,
        name:"SKIN",
        price:"AED 50.00",
        image:skin,
        features: [
            "Iron With Curls",
            "Blow Dry Simple Stard",
            "Differents Kinds Of Hair Cut"
          ],
    },
    {
        id:3,
        name:"MASSAGE",
        price:"AED 50.00",
        image:massage,
        features: [
            "Iron With Curls",
            "Blow Dry Simple Stard",
            "Differents Kinds Of Hair Cut"
          ],
    },
   
]




const Services = () => {
    const history = useNavigate();
    const [getAllServices, setGetAllServices] = useState([])
    const handleSinglePage = (productId) =>{
        navigate(`/products/${productId}`);
    };

    useEffect(()=>{
      handleUserAllServices()
    },[])
    
    const handleUserAllServices = () =>{
      getAllUserServices().then((res)=>{
       if(res?.status === 200){
        const data = res?.data?.data
        setGetAllServices(data)
       } 
      }).catch((error)=>{
        console.log(error)
      })
    }

   

  return (
    <>
    
    <div className="service-page-container">
<div className="hero-container">
  <Navbar />
  <div className="service-hero-content  d-flex align-items-center justify-content-center flex-column">
    <div className="container">
      <div className="row">
        <div className="col-md-6  flex-column text-white">
          <h1 className="mt-5" data-aos="fade-down"  data-aos-duration="800" data-aos-delay="500">OUR SERVICES</h1>
        </div>
      </div>
    </div>
      
  </div>  
</div>
</div>

<div className="service-container section-height p-5 d-flex align-items-center justify-content-center flex-column">
        <div className="heading mx-auto text-center">
          <span className="reveal-text ">SERVICES</span>
          <h2 className="fw-bold">OUR SERVICES</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            aperiam <br />
            earum odio mollitia ad error!
          </p>
        </div>
               
        <ServiceSlider getAllServices={getAllServices} setGetAllServices={setGetAllServices}/>
        <div className="service_cards"> 
        <div className="container d-flex align-items-center justify-content-center">
            <div className="row  d-flex align-items-center justify-content-center">
            {getAllServices.map((product, index)=>(
                <div className="col-md-4 mb-5" key={index}>
                <div class="card " style={{width:"18rem"}}>
                <img src={product?.image} class="card-img-top" alt={product?.name}/>
                <div class="card-body p-3"> 
                    <div className="d-flex align-items-center justify-content-between">
                    <h5 class=" pt-2 ">{product?.name}</h5>
                    <span className="price fw-bold">{product?.price}</span>
                    </div>
                <ul class=" card-ul pt-1">
                    {product?.feature?.map((feature,index)=>(
                        <li class="" key={index}>{feature?.feature}</li>
                    ))}
                </ul>
                    <div className="text-center pb-2">
                    <Link to={`/products/${product?._id}`}>
                    <Buttons
                    name="Book Now"
                    onClick={() => handleSinglePage(product?._id)}
                    className="w-75 card-book "
                    />
                    </Link>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            
            </div>
        </div>
        </div>
      
      </div>



    <WhyChooseUsContainer/>
    </>
  )
}

export default Services