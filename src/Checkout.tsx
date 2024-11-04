// Checkout.tsx

import React, { useState } from "react";
import Shipping from "./Shipping";
import CartSummary from "./CartSummary";
import CheckoutDetails from "./CheckoutDetails"; // Include CheckoutDetails
import { useCart } from "./CartContext";

const Checkout: React.FC = () => {
  const [step, setStep] = useState(1);

  const { items } = useCart();

  const handleNextStep = () => {
    setStep(step + 1); // Increment step to move to the next part of the process
  };

  const handleEditShipping = () => {
    setStep(1); 
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {step === 1 && <Shipping onNext={handleNextStep} />}
          {step === 2 && (
            <CheckoutDetails handleEditShipping={handleEditShipping} />
          )}
          {/* Uncomment and include when PaymentInfo is required */}
          {/* {step === 3 && <PaymentInfo />} */}
        </div>
        <div className="md:col-span-1">
          <CartSummary cartItems={items} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
