"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    
    // Internal Server Action call (defined below for simplicity)
    const response = await fetch("/api/admin/create", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.message || "Failed to create admin");
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      e.currentTarget.reset();
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 text-sm font-bold text-green-600 bg-green-50 border border-green-200 rounded-lg">
          Admin created successfully!
        </div>
      )}

      <div>
        <label className="block text-sm font-black text-gray-900 mb-1">Full Name</label>
        <input 
          name="name" 
          type="text" 
          required 
          className="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-black outline-none" 
        />
      </div>

      <div>
        <label className="block text-sm font-black text-gray-900 mb-1">Email Address</label>
        <input 
          name="email" 
          type="email" 
          required 
          className="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-black outline-none" 
        />
      </div>

      <div>
        <label className="block text-sm font-black text-gray-900 mb-1">Password</label>
        <input 
          name="password" 
          type="password" 
          required 
          className="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-black outline-none" 
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-black text-white p-4 rounded-lg font-black hover:bg-gray-800 transition-all disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Register Admin"}
      </button>
    </form>
  );
}