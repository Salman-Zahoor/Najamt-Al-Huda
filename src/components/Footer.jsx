import React from 'react'
import logo from "../assets/logo2.png"

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
               <div className="footer-logo mt-5 w-100 text-center">
                <div className="container">
                    <div className="row mt-4 d-flex align-items-center justify-content-center">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4 mt-5">
                        <img src={logo} alt="logo" className='site_logo' />
                        </div>
                        <div className="col-md-4">
                       
                        </div>
                    </div>
                </div>
               </div>

               <div className="footer-para w-50 mx-auto text-center text-white mt-5">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate nostrum nihil voluptas ipsa doloribus unde, pariatur iste optio suscipit maxime.</p>
               </div>
            <div className="row mt-5 mb-4">
                <div className="col-md-4">
                    <div className="top-footer pt-4 d-flex align-items-center justify-content-center gap-3">
                    <i class="fa-solid fa-location-dot location fs-2"></i>
                    <div className="text-white">
                    <h5>We Are Located</h5>
                    <span>Jumerah, Dubai</span> 
                    </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="top-footer pt-4 d-flex align-items-center justify-content-center gap-3">
                    <i class="fa-solid fa-phone fs-2 location"></i>
                    <div className="text-white">
                    <h5>Call Us</h5>
                    <span><a href='tel:+97112338998' className='text-white'>+97112338998</a></span>
                    </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="top-footer pt-4 d-flex align-items-center justify-content-center gap-3">
                    <i class="fa-solid fa-envelope-open fs-2 location"></i>
                    <div className="text-white">
                    <h5>Email</h5>
                    <span><a href='mailto:Nahws@gmail.com' className='text-white'>Nahws@gmail.com</a></span>
                    </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className="bottom-footer ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="copy-right text-white">
                            <p className='footer-para'>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="privacy d-flex align-items-center justify-content-end gap-3">
                               <a href='/help&support' className='text-white'>Help & Support</a>
                               <a href='/privacy&policy' className='text-white'>Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
           
            <br />
            <br />
        </div>
      </div>
    </>
  )
}

export default Footer