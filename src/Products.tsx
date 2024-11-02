import React, { useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
}

export interface ProductsData {
  products: Product[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from the JSON file
    fetch("/products.json")
      .then((response) => response.json())
      .then((data: ProductsData) => setProducts(data.products))
      .catch((error) => console.error("Failed to load products:", error));
  }, []);

  return (
    <>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg p-4 shadow-lg"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-[500px] w-full object-cover img"
            />
            <div className="p-2">
              <h2 className="text-2xl text-pink-800">{product.name}</h2>
              <p className="text-md text-pink-600">{product.description}</p>
              <p className="text-lg text-pink-800">{product.price}</p>{" "}
              {/* Display price */}
              <button className="mt-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
