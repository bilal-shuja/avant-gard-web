import React from 'react'

const ShippingPolicy = () => {
  return (
    <div className='row'>
      <div className='col-lg-6 mx-auto main-policy'>

        <h1 className='text-center'>Shipping policy</h1>
        <h2>Cash on Delivery</h2>
        <p>Your order will be dispatched on the same day (working day), if ordered before 1 PM</p>
        <p>Your order will be dispatched on the next working day, if ordered after 1 PM.</p>

        <h2>Bank Transfer</h2>
        <p>Your order will be dispatched on the same (working day), if ordered before 1 PM and full payment is confirmed and received in our account.</p>
        <p>Your order will be dispatched on the next working day, if ordered after 1 PM and full payment is confirmed and received in our account.</p>

        <h2>Card Payment</h2>
        <p>Your order will be kept on hold for 1 working day/24 hours to make sure payment is not on hold and is verified. After that, your order will be dispatched if there is no payment issue. If you order on Friday, Saturday, Sunday or Monday and pay via card then we will dispatch your order on Tuesday after payment is verified.</p>

      </div>
    </div>
  )
}

export default ShippingPolicy