// ProductCard.js

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

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
    <div>
      <h2>Product List</h2>
      <div>
        <input
          type="text"
          placeholder="Search on VivaMarket"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
          {/* Additional fields as needed */}
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
