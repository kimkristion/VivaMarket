import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
      setCartCount(JSON.parse(storedCartItems).length);
    }
  }, []);

  const updateCartState = (updatedCartItems) => {
    setCartItems(updatedCartItems);
    setCartCount(updatedCartItems.length);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };


  const addToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    updateCartState(updatedCartItems);
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item !== product);
    updateCartState(updatedCartItems);
  };

  const updateCartItemQuantity = (parent, newQuantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.name === parent ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleQuantityChange = (parent, newQuantity) => {
    const updatedQuantity = Math.max(parseInt(newQuantity, 10) || 1, 1);
    updateCartItemQuantity(parent, updatedQuantity);
  };


  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    handleQuantityChange
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
