import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbarStyles.scss'
import { useRecoilValue } from 'recoil';
import { cartCountState } from '../../../Store/Atom';
import NavbarSkeleton from '../../Loaders/NavbarSkeleton';

const NavbarHeader = () => {
    const navigate = useNavigate()
    const cartCounts = useRecoilValue(cartCountState);

    const [cartCount, setCartCount] = useState(0)
    const [categories, setCategories] = useState([])
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCategories();
        getEvents();
        const cartItemsLength = localStorage.getItem('cartItemsLength');
        if (cartItemsLength) {
            setCartCount(parseInt(cartItemsLength));
        }
    }, [])


    const getEvents = () => {
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch("https://avantgarde.alphanitesofts.net/api/fetch_all_events", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false)
                if (result.status === "200") {
                    setEvents(result?.Events)
                }
                else {
                    console.log("error in fetch_all_users")
                }
            })
            .catch(error => {
                console.log('error', error)
                navigate('/Error500')
            });
    }

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
            .catch(error => {
                console.log('error', error)
                navigate('/Error500')
            });
    }

    return (
        <div>
            <div style={{ height: "30px", width: "100%", backgroundColor: "#000" }}>
                <div className='d-flex justify-content-center align-items-baseline'>
                    <p className='text-white mt-1 text-center' style={{ fontSize: "13px" }}>Free Shipping on orders over Rs.3500 | 7 Days Easy Exchange</p>
                </div>
            </div>

            <header className="header_area bg-img background-overlay-white" style={{ backgroundImage: 'url(img/bg-img/wolf-bg.jpg)' }}>
                <div className="main_header_area">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-12 d-md-flex justify-content-between align-items-center">
                                <div className="">
                                    <div className="" >
                                        <Link to='/'><img src={"https://avantgardeoriginal.com/cdn/shop/files/ultrawideArtboard_1_860166a0-ef45-46c7-a6d4-1d4aa1c4060d.png"} className='logo-img' alt="Avant-Grade Logo" /></Link>
                                    </div>
                                </div>
                                <div className="main-menu-area mx-auto">
                                    <nav className="navbar navbar-expand-lg align-items-start">
                                        <button className="navbar-toggler" style={{ boxShadow: "none" }} type="button" data-toggle="collapse" data-target="#karl-navbar" aria-controls="karl-navbar" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"><i className="ti-menu" /></span></button>
                                        <div className="collapse navbar-collapse align-items-start collapse" id="karl-navbar">
                                            <ul className="navbar-nav animated" id="nav">
                                                <li className="nav-item active"><Link className="nav-link" to='/'>Home</Link></li>
                                                {
                                                    loading === true ? (
                                                        <>

                                                        </>
                                                    ) : (
                                                        events?.map((items, index) => {
                                                            return (
                                                                <>
                                                                    <a key={index} className="nav-item">
                                                                        <Link to={`/Events/${items?.event_id}`} className="nav-link">{items?.event_name}</Link>
                                                                    </a>
                                                                </>
                                                            )
                                                        })
                                                    )
                                                }
                                                {loading === true ? (
                                                    <>
                                                        <NavbarSkeleton />
                                                    </>
                                                ) : (
                                                    categories?.filter(item => item?.cat_active === 'true').map((category, index) => {
                                                        const dropdownToggleId = `karlDropdown${index}`;
                                                        const dropdownMenuId = `karlDropdownMenu${index}`;
                                                        return (
                                                            <li key={index} className="nav-item dropdown">
                                                                <a className="nav-link dropdown-toggle" href="#" id={dropdownToggleId} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    {category?.cat_active === 'true' ? category?.cat_name : null}
                                                                </a>
                                                                <div className="dropdown-menu" aria-labelledby={dropdownToggleId} id={dropdownMenuId}>
                                                                    {
                                                                        category?.sub_categorys.map((subCategory, subIndex) => (
                                                                            <Link key={subIndex} className="dropdown-item" to={`/Shop-now/${subCategory.sub_category_id}`}  >{subCategory.sub_cat_name}</Link>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </li>
                                                        );
                                                    })
                                                )}

                                                <li className="nav-item"><Link to='/Blog' className="nav-link">Our Blogs</Link></li>
                                                <li className="nav-item"><Link to='/SearchPage' className="nav-link"><i className='fa fa-solid fa-magnifying-glass' /></Link></li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div>
                                    <div className="header-cart-menu d-flex align-items-center ml-auto">
                                        <div className="cart me-3 cart-count">
                                            <Link to='/Cart' id="header-cart-btn"><span className="cart_quantity">{cartCounts}</span> <i className="ti-bag" /> Your Cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default NavbarHeader