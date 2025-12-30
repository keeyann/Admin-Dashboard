"use client";

import { signOut } from "next-auth/react";

export default function CustomerStoreButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="block w-full text-left font-bold text-gray-700 hover:text-black"
    >
      Customer Product Menu
    </button>
  );
}
