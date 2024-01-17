// ProductCard.js
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import './Product.css';
import { PRODUCTS } from '../utils/mutations';
import { useCart } from '../contexts/CartContext';
import ProductDetail from './ProductDetail';
import { Link } from 'react-router-dom';

function ProductCard() {
  const { addToCart, cartItems, updateCartItemQuantity, setCartItems } = useCart(); 
  const { loading, error, data } = useQuery(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems && cartItems.length === 0) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [cartItems.length, setCartItems]);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = searchTerm ? filteredProducts : data.products;

  const handleAddToCart = (product) => {
    addToCart(product);
  };
  
  const handleIncreaseQuantity = (product) => {
    updateCartItemQuantity(product._id, 'increase');
  };

  const handleDecreaseQuantity = (product) => {
    updateCartItemQuantity(product._id, 'decrease');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  
  return (
    <div className='product-list'>
      <div className='products'>
        {products.map((product) => (
          <div key={product._id} className='product-card' onClick={() => handleProductClick(product)}>
            <Link to={`/store/${product._id}`}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className='product-image'
              />
            </Link>
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
            <Link to={`/store/${product._id}`}><p className='product-name'>{product.name}</p></Link>
          </div>
        ))}
      </div>

      {selectedProduct && <ProductDetail product={selectedProduct} />}
    </div>
  );
}

export default ProductCard;
