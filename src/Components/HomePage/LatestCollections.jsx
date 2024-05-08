import React, { useState, useEffect } from 'react'
import './HomePageStyles.scss'
import { Link } from 'react-router-dom';
import Slider from "react-slick";

const LatestCollections = () => {

    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = () => {
        setLoading(true)
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch(`https://avantgarde.alphanitesofts.net/api/get_latest_sub_categorys`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                if (result.status === "200") {
                    setCollections(result?.data)
                }
                else {
                    console.log("error in fetch_all_users")
                }
            })
            .catch(error => console.log('error', error));
    }

    var settings = {
        dots: false,
        infinite: false,
        speed: 900,
        slidesToShow: 5.4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        cssEase: "ease-out",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2.3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2.3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
        ],
    };

    return (
        <div>
            {/* mobile view */}
            <section className='hide-bootstrap-cards'>
                <div className="container mt-4">
                    <h2 className='heading-font'>Latest Collections</h2>
                    <div className="row">
                        <Slider {...settings}>
                            {
                                collections?.map((items, index) => {
                                    const delay = index * 0.2 + 0.1;
                                    return (
                                        <div className='ps-1 pe-1'>
                                            <Link to={`/Shop-now/${items?.sub_category}`}>
                                                <div className="single_gallery_item m-0 p-0 women wow fadeInUpBig" data-wow-delay={`${delay}s`}>
                                                    <div className="product-img">
                                                        <img
                                                            src={`https://avantgardeimages.alphanitesofts.net/${items?.image}`}
                                                            className='img-fluid'
                                                            alt="collection-image"
                                                        />
                                                    </div>
                                                    <div className="product-description collection-icon d-flex align-items-center">
                                                        <p style={{ fontWeight: 300, fontSize: "20px" }}>{items?.sub_cat_name}</p>
                                                        <i className='ms-2 fa fa-solid fa-arrow-right arrow-icon' />
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </section>

            {/* web view */}
            <section className='show-carousel-cards '>
                <div className="container mt-5">
                    <h2 className='heading-font'>Latest Collections</h2>
                    <div className="row">
                        {
                            collections?.map((items, index) => {
                                const delay = index * 0.2 + 0.1;
                                return (
                                    <div className='col-lg-3'>
                                        <Link to={`/Shop-now/${items?.sub_category}`}>
                                            <div className="single_gallery_item m-0 p-0 women wow fadeInUpBig" data-wow-delay={`${delay}s`}>
                                                <div className="product-img">
                                                    <img
                                                        src={`https://avantgardeimages.alphanitesofts.net/${items?.image}`}
                                                        className='img-fluid'
                                                        alt="collection-image"
                                                    />
                                                </div>
                                                <div className="product-description collection-icon d-flex align-items-center">
                                                    <p style={{ fontWeight: 500, fontSize: "20px" }}>{items?.sub_cat_name}</p>
                                                    <i className='ms-2 fa fa-solid fa-arrow-right arrow-icon' />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>

        </div>
    )
}

export default LatestCollections;