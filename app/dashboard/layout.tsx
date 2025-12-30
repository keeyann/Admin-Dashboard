"use client";

import LogoutButton from "@/components/buttons/LogoutButton";
import { logoutToHome } from "@/lib/logout";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isInventory = pathname === "/dashboard";
  const isManageAdmins = pathname.startsWith("/dashboard/manage-admins");
  const isCustomerMenu = pathname === "/";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 fixed h-full">
        <div>
          <h2 className="text-xl font-black text-black mb-10">
            ADMIN PANEL
          </h2>

          <nav className="flex flex-col gap-4">

            <Link
              href="/dashboard"
              className={`font-bold ${
                isInventory
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Inventory
            </Link>

            <Link
              href="/dashboard/manage-admins"
              className={`font-bold ${
                isManageAdmins
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Add New Admin
            </Link>

            <form action={logoutToHome}>
              <button
                className={`font-bold ${
                  isCustomerMenu
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Customer Product Menu
              </button>
            </form>

          </nav>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 ml-64 p-10">
        {children}
      </main>
    </div>
  );
}
