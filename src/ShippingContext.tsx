// ShippingContext.tsx

import React, { createContext, useState, useContext, ReactNode } from "react";

interface ShippingInfo {
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
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(
    defaultValues.shippingInfo,
  );
  const [editMode, setEditMode] = useState<boolean>(false);

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
