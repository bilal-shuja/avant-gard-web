// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function PayFastForm() {
//     const [merchantId, setMerchantId] = useState(102);
//     const [securedKey, setSecuredKey] = useState('zWHjBp2AlttNu1sK');
//     const [token, setToken] = useState('');
//     const [transactionAmount, setTransactionAmount] = useState('');
//     const [basketId, setBasketId] = useState('');
//     const [successUrl, setSuccessUrl] = useState('http://merchant-site-example.com');
//     const [failureUrl, setFailureUrl] = useState('http://merchant-site-example.com');
//     const [checkoutUrl, setCheckoutUrl] = useState('https://typedwebhook.');
//     const [customerEmail, setCustomerEmail] = useState('some-email@example.com');
//     const [customerMobile, setCustomerMobile] = useState('');
//     const [orderDate, setOrderDate] = useState(new Date().toISOString());
//     const [recurringTxn, setRecurringTxn] = useState('true');

//     useEffect(() => {
//         async function fetchToken() {
//             try {
//                 const response = await axios.post(
//                     'https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken',
//                     //   {
//                     //     MERCHANT_ID: merchantId,
//                     //     SECURED_KEY: securedKey,
//                     //     // You can add more parameters here if needed
//                     //   }
//                     {
//                         MERCHANT_ID: merchantId,
//                         SECURED_KEY: securedKey,
//                         BASKET_ID: "",

//                     }
//                 );
//                 const data = response.data;
//                 if (data.ACCESS_TOKEN) {
//                     setToken(data.ACCESS_TOKEN);
//                 }
//             } catch (error) {
//                 console.error('Error fetching token:', error);
//             }
//         }
//         fetchToken();
//     }, [merchantId, securedKey]);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle form submission logic here, e.g., send data to your server
//     };

//     return (
//         <div>
//             <h1>PayFast Example Code For Redirection Payment Request</h1>
//             <form id="PayFast_payment_form" name="PayFast-payment-form" onSubmit={handleSubmit}>
//                 Currency Code: <input type="text" name="CURRENCY_CODE" value="PKR" /><br />
//                 Merchant ID: <input type="text" name="MERCHANT_ID" value={merchantId} readOnly /><br />
//                 Token: <input type="text" name="TOKEN" value={token} readOnly /><br />
//                 Success URL: <input type="text" name="SUCCESS_URL" value={successUrl} readOnly /><br />
//                 Failure URL: <input type="text" name="FAILURE_URL" value={failureUrl} readOnly /><br />
//                 Checkout URL: <input type="text" name="CHECKOUT_URL" value={checkoutUrl} readOnly /><br />
//                 Customer Email: <input type="text" name="CUSTOMER_EMAIL_ADDRESS" value={customerEmail} readOnly /><br />
//                 Customer Mobile: <input type="text" name="CUSTOMER_MOBILE_NO" value={customerMobile} onChange={(e) => setCustomerMobile(e.target.value)} /><br />
//                 Transaction Amount: <input type="text" name="TXNAMT" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)} /><br />
//                 Basket ID: <input type="text" name="BASKET_ID" value={basketId} onChange={(e) => setBasketId(e.target.value)} /><br />
//                 Transaction Date: <input type="text" name="ORDER_DATE" value={orderDate} readOnly /><br />
//                 <div className="form-group">
//                     <label>RECURRING_TXN</label>
//                     <input id="RECURRING_TXN" name="RECURRING_TXN" value={recurringTxn} readOnly />
//                 </div>
//                 <input type="submit" value="SUBMIT" />
//             </form>
//         </div>
//     );
// }

// export default PayFastForm;




// import React, { useState, useEffect } from 'react';

// function PayFastPaymentForm() {
//     const [token, setToken] = useState('');
//     const [transactionAmount, setTransactionAmount] = useState('');
//     const [basketId, setBasketId] = useState('pop2');
//     const merchantId = 102;
//     const securedKey = "zWHjBp2AlttNu1sK";
//     const [responseMessage, setResponseMessage] = useState('');

//     const [successUrl, setSuccessUrl] = useState('http://merchant-site-example.com');
//     const [failureUrl, setFailureUrl] = useState('http://merchant-site-example.com');
//     const [checkoutUrl, setCheckoutUrl] = useState('https://typedwebhook.');
//     const [customerEmail, setCustomerEmail] = useState('some-email@example.com');
//     const [customerMobile, setCustomerMobile] = useState('');
//     const [orderDate, setOrderDate] = useState(new Date().toISOString());
//     const [recurringTxn, setRecurringTxn] = useState('true');

//     // useEffect(() => {
//     //     getToken();
//     // }, []);

