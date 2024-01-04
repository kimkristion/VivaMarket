import { Link } from 'react-router-dom';
import CartIcon from '/src/assets/CartLogo.png'

const Header = () => {
  return (
    <header>
      
      <Link to="/" ><span className="logo">VivaMarket</span></Link>

      <nav>
        <Link to="/"><a>Home</a></Link>
        <a href="#">Shop</a>
        <a href="#">Categories</a>
        <a href="#">Contact</a>
      </nav>

      <Link to="/login"><span>Login</span></Link>

      <div className="cart">
        <span className="cart-icon"><img src={CartIcon}/></span>
        <span id="cart-inventory">0</span> {/* implement dynamically updating cart count */}
      </div>
    </header>
  );
};

export default Header;
