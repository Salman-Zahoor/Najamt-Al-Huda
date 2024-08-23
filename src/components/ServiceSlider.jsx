import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getUserCategories, getUserServiceByCategory } from '../services/products/Products';
// import { clientCategory } from '../services/products/Products';
// import { breakpoints } from '@mui/system';

const ServiceSlider = ({setGetAllServices}) => {
  const [userGetCat, setUserGetCat] = useState([])

  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0%",
        }
      }
    ]
  };

 
  useEffect(()=>{
    handleGetCategories()
   },[])


   const handleGetCategories = () =>{
     getUserCategories().then((res)=>{
       if(res?.status === 200) {
         const data = res?.data?.data
         setUserGetCat(data)
       }
     }).catch((error)=>{
      console.log(error)
     })
   }



   

   const handleOnClickCategory = (categoryId) =>{

        let payload = {
            category : categoryId,
        }
        getUserServiceByCategory(payload).then((res)=>{
            if(res?.status === 200){
                const data = res?.data?.data
            setGetAllServices(data)
           }
        }).catch((error)=>{
         console.log(error)
        })
   }

  return ( 
    <div className="category-slider-container mb-5">
      {userGetCat?.length > 4 ? (
        <Slider {...settings} className=''>
          <div className='p-3'>
              <button
                className="category-button"
                // onClick={()=>handleOnClickCategory(item._id)}
              >
                All
              </button>
            </div>
          {userGetCat?.map((item,index) => (
            <div className='p-3' key={index}>
              <button
                className="category-button"
                onClick={()=>handleOnClickCategory(item._id)}
              >
                {item.name}
              </button>
            </div>
          ))}
        </Slider>
      ) : (
        userGetCat?.map((item,index) => (
          <div className='p-3' key={index}>
            <button
             className="category-button "
            >
              {item.name}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceSlider;
