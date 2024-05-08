import React from 'react'
import './LoginStyles.css'

const Login = () => {
  return (
    <div>
      <div className="cart_area section_padding_100 clearfix">
        <div className="">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className='text-center'>Login</h1>

                <div className='row mt-4'>
                  <div className='col-lg-5 mx-auto '>

                    <div>
                      <div className="form-floating mb-3">
                        <input type="email" className="form-control login-input" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput " className='email-adress'>Email address</label>
                      </div>
                      <div className="form-floating">
                        <input type="password" className="form-control login-input" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>
                    </div>

                    <div className="mb-3 p-0 form-check">
                      <div id="emailHelp" className="form-text forgot-password" >Forgot your password?</div>
                    </div>
                    <div className='product-description'>
                      <a href="#" className="add-to-cart-btn w-50 mx-auto" style={{ marginTop: '20px', color: '#000' }}>LOGIN</a>
                    </div>
                    <p className='text-center account-create'>Create account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login