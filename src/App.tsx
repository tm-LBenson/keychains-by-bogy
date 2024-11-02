import "./App.css";

import { HeroCarousel } from "./HeroCarousel";
import Navbar from "./NavBar";

import Products from "./Products";

function App() {
  return (
    <>
      <Navbar />
      <HeroCarousel />
      <h2
        id="products"
        className="text-4xl mt-20 text-black mx-10"
      >
        See our line of products.
      </h2>
      <main className="flex flex-col items-center min-h-screen p-4">
        <Products />
      </main>
    </>
  );
}

export default App;
