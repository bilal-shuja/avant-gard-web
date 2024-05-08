import React from 'react'
import Slider from "react-slick";

const Blogs = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 3.2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        cssEase: "ease-out",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div>
            <section className="new_arrivals_area section_padding_100_0 clearfix">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section_heading text-center">
                                <h2>Our Blogs</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="blog-home5 container">
                    <div className="row mb-5">
                        <Slider {...settings}>
                            <div className="col-lg-12">
                                <div className="card b-h-box position-relative font-14 border-0 mb-4">
                                    <img className="card-img img-fluid" src="https://scontent-lhr8-2.cdninstagram.com/v/t51.29350-15/437941969_413854807953356_2943174737251436452_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_ohc=emrcBEk3I38Q7kNvgE-NCRW&_nc_ht=scontent-lhr8-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDFpC9rJ1lYCXpJxZAZ_b5ekpU1hyKPj1pRcMisymUu6A&oe=66419A2F" alt="Card image" />
                                    <div className="card-img-overlay overflow-hidden">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-danger-gradiant badge overflow-hidden text-white px-3 py-1 font-weight-normal">Lahore, Pakistan</span>
                                            <div className="ml-2">
                                                <span className="ml-2">23-5-2023</span>
                                            </div>
                                        </div>
                                        <h5 className="card-title my-3 font-weight-normal">Hello World</h5>
                                        <p className="card-text text-dark mt-0 pt-0" style={{ fontSize: '12px', lineHeight: '17px' }}>Our Navy White Raglan Flex Polo Shirt features a sporty and stylish design that is perfect for any occasion. The raglan sleeves provide a comfortable and modern fit, while the navy and white color scheme add a classic touch.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card b-h-box position-relative font-14 border-0 mb-4">
                                    {/* src={`${Imagesurl}${items.item_image}`} */}
                                    <img className="card-img img-fluid" src="https://scontent-lhr6-1.cdninstagram.com/v/t51.29350-15/438980644_1173509637143978_6351494668521558706_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_ohc=PSeOfkUJ3sMQ7kNvgFEutd3&_nc_ht=scontent-lhr6-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBqfuoh60H_4YNDlJ85iAlBCuqZpVdrS0VoFFL3UxewKw&oe=6641A218" alt="Card image" />
                                    <div className="card-img-overlay overflow-hidden">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-danger-gradiant badge overflow-hidden text-white px-3 py-1 font-weight-normal">Lahore, Pakistan</span>
                                            <div className="ml-2">
                                                <span className="ml-2">23-5-2023</span>
                                            </div>
                                        </div>
                                        <h5 className="card-title my-3 font-weight-normal">Hello World</h5>
                                        <p className="card-text text-dark mt-0 pt-0" style={{ fontSize: '12px', lineHeight: '17px' }}>Our Navy White Raglan Flex Polo Shirt features a sporty and stylish design that is perfect for any occasion. The raglan sleeves provide a comfortable and modern fit, while the navy and white color scheme add a classic touch.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card b-h-box position-relative font-14 border-0 mb-4">
                                    <img className="card-img img-fluid" src="https://scontent-lhr6-2.cdninstagram.com/v/t51.29350-15/438969486_398145316340223_2973786047465886144_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=Y5gAJO72WI0Q7kNvgHFvWJy&_nc_ht=scontent-lhr6-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfChlgn6uJB1K6h2pcb-38AhCXrxzPGJb-nJIn-vU6Eq1g&oe=66418888" alt="Card image" />
                                    <div className="card-img-overlay overflow-hidden">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-danger-gradiant badge overflow-hidden text-white px-3 py-1 font-weight-normal">Islambad, Pak</span>
                                            <div className="ml-2">
                                                <span className="ml-2">Feb 18, 2018</span>
                                            </div>
                                        </div>
                                        <h5 className="card-title my-3 font-weight-normal">Help out the people who really need it on time.</h5>
                                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card b-h-box position-relative font-14 border-0 mb-4">
                                    {/* src={`${Imagesurl}${items.item_image}`} */}
                                    <img className="card-img img-fluid" src="https://scontent-lhr8-1.cdninstagram.com/v/t51.29350-15/440006023_739243578325556_7801029384292312502_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=9NjPtTJJL18Q7kNvgFGbgVs&_nc_ht=scontent-lhr8-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCcD-AiP_8LcyW7fjJ-PZeL5Q6u-h2WKQLoCiPyQ0F3Fg&oe=66417EDD" alt="Card image" />
                                    <div className="card-img-overlay overflow-hidden">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-danger-gradiant badge overflow-hidden text-white px-3 py-1 font-weight-normal">Lahore, Pakistan</span>
                                            <div className="ml-2">
                                                <span className="ml-2">23-5-2023</span>
                                            </div>
                                        </div>
                                        <h5 className="card-title my-3 font-weight-normal">Hello World</h5>
                                        <p className="card-text text-dark mt-0 pt-0" style={{ fontSize: '12px', lineHeight: '17px' }}>Our Navy White Raglan Flex Polo Shirt features a sporty and stylish design that is perfect for any occasion. The raglan sleeves provide a comfortable and modern fit, while the navy and white color scheme add a classic touch.</p>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="col-lg-12">
                                <div className="card b-h-box position-relative font-14 border-0 mb-4">
                                    <img className="card-img" src="https://scontent-lhr8-2.cdninstagram.com/v/t51.29350-15/437941969_413854807953356_2943174737251436452_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_ohc=aemypXUp9BcQ7kNvgHq8DBB&_nc_ht=scontent-lhr8-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfB_sXIYstPG7OwM4HyWYcT-DLtzEy6vhspqE6IKoLOkRg&oe=663ACA6F" alt="Card image" />
                                    <div className="card-img-overlay overflow-hidden">
                                        <div className="d-flex align-items-center">
                                            <span className="bg-danger-gradiant badge overflow-hidden text-white px-3 py-1 font-weight-normal">Charity, Ngo</span>
                                            <div className="ml-2">
                                                <span className="ml-2">Feb 18, 2018</span>
                                            </div>
                                        </div>
                                        <h5 className="card-title my-3 font-weight-normal">Help out the people who really need it on time.</h5>
                                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
                                    </div>
                                </div>
                            </div> */}
                        </Slider>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Blogs