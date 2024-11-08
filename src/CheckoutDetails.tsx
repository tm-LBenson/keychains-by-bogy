// CheckoutDetails.tsx

import React from "react";
import ShippingReview from "./ShippingReview";
import PayPalComponent from "./PayPalComponent";

interface CheckoutDetailsProps {
  handleEditShipping: () => void;
}

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
  handleEditShipping,
}) => {
  return (
    <div className="mt-10 flex flex-col items-center gap-7 justify-center">
      <div className="w-[90%]">
        <ShippingReview handleEditShipping={handleEditShipping} />
      </div>
      <div className="w-[90%]">
        <PayPalComponent />
      </div>
    </div>
  );
};

export default CheckoutDetails;
