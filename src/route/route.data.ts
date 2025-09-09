import { match } from 'path-to-regexp';
import { excludedRoutes, Route } from './route.type';
import userRoute from '../feature_modules/user/user.route';
import authRoute from '../feature_modules/auth/auth.route';
import customerRoute from '../feature_modules/customer/customer.route';
import distributerRoute from '../feature_modules/distributer/distributer.route';
import productRoute from '../feature_modules/product/product.route';
import customerOrderRoute from '../feature_modules/order/customer_order/customer.order.route';
import inventoryRoute from '../feature_modules/inventory/inventory.route';
import goodiesRoute from '../feature_modules/goodies/goodies.route';
import distributerOrderRoute from '../feature_modules/order/distibuter_order/distributer.order.route';
import redeemsRoute from '../feature_modules/redeems/redeems.route';

export const routes: Route[] = [
  userRoute,
  authRoute,
  distributerRoute,
  inventoryRoute,
  customerRoute,
  productRoute,
  customerOrderRoute,
  goodiesRoute,
  distributerOrderRoute,
  redeemsRoute,
];

export const routesToExclude: excludedRoutes[] = [
  {
    path: match('/auth/login'),
    method: 'POST',
  },
];
