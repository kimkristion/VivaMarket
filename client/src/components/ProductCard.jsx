import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './Product.css';

const GET_PRODUCTS = gql`
  query {
    products {
      name
      description
      price
      quantity
      category
      imageUrl
      createdAt
      reviews {
        reviewId
        reviewBody
        user {
          _id
          username
        }
        createdAt
      }
    }
  }
`;

function ProductCard() {
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
            <h3>${product.price}</h3>
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
