import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/mutations';
import './CartPage.css';

const CartPage = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      const initialCartItems = data.products.map((product) => ({
        id: product.id,
        image: product.imageUrl,
        name: product.name,
        price: product.price,
        quantity: 1,
      }));
      setCartItems(initialCartItems);
    }
  }, [loading, data]);

  const calculateTotal = () => {
    return cartItems.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th className="item-column">Product</th>
            <th className="price-column">Price</th>
            <th className="quantity-column">Quantity</th>
            <th className="total-column">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product) => (
            <tr key={product.id} className="cart-item-row">
              <td className="item-image">
                <img src={product.image} alt={product.name} />
              </td>
              <td className="item-name">{product.name}</td>
              <td className="item-price">${product.price}</td>
              <td className="item-quantity">
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                />
              </td>
              <td className="item-total">${product.price * product.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="total-label">
              Total
            </td>
            <td className="cart-total">${calculateTotal()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartPage;
