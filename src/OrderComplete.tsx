import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CartItem } from "./CartContext";
import { ShippingInfo } from "./ShippingContext";

interface OrderState {
  items: CartItem[];
  orderId: string;
  totalAmount: number;
  shippingInfo: ShippingInfo;
}

const OrderComplete: React.FC = () => {
  const location = useLocation();
  const state = location.state as OrderState;

  const { items, orderId, totalAmount, shippingInfo } = state || {
    items: [],
    orderId: "",
    totalAmount: 0,
    shippingInfo: {},
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="bg-green-100 p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold mb-4 text-green-600">
          Order Completed Successfully!
        </h1>
        <p className="text-lg mb-4 text-gray-700">
          Thank you for your purchase. Your order has been processed
          successfully.
        </p>

        {orderId && (
          <div className="flex items-center justify-center mb-6">
            <p className="text-lg">
              <strong>Order Reference Number:</strong> {orderId}
            </p>
          </div>
        )}
      </div>

      {shippingInfo && (
        <div className="shipping-info bg-white p-6 rounded-lg shadow-md mb-8 text-left">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Shipping Information
          </h2>
          <p className="text-lg mb-2">
            <strong>Full Name:</strong> {shippingInfo.fullName}
          </p>
          <p className="text-lg mb-2">
            <strong>Email:</strong> {shippingInfo.email}
          </p>
          <p className="text-lg mb-2">
            <strong>Address:</strong> {shippingInfo.address},{" "}
            {shippingInfo.apt ? `Apt ${shippingInfo.apt},` : ""}
            {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.zipCode},{" "}
            {shippingInfo.country}
          </p>
        </div>
      )}

      {items.length > 0 && (
        <div className="order-summary bg-white p-6 rounded-lg shadow-md mb-8 text-left">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Order Summary
          </h2>
          <ul className="mb-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="text-lg mb-2 flex justify-between border-b pb-2"
              >
                <span>
                  <strong>{item.name}</strong> - Quantity: {item.quantity}
                </span>
                <span className="font-semibold">
                  ${(+item.unitAmount.value * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xl font-semibold mt-4">
            Total Amount: ${totalAmount.toFixed(2)}
          </p>
        </div>
      )}

      <div className="estimated-delivery bg-white p-6 rounded-lg shadow-md mb-8 text-left flex items-center">
        <p className="text-lg">
          <strong>Estimated Delivery:</strong>{" "}
          {estimatedDelivery.toLocaleDateString()}
        </p>
      </div>

      <Link
        to="/"
        className="text-lg text-white bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md shadow-md transition duration-200 ease-in-out"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderComplete;
