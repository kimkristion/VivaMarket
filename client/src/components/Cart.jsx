import React from 'react';
import { useCart } from '../contexts/CartContext';
import './CartPage.css';
import EmptyCart from '../assets/EmptyCart.png';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const { cartCount } = useCart();

  const handleDelete = (index) => {
    removeFromCart(index);
  };

  return (
    <div className="cart-container">
      {cartItems.length === 1 ? (
        <h2>Cart <span className='cart-count'>({cartCount} item)</span></h2>
      ) : (
        <h2>Cart <span className='cart-count'>({cartCount} items)</span></h2>
      )}

      {cartItems.length === 0 ? (
        <div className='empty-cart'>
          <img src={EmptyCart} alt='Empty Cart' className='empty-cart-image' />
          <p>Your cart is feeling a bit light right now. Discover amazing deals and add something special!</p>
        </div>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th className="product-column">Product</th>
              <th className="price-column">Price</th>
              <th className="quantity-column">Quantity</th>
              <th className="total-column">Total</th>
              <th className="delete-column">Actions</th>
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
                  </div>
                </td>
                <td className="price-cell">${item.price}</td>
                <td className="quantity-cell">{item.quantity}</td>
                <td className="total-cell">${item.price * item.quantity}</td>
                <td className="delete-cell">
                  <button onClick={() => handleDelete(item)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartPage;
