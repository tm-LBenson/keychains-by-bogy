import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./NavBar";
import { HeroCarousel } from "./HeroCarousel";
import Products from "./Products";
import ProductDetail from "./ProductDetail"; // Import the ProductDetail component
import { CartProvider } from "./CartContext";

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroCarousel />
                <h2 className="text-4xl mt-20 text-black mx-10">
                  See our line of products.
                </h2>
                <main
                  id="products"
                  className="flex flex-col items-center min-h-screen p-4"
                >
                  <Products />
                </main>
              </>
            }
          />

          <Route
            path="/product/:id"
            element={
              <>
                <main>
                  <ProductDetail />
                </main>
              </>
            }
          />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
