"use server";

import { signOut } from "@/auth";

export async function logoutToHome() {
  await signOut({ redirectTo: "/" });
}

export async function logoutToLogin() {
  await signOut({ redirectTo: "/login" });
}
