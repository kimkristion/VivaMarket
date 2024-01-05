import { Link } from 'react-router-dom';
import CartIcon from '/src/assets/CartLogo.png'

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

      <div className="cart">
        <span className="cart-icon"><img src={CartIcon}/></span>
        <span id="cart-inventory">0</span> {/* implement dynamically updating cart count */}
      </div>
    </header>
  );
};

export default Header;
