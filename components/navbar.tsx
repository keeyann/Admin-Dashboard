import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">AdminPanel</h1>
      <div className="space-x-6">
        <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
        <Link href="/products" className="text-gray-600 hover:text-blue-600">Products</Link>
      </div>
    </nav>
  );
}