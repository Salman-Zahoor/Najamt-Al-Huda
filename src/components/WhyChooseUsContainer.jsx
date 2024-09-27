import React from 'react'

const WhyChooseUsContainer = () => {
  return (
   <>
   <div className="why-us section-height d-flex align-items-center justify-content-center flex-column">
      <div className="heading mx-auto text-center">
          <span className="reveal-text ">WHY CHOOSE US</span>
          <h2 className="fw-bold" data-aos="fade-down"  data-aos-duration="800" data-aos-delay="500">THERE ARE SO MANY REASONS <br /> TO LOVE NAJAMT-UL-HUDA!</h2>
          <p data-aos="fade-down"  data-aos-duration="800" data-aos-delay="800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            aperiam <br />
            earum odio mollitia ad error!
          </p>
        </div>
        <div className="why-us-container mt-3">
          <div className="container">
            <div className="row">
              <div className="col-md-3 ">
                <div className="our-card p-3 text-center d-flex align-items-center justify-content-center flex-column" data-aos="fade-right"  data-aos-duration="500" data-aos-delay="500">
                <i class="fa-solid fa-star location"></i>
                <h5 className="fw-bold">Top rated professionals</h5>
                <p className="pb-2">Our professionals are reliable & well-trained, with an average rating of 4.78 out of 5!</p>
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="our-card p-3 text-center d-flex align-items-center justify-content-center flex-column" data-aos="fade-right"  data-aos-duration="700">
                <i class="fa-regular fa-calendar-check location "></i>
                <h5 className="fw-bold">Same-day availability</h5>
                <p className="pb-3">Book in less than 60 seconds, and even select same-day slots.</p>
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="our-card p-3 text-center d-flex align-items-center justify-content-center flex-column" data-aos="fade-right"  data-aos-duration="800">
                <i class="fa-solid fa-ranking-star location"></i>
                <h5 className="fw-bold">Top quality</h5>
                <p className="pb-3">Our professionals are equipped with the best tools.</p>
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="our-card p-3 text-center d-flex align-items-center justify-content-center flex-column" data-aos="fade-right"  data-aos-duration="900">
                <i class="fa-solid fa-mask location"></i>
                <h5 className="fw-bold">Super app</h5>
                <p className="pb-3">Being a Super app means we’ve got the widest range of home services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default WhyChooseUsContainer