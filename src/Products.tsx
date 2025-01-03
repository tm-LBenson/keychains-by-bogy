import React, { useState, useEffect } from "react";
import { db } from "./firestore";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export interface UnitAmount {
  currencyCode: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrls: string[];
  unitAmount: UnitAmount;
  onHand: number;
  originalPrice?: string;
  showOnStore: boolean;
  options?: ProductOption[];
}
export interface ProductOption {
  name: string;
  choices: string[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray: Product[] = querySnapshot.docs
        .map((doc) => ({
          ...(doc.data() as Product),
          id: doc.id,
        }))
        .filter((product) => product.showOnStore);
      setProducts(productsArray);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="font-[sans-serif] py-4 mx-auto lg:max-w-6xl max-w-lg md:max-w-full">
      <h2 className="text-4xl  mt-20 text-black mb-10">
        See our line of products.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-pink-200 rounded-2xl shadow-lg"
          >
            <Link
              to={`/product/${product.id}`}
              className="bg-gray-200 rounded-xl cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden"
            >
              <div className="p-6">
                <div className="w-2/3 h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <div className="text-center p-6">
                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>
                <h4 className="text-lg text-gray-800 font-bold mt-6">
                  ${product.unitAmount.value}
                </h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
