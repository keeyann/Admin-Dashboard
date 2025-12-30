"use client";

import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  if (products.length === 0) {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }

  return (
    <div className="min-h-screen bg-white text-black">

      <div className="max-w-6xl mx-auto px-6 py-10 flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-black">Hello User</h1>
          <p className="text-gray-600 font-medium mt-1">
            Available Products
          </p>
        </div>

        <a
          href="/login"
          className="text-sm font-bold text-blue-700 hover:text-black transition-colors"
        >
          Go to Admin Dashboard →
        </a>

      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">

        {products.map(p => (
          <div
            key={p.id}
            onClick={() => setSelectedProduct(p)}
            className="cursor-pointer bg-white border border-gray-300 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              {p.imageUrl ? (
                <Image
                  src={p.imageUrl}
                  width={300}
                  height={300}
                  alt={p.name}
                  className="object-contain"
                />
              ) : (
                <span className="text-gray-500 text-xs">No Image</span>
              )}
            </div>

            <div className="mt-3">
              <h2 className="font-bold text-lg">{p.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {p.description}
              </p>

              <p className="mt-2 font-black">
                ₹{p.price}
              </p>
            </div>
          </div>
        ))}

      </div>


      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-2xl rounded-2xl border-2 border-gray-300 shadow-xl overflow-hidden">

            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-black">{selectedProduct.name}</h2>

              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-500 font-bold hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
              {selectedProduct.imageUrl ? (
                <img
                  src={selectedProduct.imageUrl}
                  className="h-full object-contain"
                  alt="Product"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>

            <div className="px-6 py-4 space-y-2">

              <p className="text-gray-700">
                {selectedProduct.description}
              </p>

              <p className="text-sm font-bold">
                Category:
                <span className="font-medium ml-1">
                  {selectedProduct.category}
                </span>
              </p>

              <p className="text-lg font-black">
                ₹{selectedProduct.price}
              </p>

              <p className="text-sm font-bold">
                Stock:
                {selectedProduct.stock > 0 ? (
                  <span className="text-green-600 ml-1">
                    {selectedProduct.stock} units available
                  </span>
                ) : (
                  <span className="text-red-600 ml-1">
                    Out of stock
                  </span>
                )}
              </p>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
