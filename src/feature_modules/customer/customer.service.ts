import customerRepo from "./customer.repo";
import userRepo from "../user/user.repo";
import { IUser } from "../user/user.schema";
import { USER_RESPONSES } from "../../utility/user.response";


// Get paginated customers
const getCustomers = async (limit: number, offset: number) => {
  return await customerRepo.getCustomers(limit, offset);
};

// Get single customer by ID
const getCustomerById = async (id: string) => {
  const result = await customerRepo.getCustomerById(id);
  if (!result) return USER_RESPONSES.USER_NOT_FOUND;
  return result;
};

// Create a customer (reuses userRepo)
const createCustomer = async (user: IUser) => {
  const newUser = { ...user, role: "customer" };
  return await userRepo.createUser(newUser);
};

// Update a customer (reuses userRepo)
const updateCustomer = async (id: string, details: Partial<IUser>) => {
  const result = await userRepo.updateUser(id, details);
  if (!result) return USER_RESPONSES.USER_NOT_FOUND;
  return USER_RESPONSES.USER_UPDATED;
};

// Filter customers by attributes
const filterCustomers = async (filters: Partial<IUser>) => {
  return await customerRepo.filterCustomers(filters);
};

export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  filterCustomers,
};
