import React from "react";
import ShippingReview from "./ShippingReview";
import PayPalComponent from "./PayPalComponent";
import { ShippingInfo } from "./ShippingContext";
import CartSummary from "./CartSummary";
import { useCart } from "./CartContext";

interface CheckoutDetailsProps {
  handleEditShipping: () => void;
  shippingInfo: ShippingInfo;
}

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
  handleEditShipping,
}) => {
  const { items } = useCart();
  return (
    <div className="mt-10 flex flex-col items-center gap-7 justify-center">
      <div className="md:w-[750px] w-full">
        <div className="self-center mb-5 flex flex-1 justify-center">
          <CartSummary cartItems={items} />
        </div>
        <ShippingReview handleEditShipping={handleEditShipping} />
      </div>
      <div className="md:w-[750px] w-full">
        <PayPalComponent />
      </div>
    </div>
  );
};

export default CheckoutDetails;
