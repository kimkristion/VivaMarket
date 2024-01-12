import { Link } from 'react-router-dom';
import { useState } from 'react'
import CartIcon  from '../assets/CartLogo.png'
import Logo from '../assets/logo 3-svg.svg'
import Auth from '../utils/auth';
import { useTheme } from '../contexts/ThemeContext';
import DarkThemeIcon from '/src/assets/dark theme.png';
import { useCart } from '../contexts/CartContext';

const Header = () => {

  const { toggleTheme } = useTheme();
  const { cartCount } = useCart();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      
      <Link to="/" ><span className="logo"><img src={Logo} alt="" /></span></Link>

      <nav>
        <Link to="/"><a>Home</a></Link>
        <a href="#">Shop</a>
        <Link to="/categories">Categories</Link>
        <Link to="/contact-us"><a>Contact</a></Link> 
        <button className='darkBtn' onClick={toggleTheme}>
           <span className="darkThemeIcon">
            <img src={DarkThemeIcon}/>
            </span>
        </button>
      </nav>

      {Auth.loggedIn() ? (
            <>
            <a className="account" onClick={logout}>Logout</a>
            </>
          ) : (
            <>
              <Link className="account" to="/login">
                Login
              </Link>
              <Link className="account" to="/signup">
                Signup
              </Link>
            </>
          )}

      <Link to='/cart'>
      <div className="cart">
        <span className="cart-icon"><img src={CartIcon}/></span>
        <span id={`cart-inventory`}>{cartCount}</span>
      </div>
      </Link>
    </header>
  );
};

export default Header;
