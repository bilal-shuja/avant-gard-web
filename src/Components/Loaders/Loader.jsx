import React from 'react'
import './LoaderStyles.scss'

const Loader = () => {
  return (
    <>
      <div className='mt-5 mb-5'>
        <div className='d-flex justify-content-center align-items-center'>
          <div>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loader