import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('artisana_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('artisana_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  const addToCart = (product, qty) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === id) {
          const newQty = Math.max(1, item.qty + amount);
          return { ...item, qty: newQty };
        }
        return item;
      });
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
