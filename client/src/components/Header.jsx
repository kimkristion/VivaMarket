import { Link } from 'react-router-dom';
import CartIcon from '/src/assets/CartLogo.png'
import React, { useState } from 'react';
import Auth from '../utils/auth';
import CartModal from './CartModal'; 

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  const [isCartOpen, setCartOpen] = useState(false);

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <header>
      
      <Link to="/" ><span className="logo">VivaMarket</span></Link>

      <nav>
        <Link to="/"><a>Home</a></Link>
        <a href="#">Shop</a>
        <a href="#">Categories</a>
        <a href="#">Contact</a>
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

      <div className="cart" onClick={openCart}>
        <span className="cart-icon"><img src={CartIcon}/></span>
        <span id="cart-inventory">0</span> {/* implement dynamically updating cart count */}
        
      </div>
      {isCartOpen && <CartModal closeCart={closeCart} />}
    </header>
  );
};

export default Header;
