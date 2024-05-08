import React, { useState, useEffect } from 'react'
import DiscountArea from '../HomePage/DiscountArea'
import AddToCartModal from '../Modals/AddToCartModal'
import searchImage from '../SourceFiles/Images/searchProduct.png'
import { toast } from 'react-toastify'

const SearchPage = () => {

    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [product_id, setProduct_id] = useState(null);
    const [fromPrice, setFromPrice] = useState(0)
    const [toPrice, setToPrice] = useState(0)
    const [searchField, setSearchField] = useState("")

    const [filteredCategories, setFilteredCategories] = useState([]);


    useEffect(() => {
        if (fromPrice > 0 && toPrice > 0) {
            const filtered = filteredData.filter(item => {
                const price = parseFloat(item.sale_price);
                return price >= fromPrice && price <= toPrice;
            });
            setFilteredCategories(filtered);
        } else {
            setFilteredCategories(filteredData);
        }
    }, [fromPrice, toPrice, filteredData]);

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        topFunction();
    }, []);


    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    const openCloseModal = (id) => {
        setModalShow((prev) => !prev)
        setProduct_id(id)
    }

    const getCategories = (name) => {
        if (searchField === "") {
            const formdata = new FormData();
            formdata.append("search", name);

            const requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow"
            };

            fetch("https://avantgarde.alphanitesofts.net/api/search_articles", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    if (result.status === "200") {
                        console.log(result.data)
                        setFilteredData(result?.data)
                    }
                    else if (result.status === "401") {
                        toast.warn(result?.message)
                    }
                    else {
                        console.log("error in fetch_all_users")
                    }
                })
                .catch(error => console.log('error', error));
        }
    }


    return (
        <div>
            <div>
                <DiscountArea />
                <div className='d-flex justify-content-between container-fluid mt-3'>
                    <div>
                        <div className='d-flex ms-2'>
                            <div className=''>
                                <div className="dropdown">
                                    <a className=" dropdown-toggle drop-downs" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        Availability
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li>
                                            <div className='d-flex justify-content-between'>
                                                <a className="dropdown-item" href="#">0 Selected</a>
                                                <a className="dropdown-item" href="#">Rest</a>
                                            </div>
                                        </li>
                                        <hr />
                                        <li style={{ color: "#000" }}><a style={{ backgroundColor: "#fff", color: "#000" }} className="dropdown-item" href="#">Rs <input onChange={(e) => setFromPrice(e.target.value)} placeholder='From' /> Rs <input onChange={(e) => setToPrice(e.target.value)} placeholder='To' /></a></li>
                                    </ul>
                                </div>

                            </div>
                            <div className='ms-2'>
                                <div className="dropdown">
                                    <a className=" dropdown-toggle drop-downs" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        Price
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div className=''>
                            <div className="dropdown">
                                <a className="dropdown-toggle drop-downs" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    Relevance
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='container mt-3'>
                    <h1>Search Items</h1>
                    <div className="input-group input-group-lg">
                        <input type="text" className="form-control p-3" onChange={(e) => getCategories(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    </div>
                </div>


                <section className="shop_grid_area mt-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="shop_grid_product_area">
                                    <div className="row">
                                        {
                                            filteredData?.length === 0 ? (
                                                <>
                                                    <div className='row'>
                                                        <div className="col-lg-4 mx-auto">
                                                            <img className='img-fluid' src={searchImage} alt="empty-cart" />
                                                            <h4 className='text-center'>Look into the depth</h4>
                                                            <p className='text-center'>Uh-oh! It seems your search results are feeling a bit lonely. Why not brighten them up by searching for your favorite product?</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ) :

                                                loading === true ? (
                                                    <>
                                                        <div className='row'>
                                                            <div className="col-lg-3">
                                                                <div className="cardx">
                                                                    <div className="card-imgx skeleton">
                                                                    </div>
                                                                    <div className="card-bodyx">
                                                                        <p className="card-introx skeleton">
                                                                        </p>
                                                                        <h2 className="card-titlex skeleton">
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3">
                                                                <div className="cardx">
                                                                    <div className="card-imgx skeleton">
                                                                    </div>
                                                                    <div className="card-bodyx">
                                                                        <p className="card-introx skeleton">
                                                                        </p>
                                                                        <h2 className="card-titlex skeleton">
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) :
                                                    (
                                                        filteredData.map((items, index) => {
                                                            const delay = index * 0.2 + 0.1;
                                                            return (
                                                                <>
                                                                    <div className="col-12 col-sm-6 col-lg-3 single_gallery_item wow fadeInUpBig" data-wow-delay={`${delay}s`}>
                                                                        <div className="product-img ">
                                                                            {
                                                                                items?.image?.length > 0 &&
                                                                                <img src={`https://avantgardeimages.alphanitesofts.net/${items.image[0]}`} className='img-fluid' alt="product-image" />
                                                                            }
                                                                            {
                                                                                items?.on_sale === "true" ?
                                                                                    <div className="sale-tag">Sale</div> : null
                                                                            }
                                                                        </div>

                                                                        <div className="product-description">
                                                                            <div style={{ height: 110 }}>
                                                                                <p className='item-title'><span style={{ fontWeight: 500 }}>{items?.title}</span>&nbsp;&nbsp;({items?.article_prefix})</p>
                                                                                <p className='item-title' style={{ fontSize: "13px" }}>{items?.instruction ? items.instruction : null}</p>
                                                                                <div className='d-flex align-items-center'>
                                                                                    <i className='fa-solid fa-star' />
                                                                                    <i className='fa-solid fa-star' />
                                                                                    <i className='fa-solid fa-star' />
                                                                                    <i className='fa-solid fa-star' />
                                                                                    <i className='fa-solid fa-star' />
                                                                                    <p className='ms-1'>&nbsp;2 reviews</p>
                                                                                </div>
                                                                                <div className='d-flex align-items-end mt-2'>
                                                                                    {
                                                                                        items.on_sale === "true" ? (
                                                                                            <>
                                                                                                <span className='product-price-line' style={{ marginBottom: "2px", textDecoration: "line-through", color: "#9f9fa5" }}>Rs. {items.price}</span>
                                                                                                <h4 className="product-price" style={{ fontSize: '18px', color: "#000" }}>&nbsp;Rs. {items.sale_price}</h4>  </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <h4 className="product-price" style={{ fontSize: '18px', color: "#000" }}>&nbsp;Rs. {items.price}</h4>
                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                    {/* <span className='color-box' style={{backgroundColor:`${items.color}`}}/> */}
                                                                                </div>
                                                                            </div>
                                                                            <a onClick={() => openCloseModal(items.id)} className="add-to-cart-btn">ADD TO CART</a>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    )
                                        }

                                    </div>
                                </div>

                                {
                                    modalShow === true ?
                                        <AddToCartModal id={product_id} modalShow={modalShow} openCloseModal={openCloseModal} /> : null
                                }

                                <div className="shop_pagination_area wow fadeInUp mb-5 mt-5" data-wow-delay="1.1s">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination pagination-sm">
                                            <li className="page-item active"><a className="page-link" >01</a></li>
                                            <li className="page-item"><a className="page-link" >02</a></li>
                                            <li className="page-item"><a className="page-link" >03</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SearchPage