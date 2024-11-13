import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "./Products";

export interface CartItem extends Product {
  id: string;
  quantity: number;
  selectedOptions?: { [key: string]: string };
}

interface CartContextType {
  setItems: (cartItems: CartItem[]) => void;
  isServerAwake: boolean;
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, selectedOptions?: { [key: string]: string }) => void;
  updateItemQuantity: (
    id: string,
    selectedOptions: { [key: string]: string },
    quantityChange: number,
    setDirectly?: boolean,
  ) => void;
  wakeUpBackend: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

const normalizeOptions = (options: { [key: string]: string } | undefined) => {
  if (!options) return "";
  return JSON.stringify(
    Object.keys(options)
      .sort()
      .reduce((acc, key) => {
        acc[key] = options[key];
        return acc;
      }, {} as { [key: string]: string }),
  );
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItemsState] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      // Ensure every item has an id
      return parsedCart.filter((item: CartItem) => item.id);
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
    // Filter out items without a valid id
    const validItems = cartItems.filter((item) => item.id);
    setItemsState(validItems);
  };

  const wakeUpBackend = async () => {
    try {
      let response = await fetch(import.meta.env.VITE_APP_API_BASE_URL);
      let data = await response.json();
      console.log(data);
      setServerAwake(true);
    } catch (error) {
      console.error("Failed to wake backend: ", error);
      setServerAwake(false);
    }
  };

  const addItem = (newItem: CartItem) => {
    if (!newItem.id) {
      console.error("Attempted to add item without a valid 'id':", newItem);
      return;
    }

    setItemsState((prevItems) => {
      const uniqueKey = `${newItem.id}-${normalizeOptions(
        newItem.selectedOptions,
      )}`;
      const existingItemIndex = prevItems.findIndex((item) => {
        const itemKey = `${item.id}-${normalizeOptions(item.selectedOptions)}`;
        return itemKey === uniqueKey;
      });

      if (existingItemIndex > -1) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      } else {
        return [...prevItems, { ...newItem, quantity: newItem.quantity }];
      }
    });
  };

  const removeItem = (
    id: string,
    selectedOptions?: { [key: string]: string },
  ) => {
    setItemsState((prevItems) =>
      prevItems.filter(
        (item) =>
          item.id !== id ||
          (selectedOptions &&
            normalizeOptions(item.selectedOptions) !==
              normalizeOptions(selectedOptions)),
      ),
    );
  };

  const updateItemQuantity = (
    id: string,
    selectedOptions: { [key: string]: string },
    quantityChange: number,
    setDirectly = false,
  ) => {
    const uniqueKey = `${id}-${normalizeOptions(selectedOptions)}`;
    setItemsState((prevItems) =>
      prevItems.map((item) => {
        if (
          `${item.id}-${normalizeOptions(item.selectedOptions)}` === uniqueKey
        ) {
          const newQuantity = setDirectly
            ? quantityChange
            : item.quantity + quantityChange;
          return { ...item, quantity: newQuantity >= 1 ? newQuantity : 0 };
        }
        return item;
      }),
    );
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
