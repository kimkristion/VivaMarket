import React from 'react';
//import './Footer.css'; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section about">
        <h3>About Us</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet quam in eros
          fermentum facilisis.
        </p>
      </div>

      <div className="footer-section links">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/shop">Shop</a>
          </li>
          <li>
            <a href="/categories">Categories</a>
          </li>
          
        </ul>
      </div>

      <div className="footer-section contact">
      <Link to="/contact-us"><a><h3>Contact</h3></a></Link> 
      </div>


      <div className="footer-section disclaimer">
        <p>&copy; 2024 VivaMarket. All Rights Reserved.</p>
        <p>Terms of Service | Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
