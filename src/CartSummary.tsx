import React from "react";
import { CartItem } from "./CartContext";

interface CartSummaryProps {
  cartItems: CartItem[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + +item.unitAmount.value * item.quantity,
    0,
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-[530px]">
      <h3 className="text-xl font-bold">Order Summary</h3>
      <ul>
        {cartItems.map((item) => (
          <li
            key={`${item.id}-${JSON.stringify(item.selectedOptions)}`}
            className="flex flex-col py-2 border-b last:border-none"
          >
            <div className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>
                ${(+item.unitAmount.value * item.quantity).toFixed(2)}
              </span>
            </div>
            {item.selectedOptions && (
              <div className="text-sm text-gray-600 mt-1">
                {Object.entries(item.selectedOptions).map(
                  ([optionName, optionValue]) => (
                    <p key={optionName}>
                      {optionName}: {optionValue}
                    </p>
                  ),
                )}
              </div>
            )}
          </li>
        ))}
        <div className="text-lg font-bold mt-4">
          Total: <span>${total.toFixed(2)}</span>
        </div>
      </ul>
    </div>
  );
};

export default CartSummary;
