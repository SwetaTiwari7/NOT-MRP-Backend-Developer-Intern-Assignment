import { z } from "zod";

export const User = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { message: "Name Cannot Be Empty" }),
  role: z.string(),
  email: z.string().email(),
  password: z.string(),
  businessId: z.string().uuid(),
  isDeleted: z.boolean().optional(),
});

export type Zuser = z.infer<typeof User>;

export const filter = z.object({
  id: z.string().optional(),
  role: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export type Filter = z.infer<typeof filter>;

export const update = User.pick({
  name: true,
  email: true,
});

export type Update = z.infer<typeof update>;
