import { NextFunction, Request, Response } from "express";
import { excludedRoutes } from "./src/route/route.type";
import { verify } from "jsonwebtoken";

export const authoriseRoutes = (routesToExclude: excludedRoutes[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (routesToExclude.find((r) => r.path(req.path) && r.method == req.method)) {
        return next();
      }
      const token = req.headers.authorization;
      if (!token) {
        throw ("UNAUTHORISE");
      }
      const payload = verify(token, process.env.SECRET_KEY);
      req.payload = payload;
      console.log("Payload after verification", req.payload);
      return next();
    }
    catch (e) {
      next(e);
    }
  }
}

export enum ROLE{
   manufacturer='manufacturer',
   distributer='distributer',
   customer='customer'
}

export const authoriseRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("In the authorizeRole",req.payload.role);
    if (roles.includes(req.payload.role)) {
        return next();
      }
      throw new Error("Access Denied");
    }
    catch (e) {
      next(e);
    }
  }
}