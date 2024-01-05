import React from 'react';
import Cart from './Cart.jsx';

const CartModal = ({ closeCart, cartItems, removeFromCart }) => {
  return (
    <div className="cart-modal">
      <button onClick={closeCart}>Close Cart</button>
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default CartModal;
