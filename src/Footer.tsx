import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold">KeyChains By Bogy LLC</h2>
            <p className="mt-2">
              Your source for stylish self-defense products and apparel.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link
              to="/#products"
              className="hover:underline"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="hover:underline"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:underline"
            >
              Contact
            </Link>
          </div>
          <div className="mt-4 md:mt-0 text-center">
            <p className="text-sm">Follow us on:</p>
            <div className="flex justify-center gap-4 mt-2">
              <a
                href="https://www.facebook.com/people/Keychains-By-Bogy/100087466087266/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10s-10 4.48-10 10c0 5 3.66 9.13 8.44 9.87v-6.99h-2.54v-2.88h2.54v-2.12c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.62.77-1.62 1.55v1.81h2.77l-.44 2.88h-2.33v6.99c4.78-.74 8.44-4.87 8.44-9.87z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} KeyChains By Bogy LLC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
