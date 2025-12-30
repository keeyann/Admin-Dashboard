"use client";

import { useDashboard } from "@/context/DashboardContext";

export default function EditButton({ product }: { product: any }) {
  const { setEditingProduct } = useDashboard();

  return (
    <button 
      onClick={() => {
        setEditingProduct(product);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="text-blue-600 hover:text-blue-800 font-bold"
    >
      Edit
    </button>
  );
}