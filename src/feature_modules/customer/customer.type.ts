import { z } from "zod";

export const Contact = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  type: z.enum(["customer", "vendor"]),
  businessId: z.string().uuid(),
});

export type Zcontact = z.infer<typeof Contact>;

