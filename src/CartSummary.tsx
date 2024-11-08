// CartSummary.tsx

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
              key={item.id}
              className="flex justify-between py-2"
            >
              {item.name} x {item.quantity}
              <span>
                ${(+item.unitAmount.value * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
          <div className="text-lg font-bold ">
            Total: <span>${total.toFixed(2)}</span>
          </div>
        </ul>
      </div>

  );
};

export default CartSummary;
