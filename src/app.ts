import express from 'express';
import { registerMiddleware } from './route/route';
import connectDB from './connection/mongoose';

export const startServer = () => {
  try {
    const app = express();
    registerMiddleware(app);
    connectDB();
    const { PORT } = process.env;
    app.listen(PORT, () => {
      console.log(`Server Started at ${PORT}`);
    });
  } catch (e) {
    console.log(e);
    process.nextTick(() => {
      process.exit(1);
    });
  }
};
