import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

export interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface ShippingContextType {
  shippingInfo: ShippingInfo;
  setShippingInfo: (info: ShippingInfo) => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
}

const defaultValues: ShippingContextType = {
  shippingInfo: {
    fullName: "",
    email: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  },
  setShippingInfo: () => {},
  editMode: false,
  setEditMode: () => {},
};

// Create the context
const ShippingContext = createContext<ShippingContextType>(defaultValues);

// Provider component
export const ShippingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [shippingInfo, setShippingInfoState] = useState<ShippingInfo>(() => {
    try {
      const savedShipping = localStorage.getItem("shippingInfo");
      if (savedShipping) {
        const { data, expiry } = JSON.parse(savedShipping);
        if (expiry > Date.now()) {
          return data;
        } else {
          localStorage.removeItem("shippingInfo");
        }
      }
    } catch (error) {
      console.error("Failed to parse shipping info from localStorage:", error);
    }
    return defaultValues.shippingInfo;
  });

  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    try {
      const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now
      const serializedShipping = JSON.stringify({ data: shippingInfo, expiry });
      localStorage.setItem("shippingInfo", serializedShipping);
    } catch (error) {
      console.error("Failed to save shipping info to localStorage:", error);
    }
  }, [shippingInfo]);

  const setShippingInfo = (info: ShippingInfo) => {
    setShippingInfoState(info);
  };

  return (
    <ShippingContext.Provider
      value={{ shippingInfo, setShippingInfo, editMode, setEditMode }}
    >
      {children}
    </ShippingContext.Provider>
  );
};

// Custom hook to use the shipping context
export const useShipping = () => useContext(ShippingContext);

export default ShippingContext;