//     const getToken = async () => {
//         const formdata = new FormData();
//         formdata.append("MERCHANT_ID", "102");
//         formdata.append("SECURED_KEY", "zWHjBp2AlttNu1sK");
//         formdata.append("BASKET_ID", "pop2");
//         formdata.append("TXNAMT", "1000");

//         const requestOptions = {
//           method: "POST",
//           body: formdata,
//           redirect: "follow"
//         };

//         fetch("https://glowx.alphanitesofts.net/api/generateToken", requestOptions)
//           .then((response) => response.json())
//           .then((result) => console.log(result))
//           .catch((error) => console.error(error));
//     };

//     // async function getToken() {
//     //     const txnAmt = 2000

//     //     const url = 'https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken';

//     //     const data = {
//     //         MERCHANT_ID: merchantId,
//     //         SECURED_KEY: securedKey,
//     //         BASKET_ID: basketId,
//     //         TXNAMT: txnAmt,
//     //     };

//     //     const options = {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify(data),
//     //     };

//     //     try {
//     //         const response = await fetch(url, options);

//     //         if (!response.ok) {
//     //             throw new Error(`Error fetching access token: ${response.statusText}`);
//     //         }

//     //         const responseData = await response.json();
//     //         console.log(responseData)
//     //         //   return responseData; // { MERCHANT_ID, ACCESS_TOKEN, NAME, GENERATED_DATE_TIME }
//     //     } catch (error) {
//     //         console.error('Error generating access token:', error);
//     //         throw error; // Re-throw for handling in your React component
//     //     }
//     // }

//     // console.log("token", token)

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         formData.append('TOKEN', token);
//         formData.append('TXNAMT', transactionAmount);
//         formData.append('BASKET_ID', basketId);

//         const response = await fetch('https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction', {
//             method: 'POST',
//             body: formData,
//         });
//         const responseData = await response.json();
//         if (responseData.err_code === '000' || responseData.err_code === '00') {
//             setResponseMessage(`Transaction Successfully Completed. Transaction ID: ${responseData.transaction_id}`);
//         } else {
//             setResponseMessage(`Transaction Failed. Message: ${responseData.err_msg}`);
//         }
//     };

//     return (
//         <div>
//             <h1>PayFast Example Code For Redirection Payment Request</h1>
//             <form id='PayFast_payment_form' name='PayFast-payment-form' onSubmit={handleFormSubmit}>
//                 <input type="hidden" name="MERCHANT_ID" value={merchantId} />
//                 <input type="hidden" name="TOKEN" value={token} />
//                 <input type="hidden" name="SUCCESS_URL" value="http://merchant-site-example.com" />
//                 <input type="hidden" name="FAILURE_URL" value="http://merchant-site-example.com" />
//                 <input type="hidden" name="CHECKOUT_URL" value="https://typedwebhook." />
//                 <input type="hidden" name="CUSTOMER_EMAIL_ADDRESS" value="some-email@example.com" />
//                 <input type="hidden" name="ORDER_DATE" value={new Date().toISOString()} />
//                 <input type="hidden" name="SIGNATURE" value="SOME-RANDOM-STRING" />
//                 <input type="hidden" name="VERSION" value="MERCHANT-CART-0.1" />
//                 <input type="hidden" name="TXNDESC" value="Item Purchased from Cart" />
//                 <input type="hidden" name="PROCCODE" value="00" />
//                 <input type="hidden" name="TRAN_TYPE" value='ECOMM_PURCHASE' />
//                 <input type="hidden" name="STORE_ID" value='' />

//                 Currency Code: <input type="text" name="CURRENCY_CODE" value="PKR" /><br />
//                 Transaction Amount: <input type="text" name="TXNAMT" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)} /><br />
//                 Basket ID: <input type="text" name="BASKET_ID" value={basketId} onChange={(e) => setBasketId(e.target.value)} /><br />

//                 <div className="form-group">
//                     <label>RECURRING_TXN</label>
//                     <input id="RECURRING_TXN" name="RECURRING_TXN" value="true" />
//                 </div>

//                 <input type="submit" value="Submit" />
//             </form>

//             <button onClick={getToken}> get token</button>
//             {responseMessage && <div>{responseMessage}</div>}
//         </div>
//     );
// }

// export default PayFastPaymentForm;




