import CartIcon from '/src/assets/CartLogo.png'

const Header = () => {
  return (
    <header>
      <a href="#" className="logo">VivaMarket</a>

      <nav>
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">Categories</a>
        <a href="#">Contact</a>
      </nav>

      <a href="#" className="login">Login</a>

      <div className="cart">
        <span className="cart-icon"><img src={CartIcon}/></span>
        <span id="cart-inventory">0</span> {/* implement dynamically updating cart count */}
      </div>
    </header>
  );
};

export default Header;
