import React from 'react'

const ItemInfo = () => {
    return (
        <div>

            <div className="modal fade" id="quickview" tabIndex={-1} role="dialog" aria-labelledby="quickview" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" className="close btn" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="modal-body">
                            <div className="quickview_body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-lg-5">
                                            <div className="quickview_pro_img">
                                                <img src="img/product-img/product-1.jpg" alt />
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-7">
                                            <div className="quickview_pro_des">
                                                <h4 className="title">Boutique Silk Dress</h4>
                                                <div className="top_seller_product_rating mb-15">
                                                    <i className="fa fa-star" aria-hidden="true" />
                                                    <i className="fa fa-star" aria-hidden="true" />
                                                    <i className="fa fa-star" aria-hidden="true" />
                                                    <i className="fa fa-star" aria-hidden="true" />
                                                    <i className="fa fa-star" aria-hidden="true" />
                                                </div>
                                                <h5 className="price">$120.99 <span>$130</span></h5>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia expedita quibusdam aspernatur, sapiente consectetur accusantium perspiciatis praesentium eligendi, in fugiat?</p>
                                                <a href="#">View Full Product Details</a>
                                            </div>
                                            {/* Add to Cart Form */}
                                            <form className="cart" method="post">
                                                <div className="quantity">
                                                    <span className="qty-minus" onClick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) && qty > 1 ) effect.value--;return false;"><i className="fa fa-minus" aria-hidden="true" /></span>
                                                    <input type="number" className="qty-text" id="qty" step={1} min={1} max={12} name="quantity" defaultValue={1} />
                                                    <span className="qty-plus" onClick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"><i className="fa fa-plus" aria-hidden="true" /></span>
                                                </div>
                                                <button type="submit" name="addtocart" value={5} className="cart-submit">Add to cart</button>
                                                {/* Wishlist */}
                                                <div className="modal_pro_wishlist">
                                                    <a href="wishlist.html" target="_blank"><i className="ti-heart" /></a>
                                                </div>
                                                {/* Compare */}
                                                <div className="modal_pro_compare">
                                                    <a href="compare.html" target="_blank"><i className="ti-stats-up" /></a>
                                                </div>
                                            </form>
                                            <div className="share_wf mt-30">
                                                <p>Share With Friend</p>
                                                <div className="_icon">
                                                    <a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a>
                                                    <a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a>
                                                    <a href="#"><i className="fa fa-pinterest" aria-hidden="true" /></a>
                                                    <a href="#"><i className="fa fa-google-plus" aria-hidden="true" /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ItemInfo