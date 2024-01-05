import { useState } from 'react';
import AddToCartAction from './AddToCartAction';
import CartIcon from '/src/assets/CartLogo.png';

const Cart = () => {
    const [cartCount, setCartCount] = useState(0);

    const addToCart = () => {
        setCartCount(cartCount + 1);
    };

    return (
    <header>
        <div className="cart">
            <span className="cart-icon"><img src={CartIcon}/></span>
            <span id="cart-inventory">{cartCount}</span>
        </div>

        <AddToCartAction addToCart={addToCart} />
    </header>
    );
};

export default Cart;