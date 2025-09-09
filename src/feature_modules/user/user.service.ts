import { v4 as uuidv4 } from "uuid";
import { Credential } from "../auth/auth.type";
import userRepo from "./user.repo";
import { USER_RESPONSES } from "../../utility/user.response";
import { UpdateQuery, FilterQuery } from "mongoose";
import { Zuser } from "./user.types";
import { hashPassword } from "../../utility/hash.password";
import { IUser } from "./user.schema";


const getUser = async (limit: number, offset: number) => {
  try {
    const result = await userRepo.getUser(limit, offset);
    if (!result) {
      throw USER_RESPONSES.SOMETHING_WENT_WRONG;
    }
    return result;
  } catch (e) {
    throw e;
  }
};

const getOneUser = async (email:string) => {
  try {
    const result = await userRepo.getOneUser( email );
    if (!result) {
      throw USER_RESPONSES.USER_NOT_FOUND;
    }
    return result;
  } catch (e) {
    throw e;
  }
};

const getUserById = async (id: string) => {
  try {
    const result = await userRepo.getUserById(id);
    if (!result) {
      throw USER_RESPONSES.USER_NOT_FOUND;
    }
    return result;
  } catch (e) {
    throw e;
  }
};

const createUser = async (user: Zuser) => {
  try {
    const { password, ...u } = user;
    const hashedPassword = await hashPassword(password);
    const newUser = {
      ...u,
      password: hashedPassword,
      businessId: uuidv4(),
    };
    const userCreated = await userRepo.createUser(newUser);
    if (!userCreated) {
      throw USER_RESPONSES.USER_CREATION_FAILS;
    }
    return USER_RESPONSES.USER_CREATED;
  } catch (e) {
    throw e;
  }
};

const filterUser = async (filter: Partial<IUser>) => {
  try {
    const query: FilterQuery<IUser> = {};

    if (filter.name) {
      query.name = { $regex: filter.name, $options: "i" };
    }
    if (filter.email) {
      query.email = { $regex: filter.email, $options: "i" };
    }
    if (filter.isDeleted !== undefined) {
      query.isDeleted = filter.isDeleted;
    }
    if (filter.role) {
      query.role = { $regex: filter.role, $options: "i" };
    }

    const result = await userRepo.filterUser(query);
    if (!result) {
      throw USER_RESPONSES.USER_NOT_FOUND;
    }
    return result;
  } catch (e) {
    throw e;
  }
};

const deleteUser = async (id: string) => {
  try {
    const result = await userRepo.deleteUser(id);
    if (!result) {
      throw USER_RESPONSES.USER_NOT_FOUND;
    }
    return USER_RESPONSES.USER_DELETED;
  } catch (e) {
    throw e;
  }
};

const updateUser = async (details: UpdateQuery<IUser>, id: string) => {
  try {
    const result = await userRepo.updateUser(id, details);
    if (!result) {
      return USER_RESPONSES.USER_NOT_FOUND;
    }
    return USER_RESPONSES.USER_UPDATED;
  } catch (e) {
    throw e;
  }
};

export default {
  getUser,
  getOneUser,
  createUser,
  filterUser,
  getUserById,
  deleteUser,
  updateUser,
};
