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
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-container">
      <h2>Welcome to our ecommerce website</h2>

      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <button className="btn">
        <a href="/categories">SEARCH</a>
      </button>

      <div className="featured-items">
          
      </div>
    </div>
  );
}
