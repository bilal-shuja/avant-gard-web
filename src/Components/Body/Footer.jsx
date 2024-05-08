import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Footer = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const sendEmail = () => {
        if (email === "") {
            toast.warn("Please enter your email address");
        }
        else {
            setLoading(true)
            const formdata = new FormData();
            formdata.append("email", email);

            const requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow"
            };

            fetch("https://avantgarde.alphanitesofts.net/api/post_user_email", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    toast.success("Thanks for subscribing to us")
                    setLoading(false)
                })
                .catch((error) => {
                    console.error(error)
                    toast.success("Something went wrong")
                    setLoading(false)
                });
        }
    }

    return (
        <div>
            <footer className="footer_area">
                <div className="container">
                    <div className="row">
                        {/* Single Footer Area Start */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="single_footer_area">
                                <div className="footer-logo">
                                    <img src={"https://avantgardeoriginal.com/cdn/shop/files/ultrawideArtboard_1_860166a0-ef45-46c7-a6d4-1d4aa1c4060d.png"} className='img-fluid' style={{ height: "60px" }} alt="Avant-Grade Logo" />
                                </div>
                                <div className="copywrite_text d-flex align-items-center">
                                    <p>Copyright © All rights reserved | Made with <i className="fa fa-heart-o" aria-hidden="true" /> by <a href="https://alphanitesofts.com/" target="_blank">Alphanties</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div className="single_footer_area">
                                <ul className="footer_widget_menu">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/Blog">Blogs</a></li>
                                    <li><a href="/Cart" >Cart</a></li>
                                    <li><a href="/Checkout" >Checkout</a></li>
                                    <li><a href="/contact-us" >Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div className="single_footer_area">
                                <ul className="footer_widget_menu">
                                    <li><a href="/privacy-policy" >Privacy Policy</a></li>
                                    <li><a href="/ReturnExchangePolicy">Return and Exchange Policy</a></li>
                                    <li><a href="/RefundReturnPolicy">Refund and Return policy</a></li>
                                    <li><a href="/ShippingPolicy">Shipping Policy</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5">
                            <div className="single_footer_area">
                                <div className="footer_heading mb-30">
                                    <h6>Subscribe to our newsletter</h6>
                                </div>
                                <div className="subscribtion_form">
                                    <div >
                                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="mail" placeholder="Your email here" />
                                        {
                                            loading === false ?
                                                <button type="submit" className="submit" onClick={sendEmail}>Subscribe</button> :
                                                <button type="submit" className="submit"> <i className="fa-solid fa-spinner fa-spin" /> </button>

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line" />
                    <div className="footer_bottom_area">
                        <div className="row">
                            <div className="col-12">
                                <div className="footer_social_area text-center">
                                    <a href="#"><i className="fa fa-pinterest" aria-hidden="true" /></a>
                                    <a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a>
                                    <a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a>
                                    <a href="#"><i className="fa fa-linkedin" aria-hidden="true" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer