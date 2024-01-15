import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
    setCartCount((prevCartCount) => prevCartCount + 1);
  };

  const removeFromCart = (product) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item !== product));
    setCartCount((prevCartCount) => Math.max(0, prevCartCount - 1));
  };

  const updateCartItemQuantity = (updatedItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => (item === updatedItem ? updatedItem : item))
    );
  };

  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateCartItemQuantity
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
