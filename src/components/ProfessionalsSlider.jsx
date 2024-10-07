import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import Slider from "react-slick";
import BasicDateTimePicker from "./DateAndTime";
import { checkBooking, getEmployeesClientSide } from "../services/products/Products";
import logo2 from "../assets/logo2.png"
const ProfessionalsSlider = ({teamId, setTeamId,setSelectedDateTime,selectedDateTime,isAutoAssign,setIsAutoAssign}) => {
  const [activeIndex, setActiveIndex] = useState(-1); 
  const [team, setTeam] = useState([]); 


  const handleDateTimeChange = (newDateTime) => {
    setSelectedDateTime(newDateTime);
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    handleProfessionals();
  }, []);

  const handleProfessionals = () => {
    getEmployeesClientSide()
      .then((res) => {
        if(res.status === 200){
          const data = res?.data?.data;
          setTeam(data)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


    

    
  const handleCardClick = (index, id) => {
    if (id=="auto") {
      setActiveIndex(index);
      setIsAutoAssign(true)
      return
    }else{
    setActiveIndex(index);
    setTeamId(id)
    setIsAutoAssign(false)
    }; 
  };
 
 
  return (
    <>
      <div className="steps-head text-center p-2 mt-4">
        <span className="fw-bold">Which professional do you prefer?</span>
      </div>

      <div className="professional-team-slider mt-4">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-12">
              <Slider {...settings}>
              <div
                    className={`team-card p-2 text-center ${
                      isAutoAssign === true ? "active" : ""
                    }`}
                    key={100}
                    onClick={()=> handleCardClick(100,"auto")}
                    style={{
                      backgroundColor:isAutoAssign === true ? "#007bff" : "#f8f9fa",
                      color: isAutoAssign === true ? "#ffffff" : "#000000",
                    }}
                  >
                    <div className="imagesss text-center m-auto">
                      <Avatar
                        alt={"Auto"}
                        sx={{ width: 80, height: 80 }}
                        className="m-auto"
                        src={logo2}
                      />
                    </div>
                    <h5 className="text-center mt-3">Auto Assign</h5>
                     <div className="d-flex flex-column">
                     {/* <small className="">{item.email}</small> */}
                     <span className="fs-6">Employee</span>
                     </div>
                  </div>
                {team.map((item, index) => (
                  <div
                    className={`team-card p-2 text-center ${
                      index === activeIndex ? "active" : ""
                    }`}
                    key={index}
                    onClick={()=> handleCardClick(index, item._id)}
                    style={{
                      backgroundColor: index === activeIndex ? "#007bff" : "#f8f9fa",
                      color: index === activeIndex ? "#ffffff" : "#000000",
                    }}
                  >
                    <div className="imagesss text-center m-auto">
                      <Avatar
                        alt={item.name}
                        sx={{ width: 80, height: 80 }}
                        className="m-auto"
                        src={item.image}
                      />
                    </div>
                    <h5 className="text-center mt-3">{item.name}</h5>
                     <div className="d-flex flex-column">
                     {/* <small className="">{item.email}</small> */}
                     <span className="fs-6">{item.role}</span>
                     </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <div className="date-picker pt-4">
        <div className="steps-head text-center p-2 mb-2">
          <span className="fw-bold">When would you like your service?</span>
        </div>
        <BasicDateTimePicker 
        selectedDateTime={selectedDateTime}
        onDateTimeChange={handleDateTimeChange}
        />
      </div>
    </>
  );
};

export default ProfessionalsSlider;
