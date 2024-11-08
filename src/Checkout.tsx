import React, { useState } from "react";
import Shipping from "./Shipping";
import CartSummary from "./CartSummary";
import CheckoutDetails from "./CheckoutDetails";
import { useCart } from "./CartContext";
import { useShipping } from "./ShippingContext";
import { Link } from "react-router-dom";

const Checkout: React.FC = () => {
  const [step, setStep] = useState(1);
  const { items } = useCart();
  const { shippingInfo } = useShipping(); // Get shipping info from context

  const handleNextStep = () => {
    setStep(step + 1); // Increment step to move to the next part of the process
  };

  const handleEditShipping = () => {
    setStep(1);
  };

  if (items.length === 0) {
    // If the cart is empty, display a message instead of proceeding to checkout steps
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-lg mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="text-blue-500 hover:underline text-lg"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:justify-center items-center">
        <div className="md:flex-grow w-full">
          {step === 1 && (
            <>
              <div className="flex flex-col-reverse lg:flex-row gap-2">
                <div className="grow-[1]">
                  <Shipping onNext={handleNextStep} />
                </div>
                <div className="grow-[1]">
                  <CartSummary cartItems={items} />
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <CheckoutDetails
              handleEditShipping={handleEditShipping}
              shippingInfo={shippingInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
