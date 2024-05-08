import React, { useEffect, useState } from 'react'

// Crousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
    const [review, setReview] = useState([])
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState()

    useEffect(() => {
        getReviews()
    }, [])

    const getReviews = () => {
        setLoading(true)
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch("https://avantgarde.alphanitesofts.net/api/fetch_all_reviews", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false)
                setCount(result.total_count)
                setReview(result.data)
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            });
    }


    var settings = {
        dots: false,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        cssEase: "ease-out",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
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
            <section className="karl-testimonials-area section_padding_100">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section_heading text-center">
                                <h2>Testimonials</h2>
                                <p className='p-0 m-0 mt-2'>Let customers speak for us</p>
                                <p className='p-0 m-0  mt-1'>from {count} reviews</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8">

                            {
                                loading === true ? (
                                    <>
                                        <div className='mt-5 mb-5'>
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <div>
                                                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='karl-testimonial-slides'>
                                            <Slider {...settings}>
                                                {review.map((items) => {
                                                    const starCount = parseInt(items.star_count); // Parse star_count as an integer
                                                    const stars = Array.from({ length: starCount }, (_, index) => (
                                                        <i key={index} className="fa fa-star ms-1" aria-hidden="true" />
                                                    ));

                                                    return (
                                                        <div key={items.bank_id}>
                                                            <div className="single-testimonial-area text-center">
                                                                <span className="quote">"</span>
                                                                <div className="top_seller_product_rating">{stars}</div>
                                                                <h6>{items.review_description}</h6>
                                                                <div className="testimonial-info mt-3 d-flex align-items-center justify-content-center">
                                                                    <div>
                                                                        <div className="tes-thumbnail ms-5">
                                                                            <img src={`https://avantgardeimages.alphanitesofts.net/${items.articles_image[0]}`} alt="testimonial image" />
                                                                        </div>
                                                                        <div className="testi-data">
                                                                            <p className='text-center mt-2'>{items.article_title}</p>
                                                                            {/* <span className='text-center'>{items.article_owner_name}</span> */}
                                                                            <span className='text-center'>Ali Shehbaz</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </Slider>
                                        </div>
                                    </>
                                )
                            }

                            {/* <div className="karl-testimonials-slides ">
                                <Slider {...settings}>
                                    <div>
                                        <div className="single-testimonial-area text-center">
                                            <span className="quote">"</span>
                                            <h6>Nunc pulvinar molestie sem id blandit. Nunc venenatis interdum mollis. Aliquam finibus nulla quam, a iaculis justo finibus non. Suspendisse in fermentum nunc.Nunc pulvinar molestie sem id blandit. Nunc venenatis interdum mollis. </h6>
                                            <div className="testimonial-info d-flex align-items-center justify-content-center">
                                                <div className="tes-thumbnail">
                                                    <img src="img/bg-img/tes-1.jpg" alt />
                                                </div>
                                                <div className="testi-data">
                                                    <p>Michelle Williams</p>
                                                    <span>Client, Los Angeles</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="single-testimonial-area text-center">
                                            <span className="quote">"</span>
                                            <h6>Nunc pulvinar molestie sem id blandit. Nunc venenatis interdum mollis. Aliquam finibus nulla quam, a iaculis justo finibus non. Suspendisse in fermentum nunc.Nunc pulvinar molestie sem id blandit. Nunc venenatis interdum mollis. </h6>
                                            <div className="testimonial-info d-flex align-items-center justify-content-center">
                                                <div className="tes-thumbnail">
                                                    <img src="img/bg-img/tes-1.jpg" alt />
                                                </div>
                                                <div className="testi-data">
                                                    <p>Michelle Williams</p>
                                                    <span>Client, Los Angeles</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="single-testimonial-area text-center">
                                            <span className="quote">"</span>
                                            <h6>Nunc pulvinar molestie sem id blandit. Nunc venenatis interdum mollis. Aliquam finibus nulla quam, a iaculis justo finibus non. Suspendisse in fermentum nunc.Nunc pulvinar molestie sem id blandit. Nunc venenatis interdum mollis. </h6>
                                            <div className="testimonial-info d-flex align-items-center justify-content-center">
                                                <div className="tes-thumbnail">
                                                    <img src="img/bg-img/tes-1.jpg" alt />
                                                </div>
                                                <div className="testi-data">
                                                    <p>Michelle Williams</p>
                                                    <span>Client, Los Angeles</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="single-testimonial-area text-center">
                                            <span className="quote">"</span>
                                            <h6>Nunc pulvinar molestie sem id blandit. Nunc venenatis interdum mollis. Aliquam finibus nulla quam, a iaculis justo finibus non. Suspendisse in fermentum nunc.Nunc pulvinar molestie sem id blandit. Nunc venenatis interdum mollis. </h6>
                                            <div className="testimonial-info d-flex align-items-center justify-content-center">
                                                <div className="tes-thumbnail">
                                                    <img src="img/bg-img/tes-1.jpg" alt />
                                                </div>
                                                <div className="testi-data">
                                                    <p>Michelle Williams</p>
                                                    <span>Client, Los Angeles</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Slider>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonials