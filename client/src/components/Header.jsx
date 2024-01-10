import { Link } from 'react-router-dom';
import { useState } from 'react'
import CartIcon  from '../assets/CartLogo.png'
//import Cart from '../components/Cart';
import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  return (
    <header>
      
      <Link to="/" ><span className="logo">VivaMarket</span></Link>

      <nav>
        <Link to="/"><a>Home</a></Link>
        <a href="#">Shop</a>
        <a href="/categories">Categories</a>
        <Link to="/contact-us"><a>Contact</a></Link> 
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
        <span id="cart-inventory">0</span> {/* implement dynamically updating cart count */}
      </div>
      </Link>
    </header>
  );
};

export default Header;
