import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./NavBar";
import { HeroCarousel } from "./HeroCarousel";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import { CartProvider } from "./CartContext";
import Checkout from "./Checkout";
import { ShippingProvider } from "./ShippingContext";
import OrderComplete from "./OrderComplete";

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
          <Route
            path="/checkout"
            element={
              <ShippingProvider>
                <Checkout />
              </ShippingProvider>
            }
          />
          <Route
            path="/order-complete"
            element={
              <main>
                <OrderComplete />
              </main>
            }
          />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
