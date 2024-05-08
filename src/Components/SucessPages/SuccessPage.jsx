import React, { useEffect, useState } from 'react'
import './SuccessPageStyles.Scss'
import html2canvas from 'html2canvas';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WriteReview from '../Modals/WriteReview';

const SuccessPage = () => {

    const location = useLocation();
    const orderId = location.state;
    const navigate = useNavigate();

    const [orderStatus, setOrderStatus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        getOrderInfo()
    }, [])

    const getOrderInfo = () => {
        setLoading(true)
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch(`https://avantgarde.alphanitesofts.net/api/fetch_order_by_id/${orderId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false)
                console.log(result)
                if (result.status === "200") {
                    setOrderStatus(result.data)
                    // setInterval(() => {
                    //     window.location.reload()
                    // }, 500);
                }
                // else if(result.status === "401"){
                //     navigate('/')
                // }

            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            });
    }

    const handleCaptureScreenshot = () => {
        const screenshotContainer = document.querySelector('.handleCaptureScreenshot');

        if (screenshotContainer) {
            html2canvas(screenshotContainer).then((canvas) => {
                const screenshot = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.href = screenshot;
                downloadLink.download = 'screenshot.png';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            });
        }
    };

    const showModal = () => {
        setOpenModal((prev) => !prev)
    }

    return (
        <div>
            {
                loading === true ? (
                    <>
                        <div>
                            <div className='d-flex justify-content-center align-items-center vh-100'>
                                <div>
                                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                                <tbody>
                                    <tr>
                                        <td className='handleCaptureScreenshot' align="center" style={{ backgroundColor: '#eeeeee' }} bgcolor="#eeeeee">
                                            <table align="center" border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: 600 }}>
                                                <tbody><tr>
                                                    <td align="center" valign="top" style={{ fontSize: 0, padding: 35 }} bgcolor="#4a4a4a">
                                                        <div style={{ display: 'inline-block', maxWidth: '50%', minWidth: 100, verticalAlign: 'top', width: '100%' }}>
                                                            <table align="left" border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: 300 }}>
                                                                <tbody><tr>
                                                                    <td align="left" valign="top" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 36, fontWeight: 800 }} className="mobile-center">
                                                                        <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0, color: '#ffffff' }}>AVANT GRADE</h1>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div style={{ display: 'inline-block', maxWidth: '50%', minWidth: 100, verticalAlign: 'top', width: '100%' }} className="mobile-hide">
                                                            <table align="left" border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: 300 }}>
                                                                <tbody><tr>
                                                                    <td align="right" valign="top" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 48, fontWeight: 400, }}>
                                                                        <table cellSpacing={0} cellPadding={0} border={0} align="right">
                                                                            <tbody>
                                                                                <tr style={{ cursor: "pointer" }} onClick={handleCaptureScreenshot}>
                                                                                    <td className='mt-5' style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 18, fontWeight: 400 }}>
                                                                                        <p style={{ fontSize: 18, fontWeight: 400, margin: 0, color: '#ffffff' }}><a style={{ color: '#ffffff', textDecoration: 'none' }}>Download &nbsp;</a></p>
                                                                                    </td>
                                                                                    <td style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 18, fontWeight: 400, }}>
                                                                                        <a style={{ color: '#ffffff', textDecoration: 'none' }}><i className='fa-solid fa-download' width={27} height={23} style={{ display: 'block', border: 0 }} /></a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                                    <tr>
                                                        <td align="center" style={{ padding: '35px 35px 20px 35px', backgroundColor: '#ffffff' }} bgcolor="#ffffff">
                                                            <table align="center" border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: 600 }}>
                                                                <tbody><tr>
                                                                    <td align="center" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 400, paddingTop: 25 }}>
                                                                        <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width={125} height={120} style={{ display: 'block', border: 0 }} /><br />
                                                                        <h2 style={{ fontSize: 30, fontWeight: 800, color: '#333333', margin: 0 }}>
                                                                            Thank You For Your Order!
                                                                        </h2>
                                                                    </td>
                                                                </tr>
                                                                    <tr>
                                                                        <td align="left" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 400, paddingTop: 10 }}>
                                                                            <p style={{ fontSize: 16, fontWeight: 400, color: '#777777' }}>
                                                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium iste ipsa numquam odio dolores, nam.
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left" >
                                                                            <table cellSpacing={0} cellPadding={0} border={0} width="100%">
                                                                                <tbody><tr>

                                                                                    <td width="75%" align="left" bgcolor="#eeeeee" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 800, padding: 10 }}>
                                                                                        Order Confirmation #
                                                                                    </td>
                                                                                    <td width="25%" align="left" bgcolor="#eeeeee" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 800, padding: 10 }}>
                                                                                        {orderStatus?.id}
                                                                                    </td>
                                                                                </tr>
                                                                                    <tr>
                                                                                        <td width="75%" align="left" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 400, padding: '15px 10px 5px 10px' }}>
                                                                                            Purchased Item(s)
                                                                                        </td>
                                                                                        <td width="25%" align="left" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 400, padding: '15px 10px 5px 10px' }}>
                                                                                            {orderStatus?.order_data?.length}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td width="75%" align="left" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 400, padding: '5px 10px' }}>
                                                                                            Shipping + Handling
                                                                                        </td>
                                                                                        <td width="25%" align="left" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 400, padding: '5px 10px' }}>
                                                                                            {orderStatus?.shipment_charges} Pkr
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td width="75%" align="left" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 400, padding: '5px 10px' }}>
                                                                                            GST
                                                                                        </td>
                                                                                        <td width="25%" align="left" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 400, padding: '5px 10px' }}>
                                                                                            {orderStatus?.gst}
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody></table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left" >
                                                                            <table cellSpacing={0} cellPadding={0} border={0} width="100%">
                                                                                <tbody><tr>
                                                                                    <td width="75%" align="left" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 800, padding: 10, borderTop: '3px solid #eeeeee', borderBottom: '3px solid #eeeeee' }}>
                                                                                        TOTAL
                                                                                    </td>
                                                                                    <td width="25%" align="left" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 800, padding: 10, borderTop: '3px solid #eeeeee', borderBottom: '3px solid #eeeeee' }}>
                                                                                        {orderStatus?.total} Pkr
                                                                                    </td>
                                                                                </tr>
                                                                                </tbody></table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody></table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center" height="100%" valign="top" width="100%" style={{ padding: '0 35px 35px 35px', backgroundColor: '#ffffff' }} bgcolor="#ffffff">
                                                            <table align="center" border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: 660 }}>
                                                                <tbody><tr>
                                                                    <td align="center" valign="top" style={{ fontSize: 0 }}>
                                                                        <div style={{ display: 'inline-block', maxWidth: '50%', minWidth: 240, verticalAlign: 'top', width: '100%' }}>
                                                                            <table align="left" border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: 300 }}>
                                                                                <tbody><tr>
                                                                                    <td align="left" valign="top" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 400 }}>
                                                                                        <p style={{ fontWeight: 800 }}>Delivery Address</p>
                                                                                        <p className='p-0 m-0'>{orderStatus?.shipping_address}</p>
                                                                                        <p className='p-0 m-0'>{orderStatus?.billing_data?.city}</p>
                                                                                        <p className='p-0 m-0'>{orderStatus?.billing_data?.phone}</p>
                                                                                    </td>
                                                                                </tr>
                                                                                </tbody></table>
                                                                        </div>
                                                                        <div style={{ display: 'inline-block', maxWidth: '50%', minWidth: 240, verticalAlign: 'top', width: '100%' }}>
                                                                            <table align="left" border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: 300 }}>
                                                                                <tbody><tr>
                                                                                    <td align="left" valign="top" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 400, }}>
                                                                                        <p style={{ fontWeight: 800 }}>Estimated Delivery Date</p>
                                                                                        <p>After 5 days</p>
                                                                                    </td>
                                                                                </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                </tbody></table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center" style={{ padding: 35, backgroundColor: '#ff7361' }} bgcolor="#1b9ba3">
                                                            <table align="center" border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: 600 }}>
                                                                <tbody><tr>
                                                                    <td align="center" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 16, fontWeight: 400, paddingTop: 25 }}>
                                                                        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#ffffff', margin: 0 }}>
                                                                            Write a review and describe your views on the product
                                                                        </h2>
                                                                    </td>
                                                                </tr>
                                                                    <tr>
                                                                        <td align="center" style={{ padding: '25px 0 15px 0' }}>
                                                                            <table border={0} cellSpacing={0} cellPadding={0}>
                                                                                <tbody><tr>
                                                                                    <td align="center" style={{ borderRadius: 5 }} bgcolor="#66b3b7">
                                                                                        <a onClick={showModal} style={{ cursor: "pointer", fontSize: 18, fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', color: '#ffffff', textDecoration: 'none', borderRadius: 5, backgroundColor: '#F44336', padding: '15px 30px', border: '1px solid #F44336', display: 'block' }}>Write Review</a>
                                                                                    </td>
                                                                                </tr>
                                                                                </tbody></table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody></table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center" style={{ padding: 35, backgroundColor: '#ffffff' }} bgcolor="#ffffff">
                                                            <table align="center" border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: 600 }}>
                                                                <tbody><tr>
                                                                    <td align="center">
                                                                        <img src={"https://avantgardeoriginal.com/cdn/shop/files/ultrawideArtboard_1_860166a0-ef45-46c7-a6d4-1d4aa1c4060d.png"} width={'50px'} height={'50px'} style={{ display: 'block', border: 0 }} />
                                                                    </td>
                                                                </tr>
                                                                    <tr>
                                                                        <td align="center" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 14, fontWeight: 400, padding: '5px 0 10px 0' }}>
                                                                            <p style={{ fontSize: 14, fontWeight: 800, color: '#333333' }}>
                                                                                0321-7593759<br />
                                                                                info@avantgardeoriginal.com<br />
                                                                                82 A1, PIA Housing Society, Lahore, Pakistan                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left" style={{ fontFamily: 'Open Sans, Helvetica, Arial, sans-serif', fontSize: 14, fontWeight: 400, }}>
                                                                            <p style={{ fontSize: 14, fontWeight: 400, color: '#777777' }}>
                                                                                Please Save this receipt to avoid any further problems
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody></table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody></table>
                                {
                                    openModal === true ? <WriteReview openModal={openModal} showModal={showModal} /> : null
                                }
                        </div>
                    </>
                )
            }


        </div>
    )
}

export default SuccessPage