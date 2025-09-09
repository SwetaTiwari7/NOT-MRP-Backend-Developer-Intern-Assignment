import { FilterQuery } from "mongoose";
import User , { IUser }from "./user.schema"; 


const getUser = async (limit: number, offset: number) => {
  const [data, total] = await Promise.all([
    User.find({}).select("id username email").skip(offset).limit(limit),
    User.countDocuments()
  ]);
  return { rows: data, count: total };
};

const getOneUser = async (email: string) => {
  return await User.findOne({ email });
};

const getUserById = async (id: string) => {
  return await User.findById(id);
};

const filterUser = async (filter: FilterQuery<IUser>) => {
  const data = await User.find(filter).select("-createdAt -updatedAt");
  return { rows: data, count: data.length };
};
const createUser = async (user: Partial<IUser>) => {
  return await User.create(user);
};

const deleteUser = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

const updateUser = async (id: string, details: Partial<IUser>) => {
  return await User.findByIdAndUpdate(id, details, { new: true });
};

export default {
  getUser,
  getOneUser,
  getUserById,
  createUser,
  filterUser,
  deleteUser,
  updateUser,
};

