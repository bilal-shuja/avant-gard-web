import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import AddToCartModal from '../Modals/AddToCartModal';
import './HomePageStyles.scss'

const Portfolio = ({ items }) => {

    const [categories, setCategories] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [product_id, setProduct_id] = useState(null)
    const [hoveredImages, setHoveredImages] = useState(Array(categories.length).fill(null));

    const handleMouseOver = (index, imageUrl) => {
        const newHoveredImages = [...hoveredImages];
        newHoveredImages[index] = imageUrl;
        setHoveredImages(newHoveredImages);
    };

    const handleMouseOut = (index) => {
        const newHoveredImages = [...hoveredImages];
        newHoveredImages[index] = null;
        setHoveredImages(newHoveredImages);
    };

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = () => {
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch(`https://avantgarde.alphanitesofts.net/api/get_articles_by_sub_category_id/${items}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "200") {
                    setCategories(result?.data)
                }
                else {
                    console.log("error in fetch_all_users")
                }
            })
            .catch(error => console.log('error', error));
    }

    const openCloseModal = (id) => {
        setModalShow((prev) => !prev)
        setProduct_id(id)
    }

    var settings = {
        dots: false,
        infinite: false,
        speed: 900,
        slidesToShow: 5.4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        cssEase: "ease-out",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2.08,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    // autoplay:false
                },
            },
        ],
    };

    return (
        <div>
            <>
                <div className="">
                    <div className="row">
                        <Slider {...settings}>
                            {
                                categories?.filter(item => item.is_live === 'true').map((items, index) => {
                                    const delay = index * 0.2 + 0.1;
                                    return (
                                        <div>
                                            <div className="ps-1 pe-1 single_gallery_item women wow fadeInUpBig" data-wow-delay={`${delay}s`}>
                                                <div className="product-img">
                                                    {items?.image?.length > 0 && (
                                                        <img
                                                            src={`https://avantgardeimages.alphanitesofts.net/${hoveredImages[index] || items.image[0]}`}
                                                            className='img-fluid'
                                                            // style={{ height: "300px" }}
                                                            alt="product-image"
                                                            onMouseOver={() => handleMouseOver(index, items?.image[1])}
                                                            onMouseOut={() => handleMouseOut(index)}
                                                        />
                                                    )}
                                                    {
                                                        items?.on_sale === "true" ?
                                                            <div className="sale-tag">Sale</div> : null
                                                    }
                                                </div>
                                                <div className="product-description">
                                                    <div style={{ height: 100 }}>
                                                        <p style={{ fontWeight: 380 }}><span style={{ fontWeight: 400 }}>{items?.title}</span >&nbsp;&nbsp;({items?.article_prefix})</p>
                                                        <div className='d-flex align-items-center'>
                                                            <i className='fa-solid fa-star' />
                                                            <i className='fa-solid fa-star' />
                                                            <i className='fa-solid fa-star' />
                                                            <i className='fa-solid fa-star' />
                                                            <i className='fa-solid fa-star' />
                                                            <p className='ms-1' >&nbsp;2 reviews</p>
                                                        </div>
                                                        <div className='d-flex align-items-end'>
                                                            {
                                                                items.on_sale === "true" ? (
                                                                    <>
                                                                        <span className='product-price-line' style={{ fontSize: '14px', marginBottom: "2px", textDecoration: "line-through", color: "#9f9fa5" }}>Rs. {items.price}</span>
                                                                        <h4 className="product-price mt-1 text-dark" style={{ fontSize: '16px', fontWeight: 200 }}>&nbsp;Rs. {items.sale_price}</h4>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <h4 className="product-price mt-1 text-dark" style={{ fontSize: '16px', fontWeight: 200 }}>&nbsp;Rs. {items.price}</h4>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                    <a onClick={() => openCloseModal(items?.article_id)} className="add-to-cart-btn text-center " style={{ marginTop: '10px', }}>Choose Options</a>
                                                    {/* <a onClick={() => openCloseModal(items?.article_id)} className="add-to-cart-btn text-center" style={{ marginTop: '20px' }}>Choose Options</a> */}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>

                    </div>
                    {
                        modalShow === true ?
                            <AddToCartModal id={product_id} modalShow={modalShow} openCloseModal={openCloseModal} /> : null
                    }
                </div>

            </>

        </div>
    )
}

export default Portfolio;