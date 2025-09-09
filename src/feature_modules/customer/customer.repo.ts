import { Op, where, WhereOptions } from 'sequelize';
import CustomerSchema from './customer.schema';
import { Customer } from './customer.type';
import UserSchema from '../user/user.schema';

const getCustomer = async (limit: number, offset: number) =>
  await CustomerSchema.findAndCountAll({
    include: [
      {
        model: UserSchema,
        as: 'customer',
        attributes: ['id', 'name', 'email', 'contact_no'],
      },
      {
        model: UserSchema,
        as: 'distributer',
        attributes: ['name'],
      },
    ],
    limit: limit,
    offset: offset,
  });

const getCustomerById = (limit: number, offset: number, id: string) =>
  CustomerSchema.findAndCountAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'id', 'distributerId'],
    },
    include: [
      {
        model: UserSchema,
        as: 'customer',
        attributes: ['name', 'email', 'contact_no'],
      },
    ],
    limit: limit,
    offset: offset,
    where: {
      distributerId: id,
    },
  });

const createCustomer = (user: Customer) => CustomerSchema.create(user);

const getByAttribute = async (attribute: string) =>
  await CustomerSchema.findAll({
    where: {
      [Op.or]: [{ distributerId: `${attribute}` }, { userId: attribute }],
    },
  });

const filterCustomer = async (user: WhereOptions<Customer>) => await CustomerSchema.findAll({ where: user });

const updateCustomer = async (userDetail: Partial<Customer>, id: string) =>
  await CustomerSchema.update(userDetail, { where: { userId: id } });

export default {
  getCustomer,
  getCustomerById,
  createCustomer,
  getByAttribute,
  filterCustomer,
  updateCustomer,
};
