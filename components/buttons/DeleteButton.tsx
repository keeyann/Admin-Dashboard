"use client";

import { useState } from "react";
import { deleteProduct, restoreProduct } from "@/lib/actions";
import { toast } from "sonner";

export default function DeleteButton({ product }: { product: any }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete ${product.name}?`)) return;

    setIsDeleting(true);
    const backup = { ...product };
    delete backup.id;

    try {
      await deleteProduct(product.id);
      
      // Show global toast with Undo action
      toast.success(`${product.name} deleted`, {
        duration: 5000,
        action: {
          label: "Undo",
          onClick: () => restoreProduct(backup),
        },
      });
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-800 font-bold disabled:opacity-50"
    >
      {isDeleting ? "..." : "Delete"}
    </button>
  );
}