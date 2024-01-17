import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Auth from '../utils/auth';
//import './CartPage.css';
import EmptyCart from '../assets/EmptyCart.png';

const CartPage = () => {
  const { cartItems, removeFromCart, handleQuantityChange, updateCartItemQuantity } = useCart();
  const { cartCount } = useCart();

  const handleDelete = (item) => {
    removeFromCart(item);
  };

  const handleIncreaseQuantity = (item) => {
    updateCartItemQuantity(item._id, 'increase');
  };

  const handleDecreaseQuantity = (item) => {
    updateCartItemQuantity(item._id, 'decrease');
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.userQuantity, 0);

  return (
    <div className="cart-container">
      {cartItems.length === 1 ? (
        <h2>Cart <span className='cart-count'>({cartCount} item)</span></h2>
      ) : (
        <h2>Cart <span className='cart-count'>({cartCount} items)</span></h2>
      )}

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <img src={EmptyCart} alt='Empty Cart' className='empty-cart-image' />
          {Auth.loggedIn() ? (
            <div>
              <h1>Time to start shopping</h1>
              <p>Your cart is feeling a bit light right now. Discover amazing deals and add something special!</p>
            </div>
          ) : (
            <div>
              <p>Sign in to see your saved items.</p>
              <Link to='/login' button>Sign in</Link>
            </div>
          )}
        </div>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th className="product-column">Product</th>
              <th className="price-column">Price</th>
              <th className="quantity-column">Quantity</th>
              <th className="total-column">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="cart-item">
                <td className="product-cell">
                  <img src={item.imageUrl} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">${item.price}/ea</p>
                    <button className="delete-btn" onClick={() => handleDelete(item)}>Delete</button>
                  </div>
                </td>
                <td className="price-cell">${item.price}</td>
                <td className="quantity-cell">
  <div className="quantity-controls">
    <button onClick={() => handleDecreaseQuantity(item)}>-</button>
    <p>{item.userQuantity}</p>
    <button onClick={() => handleIncreaseQuantity(item)}>+</button>
  </div>
</td>
                <td className="total-cell">${item.price * item.userQuantity}</td>
              </tr>
            ))}
          </tbody>
          <div className='checkout'>
            <p>Subtotal: ${subtotal}</p>
            <Link to='/store'>Continue Shopping</Link>
            <button>Checkout</button>
          </div>
        </table>
      )}
    </div>
  );
};

export default CartPage;
