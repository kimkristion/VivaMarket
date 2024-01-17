import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
  const images = [
    "/src/assets/slideshow/bannerOne.jpg",
    "/src/assets/slideshow/2nd picture.jpg",
    "/src/assets/slideshow/3rd pic.jpg",
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
