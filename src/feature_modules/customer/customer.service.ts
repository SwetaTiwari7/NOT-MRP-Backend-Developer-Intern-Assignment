import { Customer, Filter } from './customer.type';
import customerRepo from './customer.repo';
import { CUSTOMER_RESPONSES } from './customer.responses';
import { WhereOptions } from 'sequelize';
import { USER_RESPONSES } from '../../utility/user.response';
import { Zuser } from '../user/user.types';
import { hashPassword } from '../../utility/hash.password';
import userRepo from '../user/user.repo';

let whereObject: WhereOptions<Customer> = {};

const getCustomer = async (id: string, pageno: number, size: number) => {
  try {
    let limit = size ? size : 1;
    let offset = pageno ? pageno * limit : 0;
    const result = await customerRepo.getCustomerById(limit, offset, id);
    if (!result) {
      throw CUSTOMER_RESPONSES.SOMETHING_WENT_WRONG;
    }
    return result;
  } catch (e) {
    throw e;
  }
};

const getByAttribute = async (attribute: string) => {
  try {
    const result = await customerRepo.getByAttribute(attribute);
    if (!result) {
      return CUSTOMER_RESPONSES.USER_NOT_FOUND;
    }
    return result;
  } catch (e) {
    throw e;
  }
};

const getCustomerForManufracturer = async (pageno: number, size: number) => {
  try {
    let limit = size ? size : 1;
    let offset = pageno ? pageno * limit : 0;
    const result = await customerRepo.getCustomer(limit, offset);
    if (!result) {
      return { status: 404, message: 'User Not Found' };
    }
    return result;
  } catch (e) {
    throw e;
  }
};

const createCustomer = async (user: Customer) => {
  try {
    const userCreated = await customerRepo.createCustomer(user);
    if (!userCreated) {
      throw USER_RESPONSES.USER_CREATION_FAILS;
    }
    return USER_RESPONSES.USER_CREATED;
  } catch (e) {
    throw e;
  }
};

const filterCustomer = async (user: Partial<Customer>) => {
  try {
    const result = await customerRepo.filterCustomer(user);
    if (!result) {
      throw CUSTOMER_RESPONSES.USER_NOT_FOUND;
    }
    return result;
  } catch (e) {
    throw e;
  }
};

const updateCustomerPassword = async (details: Partial<Zuser>, id: string) => {
  try {
    if (details.password) {
      const newPassword = await hashPassword(details.password);
      details.password = newPassword;
    }
    const result = userRepo.upadteUser(details, id);
    if (!result) {
      return USER_RESPONSES.USER_NOT_FOUND;
    }
    return USER_RESPONSES.USER_UPDATED;
  } catch (e) {
    throw e;
  }
};

export default {
  getCustomer,
  getByAttribute,
  createCustomer,
  filterCustomer,
  getCustomerForManufracturer,
};
