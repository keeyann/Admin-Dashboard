"use client";
import { useDashboard } from "@/context/DashboardContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/validation";
import { useCreateProduct } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/lib/actions";

export default function ProductForm() {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  const router = useRouter();
  const { editingProduct, setEditingProduct } = useDashboard();
  const { mutate, isPending } = useCreateProduct();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (editingProduct) {
      setValue("name", editingProduct.name);
      setValue("description", editingProduct.description);
      setValue("category", editingProduct.category);
      setValue("price", editingProduct.price);
      setValue("stock", editingProduct.stock);
      setValue("imageUrl", editingProduct.imageUrl);
      setPreview(editingProduct.imageUrl || "");
      setStep(1);
    }
  }, [editingProduct, setValue]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setValue("imageUrl", data.secure_url);
    setPreview(data.secure_url);
    setUploading(false);
  };

  const onSubmit = async (data: any) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
      setEditingProduct(null);
      reset();
      setPreview("");
      setStep(1);
    } else {
      mutate(data, {
        onSuccess: () => {
          setStep(1);
          setPreview("");
          reset();
          router.refresh();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900">
        {editingProduct ? "Editing: " + editingProduct.name : "Add New Product"}
      </h2>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-900">Product Name</label>
            <input {...register("name")} className="w-full border-gray-400 border p-2 text-black font-medium" />
            {errors.name && <p className="text-red-600 text-xs font-bold mt-1">{errors.name.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900">Description</label>
            <textarea {...register("description")} className="w-full border-gray-400 border p-2 text-black font-medium" />
            {errors.description && <p className="text-red-600 text-xs font-bold mt-1">{errors.description.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900">Category</label>
            <input {...register("category")} className="w-full border-gray-400 border p-2 text-black font-medium" />
            {errors.category && <p className="text-red-600 text-xs font-bold mt-1">{errors.category.message as string}</p>}
          </div>
          <button type="button" onClick={() => setStep(2)} className="bg-blue-600 text-white px-4 py-2 w-full font-bold">
            Next Step
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-900">Price</label>
            <input type="number" {...register("price", { valueAsNumber: true })} className="w-full border-gray-400 border p-2 text-black font-medium" />
            {errors.price && <p className="text-red-600 text-xs font-bold mt-1">{errors.price.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900">Stock</label>
            <input type="number" {...register("stock", { valueAsNumber: true })} className="w-full border-gray-400 border p-2 text-black font-medium" />
            {errors.stock && <p className="text-red-600 text-xs font-bold mt-1">{errors.stock.message as string}</p>}
          </div>
          
          <div className="border-2 border-dashed border-gray-400 p-4 text-center">
            <input type="file" onChange={handleImageUpload} className="hidden" id="image-upload" />
            <label htmlFor="image-upload" className="cursor-pointer text-blue-700 font-bold">
              {uploading ? "Uploading..." : "Upload Product Image"}
            </label>
            {preview && <img src={preview} alt="Preview" className="mt-2 h-20 mx-auto" />}
            {errors.imageUrl && <p className="text-red-600 text-xs font-bold mt-1">{errors.imageUrl.message as string}</p>}
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setStep(1)} className="bg-gray-400 text-white px-4 py-2 flex-1 font-bold">
              Back
            </button>
            <button type="submit" disabled={isPending || uploading} className="bg-green-700 text-white px-4 py-2 flex-1 font-bold">
              {editingProduct ? "Update Changes" : "Finish & Save"}
            </button>
          </div>
          
          {editingProduct && (
            <button type="button" onClick={() => { reset(); setEditingProduct(null); setPreview(""); }} className="w-full text-red-600 underline font-bold">
              Cancel Edit
            </button>
          )}
        </div>
      )}
    </form>
  );
}