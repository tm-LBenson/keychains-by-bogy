import { motion, AnimatePresence } from "framer-motion";

interface AddedToCartProps {
  message: string;
  isVisible: boolean; // To control the visibility of the alert
}

const AddedToCart: React.FC<AddedToCartProps> = ({ message, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-[0_3px_10px_-3px_rgba(6,81,237,0.3)] border-t-4 border-green-500 text-gray-800 flex items-center w-max max-w-sm p-4 rounded-md"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[18px] shrink-0 fill-green-500 inline mr-3"
            viewBox="0 0 512 512"
          >
            <ellipse
              cx="246"
              cy="246"
              data-original="#000000"
              rx="246"
              ry="246"
            />
            <path
              className="fill-white"
              d="m235.472 392.08-121.04-94.296 34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z"
              data-original="#000000"
            />
          </svg>
          <span className="text-sm font-semibold tracking-wide">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddedToCart;
