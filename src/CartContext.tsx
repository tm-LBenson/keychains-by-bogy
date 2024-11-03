import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "./Products";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (
    id: string,
    quantityChange: number,
    setDirectly?: boolean,
  ) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === newItem.id);
      if (itemIndex > -1) {
        return prevItems.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateItemQuantity = (
    id: string,
    quantityChange: number,
    setDirectly = false,
  ) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = setDirectly
            ? quantityChange
            : item.quantity + quantityChange;
          const itemList = { ...item, quantity: newQuantity >= 1 ? newQuantity : 0 };
          
          return itemList

        }
        return item;
      });
    });
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
