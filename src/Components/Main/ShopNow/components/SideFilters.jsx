import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const SideFilters = () => {

    const [range, setRange] = useState(750);
    const [cartCount, setCartCount] = useState(0)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = () => {
        setLoading(true)
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch(`https://avantgarde.alphanitesofts.net/api/fetch_all_category_with_sub_cat`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                if (result.status === "200") {
                    setCategories(result?.Data)
                }
                else {
                    console.log("error in fetch_all_users")
                }
            })
            .catch(error => console.log('error', error));
    }


    return (
        <div>

            <div className="shop_sidebar_area">
                <div className="widget catagory mb-50">
                    <div className="nav-side-menu">
                        <h6 className="mb-0">Catagories</h6>
                        <div className="menu-list">
                            {
                                categories.filter(item => item.cat_active === 'true').map((category, index) => {
                                    const menuContent = `menu-content${index}`;
                                    const women = `#women${index}`;
                                    const women2 = `women${index}`;
                                    return (
                                        <ul id={menuContent} className="menu-content collapse out">
                                            <li data-toggle="collapse" data-target={women}>
                                                <a >{category.cat_active === 'true' ? category.cat_name : null}</a>
                                                <ul className="sub-menu collapse show" id={women2}>
                                                    {
                                                        category.sub_categorys.map((subCategory, subIndex) => (
                                                            <li key={subIndex}  ><Link to={`/Shop-now/${subCategory.cat_id}`}  >{subCategory.sub_cat_name}</Link></li>
                                                        ))
                                                    }
                                                </ul>
                                            </li>
                                        </ul>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="widget price mb-50">
                    <h6 className="widget-title mb-30">Filter by Price</h6>
                    <div className="widget-desc">
                        <div className="slider-range">
                            <input
                                type="range"
                                className="form-range"
                                onChange={(e) => setRange(e.target.value)}
                                id="customRange1"
                                min="750"
                                max="4500"
                                step="50"
                                style={{
                                    '--bs-thumb-color': 'black',
                                    '--bs-track-color': 'gray',
                                }}
                            />
                            <p>{range - 250} - {Number(range) + 250}</p>
                            <div className="range-price">Price: 500 - 4500</div>
                        </div>
                    </div>
                </div>


                <div className="widget color mb-70">
                    <h6 className="widget-title mb-30">Filter by Color</h6>
                    <div className="widget-desc">
                        <ul className="d-flex justify-content-between">
                            <li className="gray"><a ><span>(3)</span></a></li>
                            <li className="red"><a ><span>(25)</span></a></li>
                            <li className="yellow"><a ><span>(112)</span></a></li>
                            <li className="green"><a ><span>(72)</span></a></li>
                            <li className="teal"><a ><span>(9)</span></a></li>
                            <li className="cyan"><a ><span>(29)</span></a></li>
                        </ul>
                    </div>
                </div>
                <div className="widget size mb-50">
                    <h6 className="widget-title mb-30">Filter by Size</h6>
                    <div className="widget-desc">
                        <ul className="d-flex justify-content-between">
                            <li><a >XS</a></li>
                            <li><a >S</a></li>
                            <li><a >M</a></li>
                            <li><a >L</a></li>
                            <li><a >XL</a></li>
                            <li><a >XXL</a></li>
                        </ul>
                    </div>
                </div>
                <div className="widget recommended">
                    <h6 className="widget-title mb-30">Hot in the market</h6>
                    <div className="widget-desc">
                        {/* Single Recommended Product */}
                        <div className="single-recommended-product d-flex mb-30">
                            <div className="single-recommended-thumb mr-3">
                                <img src="img/product-img/product-10.jpg" alt />
                            </div>
                            <div className="single-recommended-desc">
                                <h6>Men’s T-shirt</h6>
                                <p style={{ fontSize: '12px', textDecoration: 'line-through', marginBottom: '0px' }}>$ 39.99</p>
                                <p>$ 39.99</p>
                            </div>
                        </div>
                        {/* Single Recommended Product */}
                        <div className="single-recommended-product d-flex mb-30">
                            <div className="single-recommended-thumb mr-3">
                                <img src="img/product-img/product-11.jpg" alt />
                            </div>
                            <div className="single-recommended-desc">
                                <h6>Blue mini top</h6>
                                <p style={{ fontSize: '12px', textDecoration: 'line-through', marginBottom: '0px' }}>$ 39.99</p>

                                <p>$ 19.99</p>
                            </div>
                        </div>
                        {/* Single Recommended Product */}
                        <div className="single-recommended-product d-flex">
                            <div className="single-recommended-thumb mr-3">
                                <img src="img/product-img/product-12.jpg" alt />
                            </div>
                            <div className="single-recommended-desc">
                                <h6>Women’s T-shirt</h6>
                                <p style={{ fontSize: '12px', textDecoration: 'line-through', marginBottom: '0px' }}>$ 39.99</p>
                                <p>$ 39.99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SideFilters