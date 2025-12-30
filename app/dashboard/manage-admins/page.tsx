import AdminForm from "@/components/forms/AdminForm";
import { logoutToHome } from "@/lib/logout";

export default function ManageAdminsPage() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      
      <header className="mb-10">
        <h1 className="text-3xl font-black text-gray-900">
          User Management
        </h1>
        <p className="text-gray-500 font-bold uppercase text-sm tracking-widest">
          Register New Administrative Accounts
        </p>
      </header>

      <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-sm">
        <AdminForm />
      </div>

      <div className="mt-8 flex justify-between">

        <a
          href="/dashboard"
          className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
        >
          ← Back to Inventory
        </a>

        <form action={logoutToHome}>
          <button className="text-sm font-bold text-blue-700 hover:text-black transition-colors">
            Go to Customer Product Menu →
          </button>
        </form>

      </div>
    </div>
  );
}
