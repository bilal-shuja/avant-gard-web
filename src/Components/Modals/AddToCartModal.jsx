import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import './modalStyles.scss'
import Loader from '../Loaders/Loader';

const AddToCartModal = ({ id, openCloseModal, modalShow }) => {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [articleSize, setArticleSize] = useState(null);
  const [errorText, setErrorText] = useState(false);

  useEffect(() => {
    getDataById()
  }, [])

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
          }
          else if (result.status === "401") {
            toast.warn(result.message)
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


  return (
    <div>
      <Modal
        show={modalShow}
        onHide={openCloseModal}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {
          loading === true ? (
            <>
              <Loader/>
            </>
          ) : (
            <>
              <div className="modal-content">
                <div className="modal-body">
                  <button type="button" className="close btn" data-dismiss="modal" aria-label="Close" onClick={openCloseModal}>
                    <span aria-hidden="true">×</span>
                  </button>
                  <div className="quickview_body">
                    <div className="container">
                      <div className="row">
                        <div className="col-12 col-lg-5">
                          <div className="quickview_pro_img">
                            {categories.image && categories?.image.length > 0 &&
                              <img src={`https://avantgardeimages.alphanitesofts.net/${categories?.image[0]}`} className='img-fluid' alt="product-image" />
                            }
                            {
                              categories?.on_sale === "true" ?
                                <div className="sale-tag">Sale</div> : null
                            }
                          </div>
                        </div>
                        <div className="col-12 col-lg-7">
                          <div className="quickview_pro_des">
                            <h4 className="title mb-0">{categories?.title}</h4>
                            <p className='mb-1'>{categories?.instruction}</p>
                            <div className="top_seller_product_rating mb-15 d-flex">
                              <div>
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                              </div>
                              <p style={{ fontSize: "14px" }}>&nbsp;2 Reviews</p>
                            </div>
                            {
                              categories?.on_sale === "true" ? (
                                <>
                                  <h5 className="price"><span>Pkr {categories?.price}</span> Pkr {categories?.sale_price}</h5>
                                </>
                              ) : (
                                <>
                                  <h5 className="price">Pkr. {categories?.price}</h5>
                                </>
                              )
                            }
                            <p><div dangerouslySetInnerHTML={{ __html: categories?.description }} /></p>
                            <h5>Size:</h5>
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
                                <p className='text-danger mt-2' style={{ fontSize: "12px", marginBottom: "-10px" }}>Please select size you, can view chart below</p>
                              ) : null
                            }
                            <br />
                            <Link to={`/Product-description/${id}`} className='product-info' style={{ fontSize: "13px" }}>View Full Product Details</Link>
                          </div>
                          {/* Add to Cart Form */}
                          <div className="cart mt-3">
                            <div className="quantity">
                              <span className="qty-minus" onClick={minusCount}><i className="fa fa-minus" aria-hidden="true" /></span>
                              <input type="number" className="qty-text" value={count} style={{ appearance: 'none' }} inputMode="numeric" />
                              <span className="qty-plus" onClick={addCount}><i className="fa fa-plus" aria-hidden="true" /></span>
                            </div>
                            <button type="submit" name="addtocart" onClick={navigateToCart} className="cart-submit" >Add to cart</button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }
      </Modal>
    </div>
  )
}

export default AddToCartModal