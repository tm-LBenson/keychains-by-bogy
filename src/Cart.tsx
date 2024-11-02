import { useState } from "react";
import { useCart } from "./CartContext";

interface CartProps {
  cartOpen: boolean;
  setToggleCart: () => void;
}

const Cart: React.FC<CartProps> = ({ setToggleCart, cartOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={() => {
          toggleCart();
          setToggleCart();
        }}
        className="relative z-20"
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
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">Shopping Cart</h3>
              {cartOpen && (
                <button
                  onClick={() => {
                    toggleCart();
                    setToggleCart();
                  }}
                  className="text-gray-400 z-[] hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 fill-black"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
            <ul className="divide-y">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-4"
                >
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="p-4">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
