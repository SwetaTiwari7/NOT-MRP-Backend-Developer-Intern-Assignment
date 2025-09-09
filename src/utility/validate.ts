import { NextFunction, Request, Response } from 'express';
import { Schema } from 'zod';

export type Parts = 'body' | 'query' | 'params';

export const validate = (schema: Schema, part: Parts) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { success, data, error } = schema.safeParse(req[part]);
      //console.log('HERE', error);
      if (!success) {
        throw { status: 401, error: error.issues, message: 'Validation Error Check Input' };
      }
      req[part] = data;
      next();
    } catch (e) {
      next(e);
    }
  };
};

export const File = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp'];

export const validateFile = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const imageType = req.file?.mimetype;
    console.log('ImageType', imageType);
    console.log(req.file?.mimetype, imageType);
    if (imageType && File.includes(imageType)) {
      return next();
    }

    throw { status: 400, message: 'Bad Request' };
  };
};
