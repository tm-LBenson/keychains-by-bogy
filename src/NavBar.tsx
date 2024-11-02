import { useState } from "react";
import logo from "/logo.webp"; // Adjust the path accordingly
import Cart from "./Cart"; // Make sure the path matches

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-pink-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <a
          href="/"
          className="flex items-center"
        >
          <img
            src={logo}
            alt="KeyChains By Bogy Logo"
            className="h-8 mr-3 img"
          />
          <span className="font-bold text-lg">KeyChains By Bogy</span>
        </a>

        <div className={`md:flex items-center ${isOpen ? "block" : "hidden"}`}>
          <a
            href="#products"
            className="text-white px-3 py-2 rounded-md text-lg font-medium"
          >
            Products
          </a>
          <a
            href="/about"
            className="text-white px-3 py-2 rounded-md text-lg font-medium"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-white px-3 py-2 rounded-md text-lg font-medium"
          >
            Contact
          </a>
          <Cart />
        </div>

        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
