"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-300 shadow-xl">
        
        <header className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900">Admin Portal</h1>
          <p className="text-gray-500 font-bold mt-2 text-sm uppercase italic">
            Secure Login Required
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-bold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-black text-gray-900 mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-black font-medium focus:border-black outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-gray-900 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-black font-medium focus:border-black outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-4 rounded-lg font-black text-lg hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Authorize Access"}
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <a
            href="/"
            className="text-sm font-bold text-blue-700 hover:text-black transition-colors"
          >
            ← Back to Customer Product Menu
          </a>
        </div>

      </div>
    </div>
  );
}
