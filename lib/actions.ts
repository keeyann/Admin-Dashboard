"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/dashboard");
}

export async function restoreProduct(data: any) {
  await prisma.product.create({ data });
  revalidatePath("/dashboard");
}

export async function updateProduct(id: string, data: any) {
  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      category: data.category,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      imageUrl: data.imageUrl,
    },
  });
  revalidatePath("/dashboard");
}