import React, { useEffect, useState } from 'react';
function PaymentForm({ token }) {
    const [formData, setFormData] = useState({
        CURRENCY_CODE: 'PKR',
        MERCHANT_NAME: 'UAT Demo Merchant',
        SUCCESS_URL: 'http://merchant-site-example.com',
        FAILURE_URL: 'http://merchant-site-example.com',
        CHECKOUT_URL: 'http://merchant-site-example.com',
        CUSTOMER_EMAIL_ADDRESS: 'some-email@example.com',
        CUSTOMER_MOBILE_NO: '00000000000',
        TXNDESC: 'Item Purchased from Cart',
        PROCCODE: '00',
        TRAN_TYPE: 'ECOMM_PURCHASE',
        STORE_ID: '102-ZEOJDZS3V',
        RECURRING_TXN: 'TRUE/FALSE',
        MERCHANT_USERAGENT: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
        ITEMS: [
            { SKU: 'SAMPLE-SKU-01', NAME: 'An Awesome Dress', PRICE: '150', QTY: '2' },
            { SKU: 'SAMPLE-SKU-02', NAME: 'Ice Cream', PRICE: '45', QTY: '5' }
        ],
        TOKEN: token
    });

    useEffect(() => {
        goPayFastPayment();
    }, []);

    const goPayFastPayment = () => {
        const formdata = new FormData();
        formdata.append("MERCHANT_ID", "102");
        formdata.append("SECURED_KEY", "zWHjBp2AlttNu1sK");
        formdata.append("BASKET_ID", "olp9");
        formdata.append("TXNAMT", "500");

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch("https://glowx.alphanitesofts.net/api/generateToken", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                // Update form data here
                setFormData(prevData => ({
                    ...prevData,
                    TOKEN: result?.ACCESS_TOKEN,
                    MERCHANT_NAME: result?.NAME,
                    ORDER_DATE: result?.GENERATED_DATE_TIME
                }));
            })
            .catch((error) => {
                console.log(error);
                // Handle error
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('API response:', data);
            // Handle the API response data as needed
        } catch (error) {
            console.error('API error:', error);
            // Handle errors here (e.g., display an error message)
        }
    };


    return (
        <form id="PayFast_payment_form" name="PayFast-payment-form" method="post" onSubmit={handleSubmit} action="https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransactio">
            Currency Code: <input type="text" name="CURRENCY_CODE" value={formData.CURRENCY_CODE} onChange={handleChange} /><br />
            Merchant ID: <input type="text" name="MERCHANT_ID" value="102" readOnly /><br />
            Merchant Name: <input type="text" name="MERCHANT_NAME" value={formData.MERCHANT_NAME} onChange={handleChange} /><br />
            Token: <input type="text" name="TOKEN" value={formData.TOKEN} readOnly /><br />
            Success URL: <input type="text" name="SUCCESS_URL" value={formData.SUCCESS_URL} onChange={handleChange} /><br />
            Failure URL: <input type="text" name="FAILURE_URL" value={formData.FAILURE_URL} onChange={handleChange} /><br />
            Checkout URL: <input type="text" name="CHECKOUT_URL" value={formData.CHECKOUT_URL} onChange={handleChange} /><br />
            Customer Email: <input type="text" name="CUSTOMER_EMAIL_ADDRESS" value={formData.CUSTOMER_EMAIL_ADDRESS} onChange={handleChange} /><br />
            Customer Mobile: <input type="text" name="CUSTOMER_MOBILE_NO" value={formData.CUSTOMER_MOBILE_NO} onChange={handleChange} /><br />
            Transaction Amount: <input type="text" name="TXNAMT" value="500" readOnly /><br />
            Basket ID: <input type="text" name="BASKET_ID" value="olp9" readOnly /><br />
            Transaction Date: <input type="text" name="ORDER_DATE" value={new Date().toISOString()} readOnly /><br />
            Signature: <input type="text" name="SIGNATURE" value="SOMERANDOM-STRING" readOnly /><br />
            Version: <input type="text" name="VERSION" value="MERCHANTCART-0.1" readOnly /><br />
            Item Description: <input type="text" name="TXNDESC" value={formData.TXNDESC} onChange={handleChange} /><br />
            Proccode: <input type="text" name="PROCCODE" value={formData.PROCCODE} readOnly /><br />
            Transaction Type: <input type="text" name="TRAN_TYPE" value={formData.TRAN_TYPE} readOnly /><br />
            Store ID/Terminal ID (optional): <input type="text" name="STORE_ID" value={formData.STORE_ID} readOnly /><br />
            Recurring transaction: <input type="text" name="RECURRING_TXN" value={formData.RECURRING_TXN} readOnly /><br />
            {formData.ITEMS.map((item, index) => (
                <div key={index}>
                    <input type="hidden" name={`ITEMS[${index}][SKU]`} value={item.SKU} />
                    <input type="hidden" name={`ITEMS[${index}][NAME]`} value={item.NAME} />
                    <input type="hidden" name={`ITEMS[${index}][PRICE]`} value={item.PRICE} />
                    <input type="hidden" name={`ITEMS[${index}][QTY]`} value={item.QTY} />
                </div>
            ))}
            <input type="submit" value="SUBMIT" />
        </form>
    );
}

export default PaymentForm;
