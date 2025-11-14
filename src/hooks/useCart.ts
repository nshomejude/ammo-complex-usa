import { useState, useEffect } from 'react';

const CART_KEY = 'shop_cart';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variation?: {
    type: string;
    value: string;
  };
  type: 'product' | 'firearm';
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existingItem = prev.find(
        i => i.id === item.id && 
        JSON.stringify(i.variation) === JSON.stringify(item.variation)
      );

      if (existingItem) {
        return prev.map(i =>
          i.id === item.id && JSON.stringify(i.variation) === JSON.stringify(item.variation)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, variation?: { type: string; value: string }) => {
    setCart(prev => prev.filter(
      i => !(i.id === id && JSON.stringify(i.variation) === JSON.stringify(variation))
    ));
  };

  const updateQuantity = (id: string, quantity: number, variation?: { type: string; value: string }) => {
    if (quantity <= 0) {
      removeFromCart(id, variation);
      return;
    }

    setCart(prev => prev.map(i =>
      i.id === id && JSON.stringify(i.variation) === JSON.stringify(variation)
        ? { ...i, quantity }
        : i
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };
};
