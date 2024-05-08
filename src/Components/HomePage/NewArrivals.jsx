import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const NewArrivals = () => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getArticles()
    }, [])

    const getArticles = () => {
        setLoading(true)
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch("https://avantgarde.alphanitesofts.net/api/get_all_articles", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result?.status === "200") {
                    setArticles(result?.data)
                    setLoading(false)
                }
                else {
                    toast.warn(result?.message)
                    setLoading(false)
                }
            })
            .catch((error) => {
                setLoading(false)
                console.error(error)
                // toast.warn("Oppsss... Something went wrong!")
            });
    }


    return (
        <div>
            {/* <section className="new_arrivals_area section_padding_100_0 clearfix">

                {
                    loading === true ? (
                        <>
                            <div className='mb-5'>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div>
                                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : articles.map((items) => {
                        return (
                            <>
                                <div>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="section_heading text-center">
                                                    <h2>{items.cat_name}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row karl-new-arrivals">

                                            <div className="col-6 col-sm-6 col-md-4 col-lg-2 ps-1 pe-1 single_gallery_item women wow fadeInUpBig" data-wow-delay="0.2s">
                                                <div className="product-img">
                                                    <img src="img/product-img/product-1.jpg" alt />
                                                    <div className="product-quicview">
                                                        <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus" /></a>
                                                    </div>
                                                </div>
                                                <div className="product-description">
                                                    <p>Jeans midi cocktail dress</p>
                                                    <h4 className="product-price">$39.90</h4>
                                                    <a href="#" className="add-to-cart-btn">ADD TO CART</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </section> */}



            <section className="new_arrivals_area section_padding_100_0 clearfix">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section_heading">
                                <h2>Latest Collections</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row karl-new-arrivals">
                        {
                            loading === true ? (
                                <>
                                    <div className='mb-5'>
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div>
                                                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : articles.map((items) => {
                                return (
                                    <>
                                        <div className="col-6 col-sm-6 col-md-4 col-lg-2 ps-1 pe-1 single_gallery_item women wow fadeInUpBig" data-wow-delay="0.2s">
                                            <div className="product-img">

                                                {items.image && items.image.length > 0 &&
                                                    <img src={`https://avantgardeimages.alphanitesofts.net/${items.image[0]}`} className='img-fluid' alt="product-image" />
                                                }
                                                {/* <img src={`https://avantgardeimages.alphanitesofts.net/${items.image[0]}`} alt /> */}
                                                <div className="product-quicview">
                                                    <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus" /></a>
                                                </div>
                                            </div>
                                            <div className="product-description">
                                                {/* <p>{items.title}</p> */}
                                                {/* <h4 className="product-price">{items.price} /pkr</h4> */}
                                                <a href="#" className="add-to-cart-btn">{items.title}</a>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>

            </section>
        </div>
    )
}

export default NewArrivals