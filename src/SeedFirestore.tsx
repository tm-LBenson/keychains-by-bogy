import { useState } from "react";
import { db } from "./firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import { Product } from './Products';

const SeedFirestore = () => {
  const [status, setStatus] = useState("Ready to seed");

  const seedData = async () => {
    setStatus("Seeding...");
    try {
      const response = await fetch("/products.json");
      const { products } = await response.json();

      const promises = products.map((product: Product) =>
        setDoc(doc(db, "products", product.id), product),
      );

      await Promise.all(promises);
      setStatus("Seeding completed successfully!");
    } catch (error) {
      console.error("Error seeding data: ", error);
      setStatus("Error seeding data. Check console.");
    }
  };

  return (
    <div>
      <h1>{status}</h1>
      <button
        onClick={seedData}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Seed Firestore
      </button>
    </div>
  );
};

export default SeedFirestore;
