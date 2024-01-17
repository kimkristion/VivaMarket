import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_PRODUCT_BY_ID, GET_CATEGORY_BY_ID } from '../utils/mutations';
import { useCart } from '../contexts/CartContext';
import './ProductDetail.css';

function ProductDetailCard() {
  const { addToCart } = useCart(); 
  const { _id } = useParams();
  const client = useApolloClient();

  const { loading: productLoading, error: productError, data: productData } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { _id },
  });

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const [product, setProduct] = useState();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        if (product && product.category) {
          const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(product.category);
          if (isValidObjectId) {
            const { data } = await client.query({
              query: GET_CATEGORY_BY_ID,
              variables: { _id: product.category },
            });
            setCategoryData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching category data:', error.message);
      }
    };

    if (!productLoading && !productError && productData && productData.product) {
      setProduct(productData.product);
      fetchCategoryData();
    }
  }, [client, productLoading, productError, productData, product]);

  if (productLoading || !categoryData) {
    return <p>Loading...</p>;
  }

  if (productError) {
    return <p>Error: {productError.message}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className='product-detail-container'>
      <div className='row'>
        <div className='col-2'>
          <img src={product.imageUrl} alt={product.name} className='product-image' />
        </div>
        <div className='col-2'>
          <>
            <p>Shop / {categoryData?.category?.category_name}</p>
            <h1>{product.name}</h1>
            <h4 className='price'>${product.price}</h4>
            <h3>Product Details</h3>
            <p className='description'>{product.description}</p>
            <button className='add-to-cart' onClick={() => handleAddToCart(product)}>
              Add to Cart
              </button>
          </>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailCard;