import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './Product.css';
import { GET_PRODUCTS } from '../utils/mutations';
import { useCart } from '../contexts/CartContext';

function ProductCard() {
  const { addToCart } = useCart();
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

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
          <div key={product.id} className='product-card'>
            <img
             src={product.imageUrl} 
             alt={product.name} 
             className='product-image'
             />
            <button className='add-button' onClick={() => handleAddToCart()}>+ Add</button>
            <h3>${product.price}</h3>
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
