import { z } from "zod";

export const Product = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  category: z.string(),
  businessId: z.string().uuid(),
});

export type Zproduct = z.infer<typeof Product>;