// lib/validation.ts
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
  imageUrl: z.string().min(1),
});

export type ProductInput = z.infer<typeof productSchema>;
