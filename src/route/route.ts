import express, { Application, json, NextFunction, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import { routes, routesToExclude } from './route.data';
import { authoriseRoutes } from '../../authorize';

export const registerMiddleware = (app: Application) => {
  app.use(cors());

  app.use(json());
  app.use(urlencoded());
  app.use('/product/uploaded-file', express.static('uploads'));
  app.use('/goodies', express.static('uploads'));

  app.use(authoriseRoutes(routesToExclude));

  for (let r of routes) {
    app.use(r.path, r.router);
  }
  app.use((err: { status: number; message: string }, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).send(err.message);
  });
};
