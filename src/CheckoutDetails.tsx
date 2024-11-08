// CheckoutDetails.tsx

import React from "react";
import ShippingReview from "./ShippingReview";
import PayPalComponent from "./PayPalComponent";
import { useCart } from "./CartContext";

interface CheckoutDetailsProps {
  handleEditShipping: () => void;
}
const isServerAwake = useCart().isServerAwake;
const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
  handleEditShipping,
}) => {
  return (
    <div className="mt-10 flex flex-col items-center gap-7 justify-center">
      <div className="w-[90%]">
        <ShippingReview handleEditShipping={handleEditShipping} />
      </div>
      <div className="w-[90%]">
        {isServerAwake ? <PayPalComponent /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default CheckoutDetails;
