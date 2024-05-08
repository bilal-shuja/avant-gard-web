import React, { useEffect, useState } from 'react'
import DiscountArea from '../HomePage/DiscountArea'
import './FormStyles.scss'
import { toast } from 'react-toastify'
import CreditCardImage from '../SourceFiles/Images/credit-card.png'
import { useNavigate } from "react-router-dom";
import citiesName from '../SourceFiles/CitiesList'
import Select from 'react-select';
import './GoPayFast'
import axios from 'axios'

const ItemForm = () => {

    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("cod")
    const [cartItems, setCartItems] = useState([]);

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState(null);
    const [discountCode, setDiscountCode] = useState("")
    const [discountedPrice, setDiscountedPrice] = useState(null)
    const [loading, setLoading] = useState(false);
    const [emailCheckBox, setEmailCheckbox] = useState(false)
    const [priceAfterDiscount, setPriceAfterDiscount] = useState(null)
    const [errorField, setErrorField] = useState(false)
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [ipAddress, setIpAddress] = useState('');

    useEffect(() => {
        topFunction();
    }, []);

    useEffect(() => {
        const getProductDataFromLocalStorage = () => {
            const productDataJSON = localStorage.getItem('productData');

            if (productDataJSON) {
                return JSON.parse(productDataJSON);
            } else {
                return [];
            }
        };
        const existingData = getProductDataFromLocalStorage();
        const updatedCartItems = existingData?.map(item => ({ ...item, count: item.count }));
        setCartItems(updatedCartItems);
    }, []);

    useEffect(() => {
        const fetchIpAddress = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                const { ip } = data;
                setIpAddress(ip);
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        };

        fetchIpAddress();
    }, []);

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // total price
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

    const data = cartItems.map(item => {
        const subData = item?.category?.sub_datas?.find(subItem => subItem.size === item.articleSize);
        const p_id = subData ? subData?.p_id : null;
        // console.log(p_id)
        return {
            article_id: item.id,
            pre_post: item.category.pre_post,
            p_id: p_id || "00SCS",
            is_scanned: 0,
            size: item.articleSize,
            qty: item.count,
            total_price: total,
            single_price: total + 200,
            actual_single_price: total,
            on_sale: item.category.on_sale
        };
    });

    const formSubmit = () => {
        if (email === "" || firstName === "" || lastName === "" || address === "" || city === "" || postalCode === "" || phoneNumber === "") {
            toast.warn("Please fill all fields")
            setErrorField(true)
        }
        else {
            if (paymentMethod === "cod") {
                sendData()
            }
            else if (paymentMethod === "online") {
                goPayFastPayment()
            }
            else if (paymentMethod === "bank") {
                toast.warn("Please send the payment screenshot to our whatsapp number")
            }
        }
    }

    const sendData = () => {
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            // total: parseInt(total),
            total: priceAfterDiscount === null ? parseInt(total) : priceAfterDiscount,
            sub_total: parseInt(total),
            user_id: 1,
            role_id: 1,
            added_by: "customer",
            gst: 0,
            p_oid: "NULL",
            return_status: "NULL",
            return_article: null,
            returned_amount: null,
            amount_paid: null,
            amount_left: null,
            total_bill: null,
            approved_amount: null,
            discount: discountedPrice === null ? 0 : discountedPrice,
            manual: "false",
            delivery_method: paymentMethod,
            shipping_address: address,
            paid: paymentMethod === "cod" ? "false" : "true",
            status: "online",
            cod: paymentMethod === "cod" ? "true" : "false",
            payment_method: paymentMethod,
            ledger_description: "Title",
            vat: 0,
            order_data: data,
            billing_data: {
                phone: parseInt(phoneNumber),
                address: address,
                city: city,
                postcode: postalCode,
                state: state,
            },
            contact_data: {
                phone: parseInt(phoneNumber),
                name: phoneNumber,
                email: email,
            },
            shipping_data: {
                phone: parseInt(phoneNumber),
                address: address,
                city: city,
                postcode: postalCode,
                state: state,
            },
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://avantgarde.alphanitesofts.net/api/post_order", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false)
                if (result?.status === "200") {
                    toast.success("Order Placed Successfully")
                    sendUserEmail(result?.order_id)
                    localStorage.removeItem('productData')
                    localStorage.removeItem("cartItemsLength")
                    setInterval(() => {
                        navigateToSuccessPage(result?.order_id)
                    }, 1500);
                }
                else {
                    toast.warn(result?.message)
                }
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
                toast.warn("Something went wrong")
            });


        if (emailCheckBox === true) {
            setLoading(true)
            const formdata = new FormData();
            formdata.append("email", email);

            const requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow"
            };

            fetch("https://avantgarde.alphanitesofts.net/api/post_user_email", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    toast.success("Thanks for subscribing to us")
                    setLoading(false)
                })
                .catch((error) => {
                    console.error(error)
                    toast.success("Something went wrong")
                    setLoading(false)
                });
        }
    }

    const navigateToSuccessPage = (id) => {
        navigate("/SuccessPage", { state: id });
    };

    const content = `Dear ${firstName} ${lastName},\n\nThank you so much for choosing Avant Garde for your recent purchase! We truly appreciate your trust in us and are thrilled that you've chosen our products.\n\nYour satisfaction is our top priority, and we're committed to ensuring that you have a seamless experience with us. If you have any questions or need further assistance, please don't hesitate to reach out to our customer support team at info@avantgardeoriginal.com / 0321-7593759.\n\nWe hope you enjoy your new Product and that it brings you joy and value. Your support means the world to us, and we look forward to serving you again in the future.\n\nWarm regards,\n\nAvant Grade\n0321-7593759\ninfo@avantgardeoriginal.com`

    const sendUserEmail = (id) => {
        const formdata = new FormData();
        formdata.append("email", email);
        formdata.append("subject", `Order id ${id}`);
        formdata.append("message", content)

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch("https://avantgarde.alphanitesofts.net/api/send_email", requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    const checkDiscountCode = () => {
        if (discountCode === "") {
            toast.warn("Please enter a promo code")
        }
        else {

            const formdata = new FormData();
            formdata.append("code", discountCode);
            formdata.append("total_bill", total);

            const requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow"
            };

            fetch("https://avantgarde.alphanitesofts.net/api/check_code", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result?.status === "200") {
                        setPriceAfterDiscount(result?.total_bill)
                        setDiscountedPrice(result?.discounted_price)
                    }
                    else if (result?.status === "401") {
                        toast.warn(result?.message)
                    }
                })
                .catch((error) => console.error(error));
        }
    }

    const items = [
        {
            SKU: 'SAMPLE-SKU-01',
            NAME: 'An Awesome Dress',
            PRICE: 150,
            QTY: 2
        },
        {
            SKU: 'SAMPLE-SKU-02',
            NAME: 'Ice Cream',
            PRICE: 45,
            QTY: 5
        }
    ];
    const goPayFastPayment = () => {

        const formdata = new FormData();
        formdata.append("MERCHANT_ID", "102");
        formdata.append("SECURED_KEY", "zWHjBp2AlttNu1sK");
        formdata.append("BASKET_ID", "olp9");
        formdata.append("TXNAMT", total);
        // formdata.append("TXNAMT", ");

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch("https://glowx.alphanitesofts.net/api/generateToken", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                processPayment(result?.ACCESS_TOKEN, result?.NAME, result?.GENERATED_DATE_TIME)
            })
            .catch((error) => {
                console.log(error)
                toast.warn("Something went wrong...")
            });

    }

    const processPayment = (token, name, time) => {
        const formdata = new FormData();
        formdata.append("CURRENCY_CODE", "PKR");
        formdata.append("MERCHANT_ID", 102);
        formdata.append("MERCHANT_NAME", "AVANT GARDE");
        formdata.append("TOKEN", token);
        formdata.append("BASKET_ID", "olp9");
        formdata.append("TXNAMT", total);
        formdata.append("TRANSACTION_INSTRUMENT", "1");
        formdata.append("ORDER_DATE", "2024-04-26");
        formdata.append("SUCCESS_URL", "http://localhost:3000/SuccessPage");
        formdata.append("FAILURE_URL", "http://localhost:3000/checkout");
        formdata.append("CHECKOUT_URL", "http://localhost:3000/checkout");
        formdata.append("CUSTOMER_EMAIL_ADDRESS", "faraz.m4765@gmail.com");
        formdata.append("CUSTOMER_MOBILE_NO", "03034450790");
        formdata.append("SIGNATURE", "SOMERANDOMSTRINGS");
        formdata.append("VERSION", "MERCHANTCART-0.1");
        formdata.append("TXNDESC", "T-Shirts");
        formdata.append("PROCCODE", "00");
        // formdata.append("TRAN_TYPE", "ECOMM_PURCHASE");
        // formdata.append("STORE_ID", "102");
        formdata.append("RECURRING_TXN", "TRUE");
        formdata.append("MERCHANT_USERAGENT", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0");
        formdata.append("STORE_ID", items);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch("https://glowx.alphanitesofts.net/api/processPayment", requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        // const formDataObj = {
        //     CURRENCY_CODE: "PKR",
        //     MERCHANT_ID: "102",
        //     MERCHANT_NAME: "AVANT GARDE",
        //     TOKEN: token,
        //     BASKET_ID: "002",
        //     TXNAMT: total,
        //     TRANSACTION_INSTRUMENT: "",
        //     ORDER_DATE: "2024-04-25 11:33:12",
        //     SUCCESS_URL: "http://localhost:3000/SuccessPage",
        //     FAILURE_URL: "http://localhost:3000/checkout",
        //     CHECKOUT_URL: "",
        //     CUSTOMER_EMAIL_ADDRESS: "faraz.m4765@gmail.com",
        //     CUSTOMER_MOBILE_NO: "03034450790",
        //     SIGNATURE: "SOMERANDOMSTRINGS",
        //     VERSION: "MERCHANTCART-0.1",
        //     TXNDESC: "T-Shirts",
        //     PROCCODE: "00",
        //     TRAN_TYPE: "ECOMM_PURCHASE",
        //     STORE_ID: "",
        //     RECURRING_TXN: "TRUE",
        //     MERCHANT_USERAGENT: "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
        // };

        // axios.post("https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction", formDataObj)
        //     .then((result) => {
        //         console.log(result)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //         toast.warn("Something went wrong...")
        //     });
    }

    return (
        <div>
            <DiscountArea />
            <div>
                <div className='row'>
                    <div className='col-lg-7'>
                        <div className='row'>
                            <div className='col-lg-10 ms-auto'>
                                <div className="container mt-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label input-head">Contact</label>
                                        <input type="email" style={{ border: errorField === true && firstName === "" ? "1px Solid red" : null }} className="form-control mt-2 mb-1 input-styles" onChange={(e) => setEmail(e.target.value)} id="exampleFormControlInput1" placeholder="Email" />
                                    </div>
                                    <div className="form-check ms-1">
                                        <input className="form-check-input" onChange={(e) => setEmailCheckbox(e.target.checked)} checked={emailCheckBox} type="checkbox" id="flexCheckDefault" />
                                        <label className="form-check-label" style={{ fontSize: "13px" }} htmlFor="flexCheckDefault">
                                            Email me with news Letters and offers
                                        </label>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label input-head">Delivery</label>
                                        <select className="form-select input-styles" aria-label="Default select example">
                                            <option value={"Pakistan"}>Pakistan</option>
                                        </select>
                                        <div className='row'>
                                            <div className="col-lg-6">
                                                <input type="text" onChange={(e) => setFirstName(e.target.value)} style={{ border: errorField === true && firstName === "" ? "1px Solid red" : null }} className="form-control input-styles mt-2 mb-1" id="exampleFormControlInput1" placeholder="First Name" />
                                            </div>
                                            <div className="col-lg-6">
                                                <input type="text" onChange={(e) => setLastName(e.target.value)} style={{ border: errorField === true && lastName === "" ? "1px Solid red" : null }} className="form-control input-styles mt-2 mb-1" id="exampleFormControlInput1" placeholder="Last Name" />
                                            </div>
                                        </div>
                                        <textarea onChange={(e) => setAddress(e.target.value)} style={{ border: errorField === true && address === "" ? "1px Solid red" : null }} className="form-control input-styles mt-2 mb-1" id="exampleFormControlTextarea1" rows={2} placeholder='Complete Address' />

                                        <select onChange={(e) => setCity(e.target.value)} style={{ border: errorField === true && city === "" ? "1px Solid red" : null }} className="form-select input-styles mt-2 mb-1" aria-label="Default select example">
                                            <option value={"Select your city"}>Select your city</option>
                                            {
                                                citiesName.map((city, index) => {
                                                    return (
                                                        <>
                                                            <option key={index} value={city.label}>{city.label}</option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </select>

                                        {/* <Select style={{ border: errorField === true && city === null ? "1px Solid red" : null }}
                                            defaultValue={city}
                                            onChange={setCity}
                                            options={citiesName}
                                        /> */}

                                        {/* <input type="text" onChange={(e) => setCity(e.target.value)} style={{ border: errorField === true && city === "" ? "1px Solid red" : null }} className="form-control input-styles mt-2 mb-1" id="exampleFormControlInput1" placeholder="City" /> */}
                                        <div className='row'>
                                            <div className="col-lg-6">
                                                <input type="text" onChange={(e) => setState(e.target.value)} style={{ border: errorField === true && state === "" ? "1px Solid red" : null }} className="form-control input-styles mt-2 mb-1" id="exampleFormControlInput1" placeholder="State" />
                                            </div>
                                            <div className="col-lg-6">
                                                <input type="text" onChange={(e) => setPostalCode(e.target.value)} style={{ border: errorField === true && postalCode === "" ? "1px Solid red" : null }} className="form-control input-styles mt-2 mb-1" id="exampleFormControlInput1" placeholder="Postal Code" />
                                            </div>
                                        </div>
                                        <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} style={{ border: errorField === true && phoneNumber === "" ? "1px Solid red" : null }} className="form-control input-styles mt-2 mb-1" id="exampleFormControlInput1" placeholder="Phone Number" />
                                        <div className="form-check ms-1">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault" style={{ fontSize: "13px" }}>
                                                Save this info for the next Time
                                            </label>
                                        </div>
                                        <div className="form-check ms-1">
                                            <input className="form-check-input" type="checkbox" onChange={(e) => setEmailCheckbox(e.target.checked)} checked={emailCheckBox} id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault" style={{ fontSize: "13px" }}>
                                                Email me with news Letters and offers
                                            </label>
                                        </div>

                                        {/* <div className="mb-3 mt-2">
                                            <label htmlFor="exampleFormControlInput1" className="form-label input-head">Shipping Method</label>
                                            <input type="email" className="form-control  mt-2 mb-1 input-styles" id="exampleFormControlInput1" placeholder="Email" />
                                        </div>

                                        <div className="mb-3 mt-2">
                                            <label htmlFor="exampleFormControlInput1" className="form-label input-head">Contact</label>
                                            <input type="email" className="form-control  mt-2 mb-1 input-styles" id="exampleFormControlInput1" placeholder="Email" />
                                        </div> */}


                                        <div className='checkout_details_area clearfix'>
                                            <div className="cart-page-heading mb-3 mt-4">
                                                <h5>Shipping Method</h5>
                                            </div>
                                            <div className="row">
                                                <div className='col-12'>
                                                    <div className='card' style={{ backgroundColor: "#F5F5F5", border: "1px solid #b8b8b8" }}>
                                                        <div className="card-body m-0 pt-2 pb-2 ps-3 pe-3">
                                                            <div className="d-flex justify-content-between align-items-end">
                                                                <p className='mt-2'>Standard Shipping</p>
                                                                <p style={{ fontWeight: 600 }}>Rs. 200</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='checkout_details_area clearfix'>
                                            <div className="cart-page-heading mb-3 mt-4">
                                                <h5>Payment Method</h5>
                                                <p>All transactions are secure and encrypted.</p>
                                            </div>
                                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header " id="panelsStayOpen-headingOne" onClick={() => setPaymentMethod("online")}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                                                            <input
                                                                type="radio"
                                                                style={{ marginRight: '10px' }}
                                                                checked={paymentMethod === "online" ? true : false}
                                                                readOnly
                                                            />
                                                            PAYFAST(Pay via Debit/Credit/Wallet/Bank Account)
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                                                        <div className="accordion-body">
                                                            <img src={CreditCardImage} style={{ height: "40px" }} className='mx-auto' alt="" />
                                                            <p> After clicking “Pay now”, you will be redirected to PAYFAST(Pay via Debit/Credit/Wallet/Bank Account) to complete your purchase securely.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo" onClick={() => setPaymentMethod("cod")}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                                            <input
                                                                type="radio"
                                                                style={{ marginRight: '10px' }}
                                                                checked={paymentMethod === "cod" ? true : false}
                                                                readOnly
                                                            />
                                                            Cash on Delivery (COD)
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                                        <div className="accordion-body">
                                                            Pay cash on delivery.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingThree" onClick={() => setPaymentMethod("bank")}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                                            <input
                                                                type="radio"
                                                                style={{ marginRight: '10px' }}
                                                                checked={paymentMethod === "bank" ? true : false}
                                                                readOnly
                                                            />
                                                            Bank Deposit
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                                        <div className="accordion-body">
                                                            Make your payment directly into our bank account. Please email a screenshot for proof of payment along with your order number at info@avantgardeoriginal.com. Your order will not be shipped until the funds have cleared in our account.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 mb-5">
                                        {
                                            loading === true ?
                                                <button className='pay-now-btn'><i className='fa fa-solid fa-spinner fa-spin' /></button> :
                                                <button onClick={formSubmit} className='pay-now-btn'>ORDER NOW</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-5' style={{ backgroundColor: "#f5f5f5", position: "sticky" }}>
                        <div className='row ms-2 mt-5'>
                            {
                                cartItems.map((items) => {
                                    return (
                                        <div className='col-lg-10 mb-4'>
                                            <div className='d-flex align-items-start position-relative'>
                                                <div className='position-absolute' style={{ top: -10, left: -10 }}>
                                                    <div className='bg-secondary text-white rounded-circle' style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span style={{ fontSize: '14px', fontWeight: 600 }}>{items.count}</span>
                                                    </div>
                                                </div>
                                                <img src={`https://avantgardeimages.alphanitesofts.net/${items.category.image[0]}`} alt="product image" className='img-fluid' style={{ height: "75px" }} />
                                                <div className='flex-grow-1 ms-2'>
                                                    <p className='mb-0' style={{ fontSize: "15px", fontWeight: 600 }} >{items.category.title}</p>
                                                    <p className='mt-0' style={{ fontSize: "12px", fontWeight: 500 }}>{items.articleSize}</p>
                                                </div>
                                                <p className='me-3' style={{ fontSize: "15px", fontWeight: 600 }}>Rs {items.category.price}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className='col-lg-10'>
                                <div className='d-flex align-items-center justify-content-start'>
                                    <input type="text" onChange={(e) => setDiscountCode(e.target.value)} className="form-control mt-2 mb-1 input-styles" id="exampleFormControlInput1" placeholder="Discount code or gift card" />
                                    <button className='btn btn-outline-secondary ms-2 input-styles' onClick={checkDiscountCode}>APPLY</button>
                                </div>
                                <div>
                                    <div className='d-flex justify-content-between mt-3'>
                                        <p className='mb-0' style={{ fontSize: "15px", fontWeight: 500 }}>Sub-Total</p>
                                        <p className='mb-0' style={{ fontSize: "15px", fontWeight: 600 }}>Rs {total}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p className='mt-1' style={{ fontSize: "15px", fontWeight: 500 }}>Shipping</p>
                                        <p className='mt-1' style={{ fontSize: "15px", fontWeight: 600 }}>Free</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p className='mt-1' style={{ fontSize: "15px", fontWeight: 500 }}>Total</p>
                                        <p className='mt-1' style={{ fontSize: "22px", fontWeight: 700 }}><span style={{ fontSize: "10px", fontWeight: 400, color: "gray" }}>PKR</span> Rs {priceAfterDiscount === null ? total : priceAfterDiscount}</p>
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

export default ItemForm                      