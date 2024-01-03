import React from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const products = [
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    // Add more product data as needed
  ];

  return (
    <div>
      <h1>Welcome to the E-commerce Store</h1>
      <div>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
