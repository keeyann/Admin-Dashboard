"use client";

import Link from "next/link";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const { data, isLoading, error } = useProducts();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto py-10 px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-black">
            Available Products
          </h1>

          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-md bg-blue-600 text-white"
          >
            Go to Admin Dashboard
          </Link>
        </div>

        {isLoading && <p className="text-zinc-600">Loading...</p>}

        {error && <p className="text-red-500">Failed to load products</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((p: any) => (
            <div
              key={p.id}
              className="border rounded-lg bg-white shadow-sm overflow-hidden"
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
                <div className="w-full h-40 bg-zinc-200 flex items-center justify-center text-zinc-600">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h2 className="text-lg font-medium text-black">{p.name}</h2>

                <p className="text-sm text-zinc-600 line-clamp-2">
                  {p.description}
                </p>

                <div className="mt-3 text-sm text-black">
                  Price: ${p.price}
                </div>

                <div className="text-xs text-zinc-500">
                  Stock: {p.stock}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
