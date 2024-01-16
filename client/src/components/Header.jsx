import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../assets/CartLogo.png';
import Logo from '../assets/logo 3-svg.svg';
import Auth from '../utils/auth';
import DarkThemeIcon from '/src/assets/dark theme.png';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import '../components/Header.css'

const Header = () => {
  const { toggleTheme } = useTheme();
  const { cartCount } = useCart();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <span className="logo">
          <img src={Logo} alt="Logo" />
        </span>
      </Link>

      <nav className="nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/store" className="nav-link">
          Store
        </Link>
        <div className="dropdown">
          <Link to="/categories" className="dropbtn">
            Categories <i className="fa fa-caret-down"></i>
          </Link>
          <div className="dropdown-content">
            <Link to="/categories/furniture" className="dropdown-link">
              Furniture
            </Link>
            <Link to="/categories/pet" className="dropdown-link">
              Pet
            </Link>
            <Link to="/categories/room-decor" className="dropdown-link">
              Room Decor
            </Link>
          </div>
        </div>
        <Link to="/contact-us" className="nav-link">
          Contact
        </Link>
        <button className="darkBtn" onClick={toggleTheme}>
          <span className="darkThemeIcon">
            <img src={DarkThemeIcon} alt="Dark Theme" />
          </span>
        </button>
      </nav>

      {Auth.loggedIn() ? (
        <Link to="/" className="account" onClick={logout}>
          Logout
        </Link>
      ) : (
        <>
          <Link to="/login" className="account">
            Login
          </Link>
          <Link to="/signup" className="account">
            Signup
          </Link>
        </>
      )}

      <Link to="/cart" className="cart-link">
        <div className="cart">
          <span className="cart-icon">
            <img src={CartIcon} alt="Cart" />
          </span>
          <span id="cart-inventory" className="cart-inventory">
            {cartCount}
          </span>
        </div>
      </Link>
    </header>
  );
};

export default Header;
