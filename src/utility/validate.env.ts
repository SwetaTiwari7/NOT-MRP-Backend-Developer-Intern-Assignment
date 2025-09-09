import { config } from 'dotenv';
import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().nonnegative(),
  MONGODB_URL:z.string().nonempty(),
  SECRET_KEY: z.string().nonempty(),
});

export type Env = z.infer<typeof envSchema>;

export const validateEnv = () => {
  config();
  envSchema.passthrough().parse(process.env);
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
  namespace Express {
    interface Request {
      payload: any;
    }
  }
}
