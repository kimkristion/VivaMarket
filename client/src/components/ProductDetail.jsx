import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../utils/mutations';
import './ProductDetail.css'


function ProductDetailCard() {
  const { _id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { _id },
  });

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!loading && !error && data && data.product) {
      setProduct(data.product);
    }
  }, [loading, error, data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className='product-detail-container'>
      <div className='product-detail'>
        <img src={product.imageUrl} alt={product.name} className='product-image' />
        <div className='product-info'>
          <h2>{product.name}</h2>
          <p className='price'>${product.price}</p>
          <p className='description'>{product.description}</p>
          <button className='add-to-cart'>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailCard;
