"use client";

import { logoutToLogin } from "@/lib/logout";

export default function LogoutButton() {
  return (
    <form action={logoutToLogin}>
      <button className="flex items-center gap-2 text-red-600 font-bold">
        ↪ Sign Out
      </button>
    </form>
  );
}
