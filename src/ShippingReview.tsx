// ShippingReview.tsx

import React from "react";
import { useShipping } from "./ShippingContext"; // Assuming the shipping information is stored in this context

interface ShippingReviewProps {
  handleEditShipping: () => void; // Function to handle editing contact information
}

const ShippingReview: React.FC<ShippingReviewProps> = ({
  handleEditShipping,
}) => {
  const { shippingInfo } = useShipping(); // Get the current shipping info from context

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-bold">Checkout Details</h2>

      {/* Contact Information Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Contact Information</h3>
        <p>{shippingInfo.email}</p>
        <button
          onClick={handleEditShipping}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
      </div>

      {/* Shipping Address Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Shipping Address</h3>
        <p>{shippingInfo.fullName}</p>
        <p>{`${shippingInfo.address}, ${shippingInfo.apt || ""}`}</p>
        <p>{`${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}`}</p>
        <p>{shippingInfo.country}</p>
        <button
          onClick={handleEditShipping}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ShippingReview;
