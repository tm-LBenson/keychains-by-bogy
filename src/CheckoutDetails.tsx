import React from "react";
import ShippingReview from "./ShippingReview";
import PayPalComponent from "./PayPalComponent";
import { ShippingInfo } from "./ShippingContext";

interface CheckoutDetailsProps {
  handleEditShipping: () => void;
  shippingInfo: ShippingInfo;
}

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
  handleEditShipping,
}) => {
  return (
    <div className="mt-10 flex flex-col items-center gap-7 justify-center">
      <div className="md:w-[750px] w-full">
        <ShippingReview handleEditShipping={handleEditShipping} />
      </div>
      <div className="md:w-[750px] w-full">
        <PayPalComponent />
      </div>
    </div>
  );
};

export default CheckoutDetails;
