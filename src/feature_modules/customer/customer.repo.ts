import { FilterQuery } from "mongoose";
import UserSchema, { IUser } from "../user/user.schema";

const getCustomers = async (limit: number, offset: number) => {
  const rows = await UserSchema.find({ role: "customer" })
    .skip(offset)
    .limit(limit)
    .select("-__v -password");

  const count = await UserSchema.countDocuments({ role: "customer" });
  return { rows, count };
};

// Get single customer by ID
const getCustomerById = async (id: string) => {
  return await UserSchema.findOne({ _id: id, role: "customer" }).select("-__v -password");
};

// Filter customers by attributes
const filterCustomers = async (filter: Partial<IUser>) => {
  const query: FilterQuery<IUser> = {
    role: "customer",
    ...(filter as FilterQuery<IUser>),
  };

  return await UserSchema.find(query).select("-__v -password");
};


export default {
  getCustomers,
  getCustomerById,
  filterCustomers,
};
