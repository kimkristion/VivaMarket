import React from "react";
import Slider from "react-slick";


import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
  const images = [
    "/src/assets/slideshow/main background.jpg",
    "/src/assets/slideshow/2nd picture.jpg",
    "/src/assets/slideshow/3rd pic.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <div className="slideshow-header">
        <ul>
          <li>Free Shipping</li>
          <li>30 Day Returns Guranteed</li>
          <li>Secure Checkout</li>
        </ul>
      </div>
    </div>
  );
}
