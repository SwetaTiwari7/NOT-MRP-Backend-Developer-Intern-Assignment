import { Router } from 'express';
import userService from './user.service';
import { ResponseHandler } from '../../utility/resposeHandler';
import { Route } from '../../route/route.type';
import { validate } from '../../utility/validate';
import { authoriseRole, ROLE } from '../../../authorize';
import { filter, User } from './user.types';

const router = Router();

// http://localhost:3000/page?limit=1&offset=1

router.get('/page', authoriseRole(ROLE.manufacturer), async (req, res, next) => {
  try {
    const result = await userService.getUser(Number(req.query.limit), Number(req.query.offset));
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

router.delete(
  '/:id',
  validate(filter, 'params'),
  authoriseRole(ROLE.manufacturer, ROLE.distributer),
  async (req, res, next) => {
    try {
      const result = await userService.deleteUser(req.params.id);
      res.send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  },
);

export default new Route('/user', router);
