// ProductCard.js
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import './Product.css';
import { PRODUCTS } from '../utils/mutations';
import { useCart } from '../contexts/CartContext';

function ProductCard() {
  const { addToCart, cartItems, updateCartItemQuantity, setCartItems } = useCart(); 
  const { loading, error, data } = useQuery(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      // Update cartItems only if it's empty
      if (cartItems.length === 0) {
        setCartItems(JSON.parse(storedCartItems));
      }
    }
  }, [cartItems, setCartItems]);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = searchTerm ? filteredProducts : data.products;

  const handleSearch = (query) => {
    setSearchTerm(query);
    if (query) {
      const filtered = data.products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };
  
  const handleIncreaseQuantity = (product) => {
    updateCartItemQuantity(product._id, 'increase');
  };

  const handleDecreaseQuantity = (product) => {
    updateCartItemQuantity(product._id, 'decrease');
  };

  return (
    <div className='product-list'>
      <h2>Product List</h2>
      <div className='search-bar'>
        <input
          type="text"
          placeholder="Search on VivaMarket"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className='products'>
        {products.map((product) => (
          <div key={product._id} className='product-card'>
            <img
              src={product.imageUrl}
              alt={product.name}
              className='product-image'
            />
            {cartItems.some((item) => item._id === product._id) ? (
              <div className='quantity-control'>
                <button onClick={() => handleDecreaseQuantity(product)}>-</button>
                <span className='product-amount'>
                  {cartItems.find((item) => item._id === product._id)?.userQuantity}
                </span>
                <button onClick={() => handleIncreaseQuantity(product)}>+</button>
              </div>
            ) : (
              <button
                className='add-button'
                onClick={() => handleAddToCart(product)}
              >
                + Add 
              </button>
            )}

            <h3>${product.price}</h3>
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
