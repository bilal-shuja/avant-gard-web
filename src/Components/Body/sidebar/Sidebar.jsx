import React, { useState } from 'react';

const Sidebar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState();

    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div>
            <div className="sidebar-with-toggle">
                <div>
                    <div className="header-right-side-menu">
                        <a onClick={handleToggleSidebar} style={{ cursor: 'pointer' }}><i className="ti-menu text-white" aria-hidden="true" /></a>
                    </div>
                </div>
                <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                    <div id="sideMenuClose" onClick={handleToggleSidebar}>
                        <i className="ti-close" />
                    </div>
                    <ul>
                        <div className="nav-side-menu">

                            <div className="menu-list">
                                <h6>KARL</h6>
                                <ul id="menu-content" className="menu-content collapse out">
                                    <li data-toggle="collapse" className="collapsed active">
                                        <a >HOME</a>
                                    </li>
                                    <li data-toggle="collapse" className="collapsed">
                                        <a >SHOP</a>
                                    </li>
                                    <li data-toggle="collapse" className="collapsed">
                                        <a >CART</a>
                                    </li>
                                    <li data-toggle="collapse" data-target="#OTHER" className="collapsed">
                                        <a >OTHER <span className="arrow" /></a>
                                        <ul className="sub-menu collapse" id="OTHER">
                                            <li><a >OTHER 1</a></li>
                                            <li><a >OTHER 2</a></li>
                                            <li><a >OTHER 3</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>


                            <div className="menu-list">
                                <h6>Categories</h6>
                                <ul id="menu-content" className="menu-content collapse out">
                                    <li data-toggle="collapse" data-target="#women" className="collapsed active">
                                        <a >Woman wear <span className="arrow" /></a>
                                        <ul className="sub-menu collapse" id="women">
                                            <li><a >Midi Dresses</a></li>
                                            <li><a >Maxi Dresses</a></li>
                                            <li><a >Prom Dresses</a></li>
                                            <li><a >Little Black Dresses</a></li>
                                            <li><a >Mini Dresses</a></li>
                                        </ul>
                                    </li>
                                    <li data-toggle="collapse" data-target="#man" className="collapsed">
                                        <a >Man Wear <span className="arrow" /></a>
                                        <ul className="sub-menu collapse" id="man">
                                            <li><a >Man Dresses</a></li>
                                            <li><a >Man Black Dresses</a></li>
                                            <li><a >Man Mini Dresses</a></li>
                                        </ul>
                                    </li>
                                    <li data-toggle="collapse" data-target="#kids" className="collapsed">
                                        <a >Children <span className="arrow" /></a>
                                        <ul className="sub-menu collapse" id="kids">
                                            <li><a >Children Dresses</a></li>
                                            <li><a >Mini Dresses</a></li>
                                        </ul>
                                    </li>
                                    <li data-toggle="collapse" data-target="#bags" className="collapsed">
                                        <a >Bags &amp; Purses <span className="arrow" /></a>
                                        <ul className="sub-menu collapse" id="bags">
                                            <li><a >Bags</a></li>
                                            <li><a >Purses</a></li>
                                        </ul>
                                    </li>
                                    <li data-toggle="collapse" data-target="#eyewear" className="collapsed">
                                        <a >Eyewear <span className="arrow" /></a>
                                        <ul className="sub-menu collapse" id="eyewear">
                                            <li><a >Eyewear Style 1</a></li>
                                            <li><a >Eyewear Style 2</a></li>
                                            <li><a >Eyewear Style 3</a></li>
                                        </ul>
                                    </li>
                                    <li data-toggle="collapse" data-target="#footwear" className="collapsed">
                                        <a >Footwear <span className="arrow" /></a>
                                        <ul className="sub-menu collapse" id="footwear">
                                            <li><a >Footwear 1</a></li>
                                            <li><a >Footwear 2</a></li>
                                            <li><a >Footwear 3</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>


                        </div>
                    </ul>
                </div>
            </div>

            <div className="catagories-side-menu">


            </div>
        </div>
    )
}

export default Sidebar