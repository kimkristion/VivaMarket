import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section about">
        <h3>About Us</h3>
        <ul>
          <li>
            Jason Grant{" "}
            <a
              className="blue-link"
              href="https://www.linkedin.com/in/jason-grant-231334267/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            Kristion Kim{" "}
            <a
              href="https://www.linkedin.com/in/kristion-kim-90062525a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            Alex Lopez{" "}
            <a
              href="https://www.linkedin.com/in/AlexisJLO"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            Emilio Name{" "}
            <a
              href="https://www.linkedin.com/in/jason-grant-231334267/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-section links">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
        </ul>
      </div>

      <div className="footer-section contact">
        <h3>Contact</h3>
        <Link to="/contact-us">
          <p>Contact us through our form</p>
        </Link>
      </div>

      <div className="footer-section disclaimer">
        <p>&copy; 2024 VivaMarket. All Rights Reserved.</p>
        <p>
          <Link to="/terms-of-service">Terms of Service</Link> |{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
