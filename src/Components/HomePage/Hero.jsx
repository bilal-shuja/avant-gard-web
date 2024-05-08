import React from 'react'
import Slider from "react-slick";

const Hero = () => {

    const handleButtonClick = () => {
        const scrollHeight = document.documentElement.clientHeight + 140;
        window.scrollTo({
            top: scrollHeight,
            behavior: 'smooth',
        });
    };

    var settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "ease-out",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div>
                <div>
                    <Slider {...settings}>
                        <div className="background-overlay bg-img hero-img background-hover-change"  >
                            <div className="single_slide h-100" style={{ backgroundImage: 'url(https://scontent-lhr6-1.cdninstagram.com/v/t51.29350-15/440943609_1467075550549062_2830279166691086583_n.webp?stp=dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=18de74&_nc_ohc=T9a75lZnpNAQ7kNvgEcgY1P&_nc_ht=scontent-lhr6-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCqbezy4s5l8HBj1534yMEE6tcIbroQjpK3DpgDBMbmow&oe=6641736F)' }}>
                                <div className="row h-100 align-items-center" >
                                    <div className="col-12">
                                        <div className="welcome_slide_text text-center" >
                                            <h6 data-animation="bounceInDown" data-delay={0} data-duration="500ms">* Only today we offer free shipping</h6>
                                            <h2 data-animation="fadeInUp" data-delay="500ms" data-duration="500ms">Fashion Trends</h2>
                                            <a onClick={handleButtonClick} className="text-white btn karl-btn" data-animation="fadeInUp" data-delay="1s" data-duration="500ms">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-img background-overlay hero-img" >
                            <div className="single_slide h-100" style={{ backgroundImage: 'url(https://scontent-lhr6-2.cdninstagram.com/v/t39.30808-6/441449474_18007570883402300_7132226206088214526_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=RJMgpv1CkZkQ7kNvgGc6evv&_nc_ht=scontent-lhr6-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCM7hfRCulK8jXQKnYkFc2aA9mSDckqNp4oRfRc1PEj4w&oe=6641865D)' }}>
                                <div className="row h-100 align-items-center">
                                    <div className="col-12">
                                        <div className="welcome_slide_text text-center">
                                            <h6 data-animation="fadeInDown" data-delay={0} data-duration="500ms">* Only today we offer free shipping</h6>
                                            <h2 data-animation="fadeInUp" data-delay="500ms" data-duration="500ms">Trendy Threads, Fly Fashion</h2>
                                            <a onClick={handleButtonClick} className="text-white btn karl-btn" data-animation="fadeInLeftBig" data-delay="1s" data-duration="500ms">Check Collection</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-img background-overlay hero-img" >
                            <div className="single_slide h-100" style={{ backgroundImage: 'url(https://scontent-lhr6-2.cdninstagram.com/v/t51.29350-15/441367286_455174670306965_1481916443797528895_n.webp?stp=dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=4ONf-nywRpcQ7kNvgHesbXS&_nc_ht=scontent-lhr6-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfC_AcZBbaOoye1R9xDNn65bdEh80pQiVgmzniAcqyq16g&oe=6641722D)' }}>
                                <div className="row h-100 align-items-center">
                                    <div className="col-12">
                                        <div className="welcome_slide_text text-center">
                                            <h6 data-animation="fadeInDown" data-delay={0} data-duration="500ms">* Only today we offer free shipping</h6>
                                            <h2 data-animation="bounceInDown" data-delay="500ms" data-duration="500ms">Fresh Fits, Dope Styles</h2>
                                            <a onClick={handleButtonClick} className="text-white btn karl-btn" data-animation="fadeInRightBig" data-delay="1s" data-duration="500ms">Check Collection</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-img background-overlay hero-img" >
                            <div className="single_slide h-100" style={{ backgroundImage: 'url(https://scontent-lhr6-1.cdninstagram.com/v/t51.29350-15/441429016_2566954653513489_7441732517397113115_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=1zn5cFIuqD0Q7kNvgEp58Ut&_nc_ht=scontent-lhr6-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDFNCkXX-gRYU2LHYt1fjBuAwddfDB7OWJZc5gY9ZyCGg&oe=664192A3)' }}>
                                <div className="row h-100 align-items-center">
                                    <div className="col-12">
                                        <div className="welcome_slide_text text-center">
                                            <h6 data-animation="fadeInDown" data-delay={0} data-duration="500ms">* Only today we offer free shipping</h6>
                                            <h2 data-animation="bounceInDown" data-delay="500ms" data-duration="500ms">Vibin', Stylin', Slayin</h2>
                                            <a onClick={handleButtonClick} className="text-white btn karl-btn" data-animation="fadeInRightBig" data-delay="1s" data-duration="500ms">Check Collection</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
        </div >
    )
}

export default Hero