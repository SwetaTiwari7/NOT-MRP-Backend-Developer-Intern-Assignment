import { z } from 'zod';
import { User } from '../user/user.types';

export const credential = User.pick({
  email: true,
  password: true,
});

export type Credential = z.infer<typeof credential>;

export const register = z.object({
  name: z.string().min(1, { message: 'Name Cannot Be Empty' }),
  email: z.string().email(),
  contact_no: z.number().positive(),
});

export type Register = z.infer<typeof register>;
