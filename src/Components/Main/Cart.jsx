import React, { useEffect, useState } from 'react';
import DiscountArea from '../HomePage/DiscountArea';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import emptyCart from '../SourceFiles/Images/cart.png'
import { useRecoilState } from 'recoil';
import { cartCountState } from '../../Store/Atom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [itemsLeft, setItemsLeft] = useState();
    const [count, setCount] = useRecoilState(cartCountState);

    useEffect(() => {
        cartDataFromLocalStorage()
    }, []);

    useEffect(() => {
        topFunction();
    }, []);

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    const cartDataFromLocalStorage = () => {
        const getProductDataFromLocalStorage = () => {
            const productDataJSON = localStorage.getItem('productData');
            if (productDataJSON) {
                return JSON.parse(productDataJSON);
            } else {
                return [];
            }
        };
        const existingData = getProductDataFromLocalStorage();
        const updatedCartItems = existingData.map(item => ({ ...item, count: item.count }));
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItemsLength', updatedCartItems.length.toString());
        setCount(updatedCartItems.length.toString())
    }

    const updateCart = updatedCart => {
        setCartItems(updatedCart);
        localStorage.setItem('productData', JSON.stringify(updatedCart));
        localStorage.setItem('cartItemsLength', updatedCart.length.toString());
    };

    const pricesArray = [];
    cartItems.forEach(item => {
        const price = item.category.price;
        pricesArray.push(price);
    });

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            const price = parseFloat(item.category.price);
            const count = item.count;
            totalPrice += price * count;
        });
        return totalPrice;
    };

    const total = calculateTotalPrice();
    const addCount = (index, item) => {
        if (itemsLeft < item.count) {
            toast.warn("Out of stock")
        }
        else {
            const updatedCart = [...cartItems];
            updatedCart[index].count++;
            updateCart(updatedCart);
            reviewQuantity(item)
        }
        cartDataFromLocalStorage();
    };

    const minusCount = (index, item) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].count > 1) {
            updatedCart[index].count--;
            updateCart(updatedCart);
        } else {
            updatedCart.splice(index, 1);
            updateCart(updatedCart);
        }
        reviewQuantity(item)
        cartDataFromLocalStorage()

    };

    const clearCart = () => {
        localStorage.removeItem('productData')
        localStorage.removeItem("cartItemsLength")
        setInterval(() => {
            window.location.reload()
        }, 1000);
    }

    const deleteItem = index => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        updateCart(updatedCart);
        toast.warn("Item Removed")
        cartDataFromLocalStorage()
    };

    // Review API

    const reviewQuantity = (items) => {
        const formdata = new FormData();
        formdata.append("size", items.articleSize);
        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };
        fetch(`https://avantgarde.alphanitesofts.net/api/getQuantity/${items.id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.quantity)
                // toast.warn(`${result.quantity} Items left`)
                setItemsLeft(result.quantity)
            })
            .catch((error) => console.error(error));

    }

    return (
        <div>
            <DiscountArea />

            <div className="cart_area section_padding_100 clearfix">
                <div className="container">

                    {
                        cartItems.length === 0 ? (
                            <>
                                <div className='row'>
                                    <div className="col-lg-4 mx-auto">
                                        <img className='img-fluid' src={emptyCart} alt="empty-cart" />
                                        <h4 className='text-center'>Your Cart is empty</h4>
                                        <p className='text-center'>Oops! Looks like your cart is lonely. Start adding items to bring it to life!</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="row">

                                    <div className="col-12">
                                        <div className="cart-table clearfix">
                                            <table className="table table-responsive">
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Size</th>
                                                        <th>Total</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartItems.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="cart_product_img d-flex align-items-center">
                                                                <a>
                                                                    <img src={`https://avantgardeimages.alphanitesofts.net/${item.category.image[0]}`} alt="Product" />
                                                                </a>
                                                                <h6>{item.category.title}</h6>
                                                            </td>
                                                            <td className="total_price"><span>{item.category.price}</span></td>
                                                            <td className="qty">
                                                                <div className="quantity">
                                                                    <span className="qty-minus" onClick={() => minusCount(index, item)}><i className="fa fa-minus" aria-hidden="true" /></span>
                                                                    <input type="number" className="qty-text" value={item.count} style={{ appearance: 'none' }} inputMode="numeric" readOnly />
                                                                    <span className="qty-plus" onClick={() => addCount(index, item)}><i className="fa fa-plus" aria-hidden="true" /></span>
                                                                    {itemsLeft < item.count ? <p className='text-danger'>Out of Stock</p> : null}
                                                                </div>
                                                            </td>
                                                            <td className="price"><span>{item.articleSize}</span></td>
                                                            <td className="price"><span>{item.category.price * item.count}</span></td>
                                                            <td className="price" style={{ cursor: "pointer" }} onClick={() => deleteItem(index)}><i className='fa-solid fa-trash-can ms-4 text-danger' /></td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="cart-footer d-flex mt-30">
                                            <div className="back-to-shop w-50">
                                                <Link to='/'>Continue Shopping</Link>
                                            </div>
                                            <div className="update-checkout w-50 text-right">
                                                <a style={{ cursor: "pointer" }} onClick={clearCart}>clear cart</a>
                                                {/* <a style={{ cursor: "pointer" }} onClick={updateCart}>Update cart</a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {/* <div className="col-12 col-md-6 col-lg-4">
                                        <div className="coupon-code-area mt-70">
                                            <div className="cart-page-heading">
                                                <h5>Coupon code</h5>
                                                <p>Enter your Coupon code</p>
                                            </div>
                                            <form action="#">
                                                <input type="search" name="search" placeholder="#569ab15" />
                                                <button type="submit">Apply</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="shipping-method-area mt-70">
                                            <div className="cart-page-heading">
                                                <h5>Shipping method</h5>
                                                <p>Select the one you want</p>
                                            </div>
                                            <div className="custom-control custom-radio mb-30">
                                                <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" />
                                                <label className="custom-control-label d-flex align-items-center justify-content-between" htmlFor="customRadio1"><span>Next day delivery</span><span>$4.99</span></label>
                                            </div>
                                            <div className="custom-control custom-radio mb-30">
                                                <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" />
                                                <label className="custom-control-label d-flex align-items-center justify-content-between" htmlFor="customRadio2"><span>Standard delivery</span><span>$1.99</span></label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" id="customRadio3" name="customRadio" className="custom-control-input" />
                                                <label className="custom-control-label d-flex align-items-center justify-content-between" htmlFor="customRadio3"><span>Personal Pickup</span><span>Free</span></label>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="col-12 col-lg-4 ms-auto">
                                        <div className="cart-total-area mt-70">
                                            <div className="cart-page-heading">
                                                <h5>Cart total</h5>
                                                <p>Final info</p>
                                            </div>
                                            <ul className="cart-total-chart">
                                                {/* <div className='d-flex justify-content-between align-items-start'>
                                                    <li><span>Articles</span></li>
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        {cartItems.map((item, index) => (
                                                            <li className='mb-2' key={index}><span>{item.category.price * item.count} Pkr</span></li>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className='position-relative'>
                                                    <div className='position-absolute top-0 end-0 rounded bg-secondary' style={{ height: "1px", width: "100px" }} />
                                                </div> */}
                                                {/* <li className='mt-2'><span>Shipping</span><span>Free</span></li> */}
                                                <li><span><strong>Sub Total</strong></span> <span><strong>{total} pkr</strong></span></li>
                                                <li style={{ fontSize: "12px", marginBottom: "0px" }}>Tax included. Shipping calculated at checkout.</li>
                                            </ul>
                                            <Link to='/checkout' className="btn karl-checkout-btn">Proceed to checkout</Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }

                </div>
            </div>
        </div>

    );
};

export default Cart;
