import React, { useState, useEffect } from 'react'
import RelatedProducts from '../ProductDetails/RelatedProducts'
import DiscountArea from '../HomePage/DiscountArea'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sizes from '../SourceFiles/Images/sizes.jpg'
import { Link } from 'react-router-dom';

import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoSlider, PhotoView } from 'react-photo-view';
import Slider from 'react-slick';

const ProductDescription = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(1);
    const [articleSize, setArticleSize] = useState(null);
    const [errorText, setErrorText] = useState(false)

    const [mainImage, ...gridImages] = categories.image || [];

    useEffect(() => {
        getDataById();
    }, [])

    useEffect(() => {
        topFunction();
    }, []);

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    const navigateToCart = async () => {
        if (articleSize === null) {
            setErrorText(true);
        } else {
            try {
                await storeData();
                navigate('/Cart');
            } catch (error) {
                console.error('Error navigating to cart:', error);
            }
        }
    };

    const storeData = () => {
        if (articleSize !== null) {
            const existingData = localStorage.getItem('productData');
            if (existingData) {
                const parsedData = JSON.parse(existingData);
                const existingItemIndex = parsedData.findIndex(item => item.id === categories.id && item.articleSize === articleSize);
                if (existingItemIndex === -1) {
                    parsedData.push({
                        count,
                        id: categories.id,
                        category: categories,
                        articleSize,
                    });
                    localStorage.setItem('productData', JSON.stringify(parsedData));
                }
            } else {
                localStorage.setItem(
                    'productData',
                    JSON.stringify([{
                        count,
                        id: categories.id,
                        category: categories,
                        articleSize,
                    }])
                );
            }
        }
    }

    const getDataById = () => {
        setLoading(true)
        if (id) {
            const requestOptions = {
                method: "POST",
                redirect: "follow"
            };
            fetch(`https://avantgarde.alphanitesofts.net/api/get_articles_by_id/${id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    if (result.status === "200") {
                        setCategories(result?.data)
                        console.log(result?.data)
                    }
                    else if (result?.status === "401") {
                        toast.warn(result?.message)
                    }
                    else {
                        console.log("error in getting the data")
                    }
                })
                .catch(error => {
                    console.log('error', error)
                    setLoading(false)
                });
        }
    }

    const addCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    const minusCount = () => {
        setCount(prevCount => (prevCount > 1 ? prevCount - 1 : prevCount));
    };


    const handleShareClick = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: categories?.title,
                    text: categories?.description,
                    url: window.location.href,
                });
            } else {
                throw new Error('Web Share API not supported.');
            }
        } catch (error) {
            console.error('Error sharing:', error.message);
            alert('Sharing is not supported in this browser.');
        }
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
            <DiscountArea />
            <div>
                <div>
                    <div className="breadcumb_area pt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <ol className="breadcrumb d-flex align-items-center">
                                        <li className="breadcrumb-item"><a >Home</a></li>
                                        <li className="breadcrumb-item"><a >{categories?.cat_name}</a></li>
                                        <li className="breadcrumb-item active">{categories?.sub_cat_name}</li>
                                    </ol>
                                    <Link to='/' className="backToHome d-block"><i className="fa fa-angle-double-left" /> Back to Category</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="single_product_details_area section_padding_0_100">
                        <div className="container">
                            <div className="row">


                                <div className='col-12 col-md-5'>


                                    <div className='hide-bootstrap-cards'>

                                        <div>
                                        <PhotoProvider
                                                                speed={() => 300}
                                                                easing={(type) =>
                                                                    type === 3
                                                                        ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
                                                                        : "cubic-bezier(0.34, 1.56, 0.64, 1)"
                                                                }
                                                                maskOpacity={0.5}
                                                                toolbarRender={({ onScale, scale }) => {
                                                                    return (
                                                                        <>
                                                                            <svg
                                                                                className="PhotoView-Slider__toolbarIcon"
                                                                                onClick={() => onScale(scale + 1)}
                                                                            />
                                                                            <svg
                                                                                className="PhotoView-Slider__toolbarIcon"
                                                                                onClick={() => onScale(scale - 1)}
                                                                            />
                                                                        </>
                                                                    );
                                                                }}
                                                            >
                                                                <div className="foo">

                                                                    <div className="row">
                                                                        {categories?.image &&
                                                                            categories[0]?.image?.map((item, index) => (
                                                                                <div key={index} className="col-lg-6  mt-3 mb-1">
                                                                                    <PhotoView src={`https://avantgardeimages.alphanitesofts.net/${item}`}>
                                                                                        <img
                                                                                            src={`https://avantgardeimages.alphanitesofts.net/${item}`}
                                                                                            alt=""
                                                                                        />
                                                                                    </PhotoView>
                                                                                </div>
                                                                            ))}
                                                                    </div>
                                                                </div>
                                                            </PhotoProvider>


                                        </div>

                                    </div>

                                    <div className='show-carousel-cards'>
                                        <div className='row'>
                                            <div className="col-12">
                                                <div className="single_product_thumb">
                                                    <div id="product_details_slider" className="carousel slide" data-ride="carousel">

                                                        <div>
                                                            <PhotoProvider
                                                                speed={() => 300}
                                                                easing={(type) =>
                                                                    type === 3
                                                                        ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
                                                                        : "cubic-bezier(0.34, 1.56, 0.64, 1)"
                                                                }
                                                                maskOpacity={0.5}
                                                                toolbarRender={({ onScale, scale }) => {
                                                                    return (
                                                                        <>
                                                                            <svg
                                                                                className="PhotoView-Slider__toolbarIcon"
                                                                                onClick={() => onScale(scale + 1)}
                                                                            />
                                                                            <svg
                                                                                className="PhotoView-Slider__toolbarIcon"
                                                                                onClick={() => onScale(scale - 1)}
                                                                            />
                                                                        </>
                                                                    );
                                                                }}
                                                            >
                                                                <div className="foo">
                                                                    {categories?.image && categories?.image?.length > 0 && (
                                                                        <PhotoView src={`https://avantgardeimages.alphanitesofts.net/${categories?.image[0]}`}>
                                                                            <img
                                                                                src={`https://avantgardeimages.alphanitesofts.net/${categories?.image[0]}`}
                                                                                alt=""
                                                                            />
                                                                        </PhotoView>
                                                                    )}

                                                                    <div className="row">
                                                                        {categories?.image &&
                                                                            categories?.image?.slice(1).map((item, index) => (
                                                                                <div key={index} className="col-lg-6  mt-3 mb-1">
                                                                                    <PhotoView src={`https://avantgardeimages.alphanitesofts.net/${item}`}>
                                                                                        <img
                                                                                            src={`https://avantgardeimages.alphanitesofts.net/${item}`}
                                                                                            alt=""
                                                                                        />
                                                                                    </PhotoView>
                                                                                </div>
                                                                            ))}
                                                                    </div>
                                                                </div>
                                                            </PhotoProvider>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>







                                </div>






                                <div className="col-12 col-md-7">
                                    <div className="single_product_desc">
                                        <h4 className="title mb-2" style={{ fontSize: "35px", fontWeight: 500 }}><a href="#">{categories.title}</a></h4>
                                        <h5 style={{ fontSize: "13px", fontWeight: 500 }}>{categories.instruction}</h5>
                                        <div className="single_product_ratings mb-15">
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star" aria-hidden="true" />
                                            <i className="fa fa-star-o" aria-hidden="true" />
                                        </div>
                                        <h4 className="price">{categories.price} /pkr</h4>
                                        <p className="available">Available: <span className="text-muted">In Stock</span></p>
                                        <p><div
                                            dangerouslySetInnerHTML={{ __html: categories.description }}
                                        /></p>

                                        {
                                            categories?.sub_datas?.map((items, index) => {
                                                return (
                                                    <>
                                                        <button className={`sizes-buttons ${articleSize === items.size ? 'selected' : ''}`}
                                                            key={index} onClick={() => setArticleSize(items.size)}>{items.size}</button>
                                                    </>
                                                )
                                            })
                                        }
                                        {
                                            errorText === true ? (
                                                <p className='text-danger mt-2' style={{ fontSize: "12px" }}>Please select size you, can view chart below</p>
                                            ) : null
                                        }
                                        <div className="cart mt-5 mb-5">
                                            <div className="quantity">
                                                <span className="qty-minus" onClick={minusCount}><i className="fa fa-minus" aria-hidden="true" /></span>
                                                <input type="number" className="qty-text" value={count} style={{ appearance: 'none' }} inputMode="numeric" />
                                                <span className="qty-plus" onClick={addCount}><i className="fa fa-plus" aria-hidden="true" /></span>
                                            </div>
                                            <button type="submit" name="addtocart" onClick={navigateToCart} className="cart-submit" >Add to cart</button>
                                        </div>
                                        <div id="accordion" role="tablist">
                                            <div className="card">
                                                <div className="card-header" role="tab" id="headingOne">
                                                    <h6 className="mb-0">
                                                        <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Information</a>
                                                    </h6>
                                                </div>
                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                                    <div className="card-body">
                                                        <p>- Premium textured cotton fabric</p>
                                                        <p>- Perfect slim fit</p>
                                                        <p>- Curved Bottom</p>
                                                        <p>- Standard high quality collar</p>
                                                        <img src={sizes} className='img-fluid' alt="sizes" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" role="tab" id="headingTwo">
                                                    <h6 className="mb-0">
                                                        <a className="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Material</a>
                                                    </h6>
                                                </div>
                                                <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                                                    <div className="card-body">
                                                        <p>{categories.material}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" role="tab" id="headingThree">
                                                    <h6 className="mb-0">
                                                        <a className="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Shipping &amp; Returns</a>
                                                    </h6>
                                                </div>
                                                <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                                                    <div className="card-body">
                                                        <p>7 Days return or exchange if the tag is not removed</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" role="tab" id="headingFour">
                                                    <h6 className="mb-0">
                                                        <a className="collapsed" data-toggle="collapse" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">Care Instructions</a>
                                                    </h6>
                                                </div>
                                                <div id="collapseFour" className="collapse" role="tabpanel" aria-labelledby="headingFour" data-parent="#accordion">
                                                    <div className="card-body">
                                                        <p>Hand Wash or machine gentle wash.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <p className='mt-3' style={{ cursor: "pointer" }} onClick={handleShareClick}>Share&nbsp;<i class="fa-solid fa-share-nodes" /></p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div >

            </div >
            {
                categories ?
                    <RelatedProducts id={categories.sub_categorys_id
                    } /> : null
            }
        </div >
    )
}

export default ProductDescription