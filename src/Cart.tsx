import React, { useState } from "react";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: "KeyChain Model A", quantity: 2, price: 15.99 },
    { id: 2, name: "KeyChain Model B", quantity: 1, price: 9.99 },
  ]);

  // Toggle cart dropdown
  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleCart}
        className="text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={30}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className="p-2 hover:bg-gray-100"
              >
                {item.name} - {item.quantity} x ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <div className="p-2">
            <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
