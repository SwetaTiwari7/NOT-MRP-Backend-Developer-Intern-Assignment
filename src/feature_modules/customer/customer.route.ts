import { Router } from 'express';
import customerService from './customer.service';
import { Route } from '../../route/route.type';
import { authoriseRole, ROLE } from '../../../authorize';
import { ResponseHandler } from '../../utility/resposeHandler';
import userService from '../user/user.service';
import { filter } from '../user/user.types';
import { validate } from '../../utility/validate';

const router = Router();

//showing customers of specific distributer
router.get('/', authoriseRole(ROLE.distributer), async (req, res, next) => {
  try {
    const result = await customerService.getCustomer(req.payload.id, Number(req.query.pageno), Number(req.query.size));
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

//Showing customer details
router.get('/details', authoriseRole(ROLE.manufacturer), async (req, res, next) => {
  try {
    const result = await customerService.getCustomerForManufracturer(Number(req.query.pageno), Number(req.query.size));
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

//Filtering The Customer
router.get('/filter', authoriseRole(ROLE.manufacturer, ROLE.distributer), async (req, res, next) => {
  try {
    const queryParameter = req.query;
    const result = await userService.filterUser(queryParameter);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

export default new Route('/customer', router);
