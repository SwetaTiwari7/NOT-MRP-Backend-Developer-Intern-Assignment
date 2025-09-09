import { z } from "zod";

export const Transaction = z.object({
  id: z.string().uuid().optional(),
  type: z.enum(["sale", "purchase"]),
  customerId: z.string().uuid().optional(),
  vendorId: z.string().uuid().optional(),
  products: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ),
  totalAmount: z.number().positive(),
  date: z.coerce.date(),
  businessId: z.string().uuid(),
});

export type Ztransaction = z.infer<typeof Transaction>;