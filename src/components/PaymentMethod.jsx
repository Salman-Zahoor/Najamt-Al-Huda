import React from 'react'
import TextFeilds from './TextFeilds'
import Buttons from './Buttons'

const PaymentMethod = ({ userDetails,setUserDetails}) => {

  const onChnageHandle=(e)=>{
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  }
  return (
    <>
      <div className="steps-head text-center p-2 mt-2">
      <span className='fw-bold'>User Details</span>
      </div>
      <div className="payment-form mt-2">
       <div className="container">
        <div className="row">
            <div className="col-md-6">
            <TextFeilds
           id='user-name'
           type='text'
           label='User Name'
           className='username w-100'
           name='name'
            onChange={(e)=>onChnageHandle(e)}
        />
            </div>
            <div className="col-md-6">
            <TextFeilds
           id='email'
           type='text'
           label='Email'
           className='cardNumber w-100'
           name='email'
           onChange={(e)=>onChnageHandle(e)}
        />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
            <TextFeilds
           id='phone'
           type='text'
           label='Phone No'
           className='expiry w-100'
           name='phone'
           onChange={(e)=>onChnageHandle(e)}
        />
            </div>
            <div className="col-md-6">
            <TextFeilds
           id='address'
           type='text'
           label='Address'
           className='cvv w-100'
           name='address'
           onChange={(e)=>onChnageHandle(e)}
        />
            </div>
        </div>
        <Buttons
        name='Pay Now'
        className='w-100'
        />
       </div>
      </div>
    </>
  )
}

export default PaymentMethod