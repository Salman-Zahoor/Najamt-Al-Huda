import React, { useEffect, useState } from 'react'
import { Avatar } from "@mui/material";
import { getEmployeesClientSide } from '../services/products/Products';
import Loader from './Loader';

const TeamContainer = () => {
  const [team, setTeam] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  
  useEffect(() => {
    handleProfessionals();
  }, []);

  const handleProfessionals = () => {
    setIsLoading(true)
    getEmployeesClientSide()
      .then((res) => {
        if(res.status === 200){
          const data = res?.data?.data;
          setTeam(data)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading}/>}

      <div className="team-container section-height d-flex align-items-center justify-content-center flex-column">
        <div className="heading mx-auto text-center">
          <span className="reveal-text">TEAM</span>
          <h2 className="fw-bold" data-aos="fade-down" data-aos-duration="500">OUR PROFESSIONALS</h2>
          <p data-aos="fade-down" data-aos-duration="700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, aperiam <br />
            earum odio mollitia ad error!
          </p>
        </div>

        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            {team?.length > 0 ? (
              team.map((item, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <div className="team-cards">
                      <div className="imagesss text-center m-auto">
                        <Avatar
                          alt="Remy Sharp"
                          src={item?.image}
                          className="m-auto team_pic"
                          sx={{ width: 150, height: 150 }}
                        />
                      </div>
                      <h4 className="text-center mt-3">{item?.name}</h4>
                      <p className="text-center">{item?.profession}</p>
                      <p className="text-center">{item?.description}</p>
                      <div className="stars d-flex align-items-center justify-content-center">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No Professionals Found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamContainer;
