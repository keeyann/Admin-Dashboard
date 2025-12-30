"use client";

import Link from "next/link";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";

export default function Home() {
  const { data, isLoading, error } = useProducts();
  const [query, setQuery] = useState("");

  const filteredProducts = data?.filter((p: any) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto py-10 px-6 space-y-6">

        <h1 className="text-3xl font-extrabold text-black">
          Hello User
        </h1>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">
            Available Products
          </h2>

          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium"
          >
            Go to Admin Dashboard
          </Link>
        </div>

        <div className="w-full max-w-md">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black font-medium"
          />
        </div>

        {isLoading && (
          <p className="text-gray-600">Loading...</p>
        )}

        {error && (
          <p className="text-red-600">Failed to load products</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts?.map((p: any) => (
            <div
              key={p.id}
              className="border rounded-xl bg-white shadow-sm overflow-hidden"
            >
              {p.imageUrl ? (
                <div className="relative w-full h-40">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}

              <div className="p-4 space-y-1">
                <h3 className="text-lg font-bold text-black">
                  {p.name}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {p.description}
                </p>

                <div className="text-sm font-semibold mt-2">
                  Price: ${p.price}
                </div>

                <div className="text-xs text-gray-500">
                  Stock: {p.stock}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts?.length === 0 && (
          <p className="text-gray-500 font-medium">
            No products match your search.
          </p>
        )}

      </div>
    </div>
  );
}
