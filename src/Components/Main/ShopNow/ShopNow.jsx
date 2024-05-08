import React, { useState, useEffect } from 'react'
import DiscountArea from '../../HomePage/DiscountArea'
import SideFilters from './components/SideFilters'
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import './components/shopNowStyles.scss'
import "react-toastify/dist/ReactToastify.css";

import '../styles.scss'
import nodata from '../../SourceFiles/Images/no-data.png'
import empty from '../../SourceFiles/Images/error.jpg'
import AddToCartModal from '../../Modals/AddToCartModal';

toast.configure();
const ShopNow = () => {
    const { id } = useParams();
    const category_id = id;
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [product_id, setProduct_id] = useState(null);
    const [fromPrice, setFromPrice] = useState(0)
    const [toPrice, setToPrice] = useState(0)

    const [filteredCategories, setFilteredCategories] = useState([]);


    useEffect(() => {
        if (fromPrice > 0 && toPrice > 0) {
            const filtered = categories.filter(item => {
                const price = parseFloat(item.sale_price);
                return price >= fromPrice && price <= toPrice;
            });
            setFilteredCategories(filtered);
        } else {
            setFilteredCategories(categories);
        }
    }, [fromPrice, toPrice, categories]);

    useEffect(() => {
        getCategories();
    }, [id])

    useEffect(() => {
        topFunction();
    }, []);


    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    const openCloseModal = (id) => {
        setModalShow((prev) => !prev)
        setProduct_id(id)
    }

    const getCategories = () => {
        if (category_id) {
            const requestOptions = {
                method: "POST",
                redirect: "follow"
            };

            fetch(`https://avantgarde.alphanitesofts.net/api/get_articles_by_sub_category_id/${category_id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    if (result.status === "200") {
                        console.log(result.data)
                        setCategories(result?.data)
                    }
                    else if (result.status === "401") {
                        toast.warn(result?.message)
                    }
                    else {
                        console.log("error in fetch_all_users")
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    return (
        <div>
            <DiscountArea />
            <div className='d-flex justify-content-between container-fluid mt-3'>
                <div>
                    <div className='d-flex ms-2'>
                        {/* <div className=''>Filter</div> */}
                        <div className=''>
                            <div className="dropdown">
                                <a className=" dropdown-toggle drop-downs" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    Availability
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li>
                                        <div className='d-flex justify-content-between'>
                                            <a className="dropdown-item" href="#">0 Selected</a>
                                            <a className="dropdown-item" href="#">Rest</a>
                                        </div>
                                    </li>
                                    <hr />
                                    <li style={{ color: "#000" }}><a style={{ backgroundColor: "#fff", color: "#000" }} className="dropdown-item" href="#">Rs <input onChange={(e) => setFromPrice(e.target.value)} placeholder='From' /> Rs <input onChange={(e) => setToPrice(e.target.value)} placeholder='To' /></a></li>
                                    {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                                </ul>
                            </div>

                        </div>
                        <div className='ms-2'>
                            <div className="dropdown">
                                <a className=" dropdown-toggle drop-downs" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    Price
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <div className=''>
                        {/* <div className=''>Filter</div> */}
                        <div className="dropdown">
                            <a className="dropdown-toggle drop-downs" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                Relevance
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <section className="shop_grid_area">
                <div className="container">
                    <div className="row">
                        <h1 className='mb-2'>{categories[0]?.sub_cat_name}</h1>
                        <div className="col-12">
                                <div className="row">
                                    {
                                        loading === true ? (
                                            <>
                                                <div className='row'>
                                                    <div className="col-lg-3">
                                                        <div className="cardx">
                                                            <div className="card-imgx skeleton">
                                                            </div>
                                                            <div className="card-bodyx">
                                                                <p className="card-introx skeleton">
                                                                </p>
                                                                <h2 className="card-titlex skeleton">
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="cardx">
                                                            <div className="card-imgx skeleton">
                                                            </div>
                                                            <div className="card-bodyx">
                                                                <p className="card-introx skeleton">
                                                                </p>
                                                                <h2 className="card-titlex skeleton">
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) :
                                            (
                                                filteredCategories
                                                    .filter(item => item.is_live === 'true').map((items, index) => {
                                                        const delay = index * 0.2 + 0.1;
                                                        return (
                                                            <>
                                                                <div className="col-6 col-sm-6 col-md-6 col-lg-3 ps-1 pe-1 single_gallery_item wow fadeInUpBig" data-wow-delay={`${delay}s`}>
                                                                    <div className="product-img ">
                                                                        {
                                                                            items?.image?.length > 0 &&
                                                                            <img src={`https://avantgardeimages.alphanitesofts.net/${items.image[0]}`} className='img-fluid' alt="product-image"  />
                                                                        }
                                                                    </div>
                                                                    <div className="product-description">
                                                                        <div className='details-box'>
                                                                        <p style={{ fontWeight: 380 }}><span style={{ fontWeight: 400 }}>{items?.title}</span >&nbsp;&nbsp;({items?.article_prefix})</p>
                                                                            {/* <p className='item-title'><span style={{ fontWeight: 400 }}>{items?.title}</span>&nbsp;&nbsp;({items?.article_prefix})</p> */}
                                                                            <p className='item-title' style={{ fontSize: "13px", fontWeight:300 }}>{items?.instruction ? items.instruction : null}</p>
                                                                            <div className='d-flex align-items-center'>
                                                                                <i className='fa-solid fa-star' />
                                                                                <i className='fa-solid fa-star' />
                                                                                <i className='fa-solid fa-star' />
                                                                                <i className='fa-solid fa-star' />
                                                                                <i className='fa-solid fa-star' />
                                                                                <p className='ms-1'>&nbsp;2 reviews</p>
                                                                            </div>
                                                                            <div className='d-flex align-items-end mt-2'>
                                                                                {
                                                                                    items.on_sale === "true" ? (
                                                                                        <>
                                                                                            <span className='product-price-line' style={{ marginBottom: "2px", textDecoration: "line-through", color: "#9f9fa5" }}>Rs. {items.price}</span>
                                                                                            <h4 className="product-price" style={{ fontSize: '18px', color: "#000" , fontWeight:200 }}>&nbsp;Rs. {items.sale_price}</h4>  </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <h4 className="product-price" style={{ fontSize: '18px', color: "#000" , fontWeight:200 }}>&nbsp;Rs. {items.price}</h4>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <a onClick={() => openCloseModal(items.article_id)} className="add-to-cart-btn" style={{ marginTop: '16px' }}>ADD TO CART</a>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                            )
                                    }

                                </div>
                            </div>

                            {
                                modalShow === true ?
                                    <AddToCartModal id={product_id} modalShow={modalShow} openCloseModal={openCloseModal} /> : null
                            }

                            <div className="shop_pagination_area wow fadeInUp mb-5 mt-5" data-wow-delay="1.1s">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination pagination-sm">
                                        <li className="page-item active"><a className="page-link" >01</a></li>
                                        <li className="page-item"><a className="page-link" >02</a></li>
                                        <li className="page-item"><a className="page-link" >03</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                   
                </div>
            </section>
        </div>
    )
}

export default ShopNow