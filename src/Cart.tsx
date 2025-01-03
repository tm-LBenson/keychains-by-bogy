import { useState } from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

interface CartProps {
  setToggleCart: () => void;
}

const Cart: React.FC<CartProps> = ({ setToggleCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, updateItemQuantity, removeItem } = useCart();

  const toggleCart = () => {
    setIsOpen(!isOpen);
    setToggleCart();
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const handleIncrease = (
    id: string,
    selectedOptions: { [key: string]: string },
  ) => {
    updateItemQuantity(id, selectedOptions, 1);
  };

  const handleDecrease = (
    id: string,
    selectedOptions: { [key: string]: string },
  ) => {
    updateItemQuantity(id, selectedOptions, -1);
  };

  const handleInputChange = (
    id: string,
    selectedOptions: { [key: string]: string },
    value: string,
  ) => {
    const quantity = parseInt(value, 10);
    updateItemQuantity(id, selectedOptions, quantity, true);
  };

  const handleRemoveItem = (
    id: string,
    selectedOptions: { [key: string]: string },
  ) => {
    removeItem(id, selectedOptions);
  };

  return (
    <div className="z-50">
      <button
        onClick={toggleCart}
        className="relative z-50"
      >
        {totalItems > 0 && (
          <span className="absolute bottom-5 left-6 inline-flex items-center justify-center px-2 py-1 bg-red-500 rounded-full text-white text-xs">
            {totalItems}
          </span>
        )}
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
        <div
          style={{ zIndex: "1000" }}
          className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg overflow-auto"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-bold">Shopping Cart</h3>
            <button
              onClick={toggleCart}
              className="text-gray-400 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-black"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="p-4">
              <p className="text-center text-gray-500">
                Your cart is empty. Start shopping now!
              </p>
            </div>
          ) : (
            <>
              <ul className="divide-y">
                {items.map((item) => (
                  <li
                    key={`${item.id}-${JSON.stringify(item.selectedOptions)}`}
                    className="flex justify-between items-center p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imageUrls[0]}
                        alt={item.name}
                        className="h-16 w-16 rounded"
                      />
                      <div>
                        <p className="font-bold">{item.name}</p>
                        {item.selectedOptions && (
                          <div className="text-sm text-gray-600">
                            {Object.entries(item.selectedOptions).map(
                              ([optionName, optionValue]) => (
                                <p key={optionName}>
                                  {optionName}: {optionValue}
                                </p>
                              ),
                            )}
                          </div>
                        )}
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => {
                              handleDecrease(
                                item.id,
                                item.selectedOptions || {},
                              );
                              if (item.quantity === 1) {
                                handleRemoveItem(
                                  item.id,
                                  item.selectedOptions || {},
                                );
                              }
                            }}
                            className="px-3 py-1 text-xl font-semibold border border-gray-400 rounded"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleInputChange(
                                item.id,
                                item.selectedOptions || {},
                                e.target.value,
                              )
                            }
                            className="w-16 text-center text-xl border rounded"
                            min="0"
                          />
                          <button
                            onClick={() =>
                              handleIncrease(
                                item.id,
                                item.selectedOptions || {},
                              )
                            }
                            className="px-3 py-1 text-xl font-semibold border border-gray-400 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleRemoveItem(item.id, item.selectedOptions || {})
                      }
                      className="ml-4 text-gray-400 hover:text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <span>
                      ${(+item.unitAmount.value * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="p-4">
                <Link to={"/checkout"}>
                  <button
                    onClick={toggleCart}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
