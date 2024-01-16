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
    const existingProductIndex = cartItems.findIndex((item) => item._id === product._id);

    if (existingProductIndex !== -1) {
      setCartItems((prevCartItems) => {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingProductIndex].userQuantity += 1;
        updateCartState(updatedCartItems);
        return updatedCartItems;
      });
    } else {
      setCartItems((prevCartItems) => {
        const updatedCartItems = [...prevCartItems, { ...product, userQuantity: 1 }];
        updateCartState(updatedCartItems);
        return updatedCartItems;
      });
    }
  };
  
  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item !== product);
    updateCartState(updatedCartItems);
  };

  // Inside CartContext.js

const updateCartItemQuantity = (productId, action) => {
  setCartItems((prevCartItems) =>
    prevCartItems.map((item) =>
      item._id === productId
        ? {
            ...item,
            userQuantity:
              action === 'increase'
                ? item.userQuantity + 1
                : Math.max(item.userQuantity - 1, 0),
          }
        : item
    ).filter((item) => item.userQuantity > 0) // Filter out items with zero quantity
  );
};

  

  const value = {
    cartItems,
    cartCount,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
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
