import React, { useState, useEffect } from 'react'
import Hero from '../HomePage/Hero'
import NewArrivals from '../HomePage/NewArrivals'
import Testimonial from '../HomePage/Testimonials'
import ItemInfo from '../Modals/ItemInfo'
import TwoCategories from '../HomePage/TwoCategories'
import OfferArea from '../HomePage/OffersArea';
import Portfolio from '../HomePage/Portfolio'
import Blogs from '../HomePage/BlogSection/Blogs'
import LatestCollections from '../HomePage/LatestCollections'
import Loader from '../Loaders/Loader'

const Homepage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false)
    const [logoSize, setLogoSize] = useState(0);

    useEffect(() => {
        getCategories();
        animateLogo();
    }, []);

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = () => {
        setLoading(true)
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch("https://avantgarde.alphanitesofts.net/api/fetch_all_sub_categorys", requestOptions)
            .then(response => response.json())
            .then(result => {
                setDataLoaded(true);
                if (result.status === "200") {
                    setCategories(result?.Sub_categorys)
                    setTimeout(() => {
                        setLoading(false)
                    }, 5000);
                }
                else {
                    console.log("error in fetch_all_users")
                }
            })
            .catch(error => console.log('error', error));
    }

    const animateLogo = () => {
        let increment = 380;
        const intervalId = setInterval(() => {
            setLogoSize(prevSize => prevSize + increment);
            if (logoSize >= 100) {
                clearInterval(intervalId);
            }
        }, 50);
    };

    const getTransformStyle = () => {
        const scale = 1 + logoSize * 0.01;
        return { transform: `scale(${scale})` };
    };



    return (
        <div>
            {
                loading === true ? (
                    <>
                        <div className='row' >
                            <div className={`d-flex justify-content-center align-items-center vh-100 `}>
                                <img style={{ ...getTransformStyle(), }} className='loading-avant-garde loaded img-fluid' src={"https://avantgardeoriginal.com/cdn/shop/files/ultrawideArtboard_1_860166a0-ef45-46c7-a6d4-1d4aa1c4060d.png"} alt="Avant-Grade Logo" />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Hero />
                        <LatestCollections />
                        <div>
                            {
                                categories.filter(item => item.cat_active === 'true').map((items, index) => {
                                    return (
                                        <>
                                            <div className="container" key={index}>
                                                <div className="row">
                                                    <div className="col-lg-12 ">
                                                        <div className="section_heading p-0  mb-3 mt-4">
                                                            <h4 className='heading-font'>{items?.sub_cat_name}&nbsp;({items.article_count})</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Portfolio loading={loading} items={items?.sub_category_id} />
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <OfferArea />
                        <Blogs />
                        <Testimonial />
                    </>
                )
            }
        </div>
    )
}

export default Homepage