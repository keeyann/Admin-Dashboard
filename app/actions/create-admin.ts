"use server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

export async function createAdmin(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Not authorized"); 

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}