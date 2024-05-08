import React from 'react'

const OffersArea = () => {
    return (
        <div>
            <section className="offer_area mt-5 section_padding_100 bg-img" style={{ backgroundImage: 'url(img/bg-img/bg-5.jpg)' }}>
                <div className="container h-100">
                    <div className="row h-100 align-items-end justify-content-end">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="offer-content-area wow fadeInUp" data-wow-delay="1s">
                                <h2>White t-shirt <span className="karl-level">Hot</span></h2>
                                <p>* Free shipping until 8 MARCH 2024</p>
                                <div className="offer-product-price">
                                    <h3><span className="regular-price" style={{fontSize:"22px"}}>Rs.2000</span>Rs.1250</h3>
                                </div>
                                <a href="#" className="btn karl-btn mt-30">Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default OffersArea