// Shipping.tsx

import React from "react";
import { useShipping } from "./ShippingContext"; // Import the context hook

interface ShippingFormProps {
  onNext: () => void; // onNext now doesn't need to pass data
}

const Shipping: React.FC<ShippingFormProps> = ({ onNext }) => {
  const { shippingInfo, setShippingInfo, setEditMode } = useShipping();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    onNext();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Shipping Details</h2>
          {Object.keys(shippingInfo).map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-700"
              >
                {key.charAt(0).toUpperCase() + key.slice(1) === "FullName"
                  ? "Full Name"
                  : key.charAt(0).toUpperCase() + key.slice(1) === "ZipCode"
                  ? "Zip Code"
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type={key === "email" ? "email" : "text"}
                name={key}
                id={key}
                value={(shippingInfo as any)[key]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required={key !== "apt"}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Continue to Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
