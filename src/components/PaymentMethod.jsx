import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const PaymentMethod = ({ userDetails, setUserDetails }) => {

  const onChangeHandle = (e) => {
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
              <TextField
                id='user-name'
                type='text'
                label='User Name'
                className='username w-100'
                name='name'
                onChange={onChangeHandle}
                fullWidth
                margin="normal"
              />
            </div>
            <div className="col-md-6">
              <TextField
                id='email'
                type='text'
                label='Email'
                className='cardNumber w-100'
                name='email'
                onChange={onChangeHandle}
                fullWidth
                margin="normal"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <TextField
                id='phone'
                type='text'
                label='Phone No'
                className='expiry w-100'
                name='phone'
                onChange={onChangeHandle}
                fullWidth
                margin="normal"
              />
            </div>
            <div className="col-md-6">
              <TextField
                id='address'
                type='text'
                label='Address'
                className='cvv w-100'
                name='address'
                onChange={onChangeHandle}
                fullWidth
                margin="normal"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <FormControl fullWidth>
                <InputLabel id="payment-type-label">Payment Type</InputLabel>
                <Select
                  labelId="payment-type-label"
                  id="payment-type"
                  value={userDetails.paymentType || ''}
                  label="Payment Type"
                  onChange={onChangeHandle}
                  name="paymentType"
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="online">Online</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentMethod

