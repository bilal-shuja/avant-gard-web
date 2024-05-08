import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import '../Main/ShopNow/components/shopNowStyles.scss'
import "react-toastify/dist/ReactToastify.css";

import '../Main/styles.scss'
import AddToCartModal from '../Modals/AddToCartModal';

const RelatedProducts = ({ id }) => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [product_id, setProduct_id] = useState(null);
    const [fromPrice, setFromPrice] = useState(0)
    const [toPrice, setToPrice] = useState(0)

    const openCloseModal = (id) => {
        setModalShow((prev) => !prev)
        setProduct_id(id)
    }

    useEffect(() => {
        getCategories();
    }, [id])

    const getCategories = () => {
        if (id) {
            const requestOptions = {
                method: "POST",
                redirect: "follow"
            };

            fetch(`https://avantgarde.alphanitesofts.net/api/get_articles_by_sub_category_id/${id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    if (result.status === "200") {
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
            <section className="you_may_like_area clearfix">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section_heading text-center m-0 p-0">
                                <h2>related Products</h2>
                            </div>
                        </div>
                    </div>

                    <section className="shop_grid_area mt-5">
                        <div className="container">
                            <div className="row ">
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
                                                        categories.filter(item => item.is_live === 'true').map((items, index) => {
                                                            const delay = index * 0.2 + 0.1;
                                                            return (
                                                                <>
                                                                    <div className="col-6 col-sm-6 col-md-6 col-lg-3 ps-1 pe-1 wow fadeInUpBig" data-wow-delay={`${delay}s`}>
                                                                        <div className="product-img ">
                                                                            {
                                                                                items?.image?.length > 0 &&
                                                                                <img src={`https://avantgardeimages.alphanitesofts.net/${items.image[0]}`} className='img-fluid' alt="product-image" />
                                                                            }
                                                                            {
                                                                                items?.on_sale === "true" ?
                                                                                    <div className="sale-tag">Sale</div> : null
                                                                            }
                                                                        </div>
                                                                        <div className="product-description">
                                                                            <div className='details-box'>
                                                                                <p className='item-title'><span style={{ fontWeight: 500 }}>{items?.title}</span>&nbsp;&nbsp;({items?.article_prefix})</p>
                                                                                <p className='item-title' style={{ fontSize: "13px" }}>{items?.instruction ? items.instruction : null}</p>
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
                                                                                        items?.on_sale === "true" ? (
                                                                                            <>
                                                                                                <span className='product-price-line' style={{ marginBottom: "2px", textDecoration: "line-through", color: "#9f9fa5" }}>Rs. {items.price}</span>
                                                                                                <h4 className="product-price" style={{ fontSize: '18px', color: "#000" }}>&nbsp;Rs. {items?.sale_price}</h4>  </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <h4 className="product-price" style={{ fontSize: '18px', color: "#000" }}>&nbsp;Rs. {items?.price}</h4>
                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <Link target='_blank' to={`/Product-description/${items.article_id}`} className="add-to-cart-btn" style={{ marginTop: '16px' }}>VIEW PRODUCT</Link>
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

                                    <div className="shop_pagination_area wow fadeInUp mb-5" data-wow-delay="1.1s">
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
            </section>

        </div>
    )
}

export default RelatedProducts