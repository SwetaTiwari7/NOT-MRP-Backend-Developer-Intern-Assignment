import { match } from 'path-to-regexp';
import { excludedRoutes, Route } from './route.type';
import userRoute from '../feature_modules/user/user.route';
import authRoute from '../feature_modules/auth/auth.route';
import customerRoute from '../feature_modules/customer/customer.route';
import productRoute from '../feature_modules/product/product.route';
import transactionRoute from '../feature_modules/transaction/transaction.route';

export const routes: Route[] = [
  userRoute,
  authRoute,
   customerRoute,
   productRoute,
   transactionRoute

];

export const routesToExclude: excludedRoutes[] = [
  {
    path: match('/auth/login'),
    method: 'POST',
  },
];
