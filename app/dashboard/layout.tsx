import LogoutButton from "@/components/buttons/LogoutButton";
import CustomerStoreButton from "@/components/buttons/CustomerStoreButton";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 fixed h-full">
        <div>
          <div className="mb-8">
            <span className="block font-bold text-gray-900">
              ADMIN PANEL
            </span>
          </div>


          <nav className="space-y-4">
            <Link href="/dashboard" className="block font-bold text-gray-700 hover:text-black">
              Inventory
            </Link>

            <Link href="/dashboard/manage-admins" className="block font-bold text-gray-700 hover:text-black">
              Add New Admin
            </Link>
            <CustomerStoreButton />
          </nav>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100 space-y-2">
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 ml-64 p-10">
        {children}
      </main>
    </div>
  );
}
