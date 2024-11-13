import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "./Products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  setItems: (cartItems: CartItem[]) => void;
  isServerAwake: boolean;
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (
    id: string,
    quantityChange: number,
    setDirectly?: boolean,
  ) => void;
  wakeUpBackend: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItemsState] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      return [];
    }
  });
  const [isServerAwake, setServerAwake] = useState(false);

  useEffect(() => {
    wakeUpBackend();
  }, []);

  useEffect(() => {
    try {
      const serializedItems = JSON.stringify(items);
      localStorage.setItem("cartItems", serializedItems);
    } catch (error) {
      console.error("Failed to save cart items to localStorage:", error);
    }
  }, [items]);

  const setItems = (cartItems: CartItem[]) => {
    setItemsState(cartItems);
  };

  const wakeUpBackend = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_APP_API_BASE_URL);
      const data = await response.json();
      console.log(data);
      setServerAwake(true);
    } catch (error) {
      console.error("Failed to wake backend: ", error);
      setServerAwake(false);
    }
  };

  const addItem = (newItem: CartItem) => {
    setItemsState((prevItems) => {
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
    setItemsState((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateItemQuantity = (
    id: string,
    quantityChange: number,
    setDirectly = false,
  ) => {
    setItemsState((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = setDirectly
            ? quantityChange
            : item.quantity + quantityChange;
          const itemList = {
            ...item,
            quantity: newQuantity >= 1 ? newQuantity : 0,
          };

          return itemList;
        }
        return item;
      });
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItemQuantity,
        isServerAwake,
        setItems,
        wakeUpBackend,
      }}
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
  return {
    ...context,
    setItems: (items: CartItem[]) => context.setItems(items),
  };
};
