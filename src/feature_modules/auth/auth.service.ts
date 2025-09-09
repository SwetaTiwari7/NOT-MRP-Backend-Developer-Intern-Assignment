// src/feature_modules/auth/auth.service.ts
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userService from "../user/user.service";
import { AUTH_RESPONSES } from "./auth.response";
import { Credential, Register } from "./auth.type";
import { v4 as uuidv4 } from "uuid";
import { generatePassword } from "../../../uploads/generate.password";
import { Zuser } from "../user/user.types";

const login = async (credential: Credential) => {
  try {
    const user = await userService.getOneUser(credential.email);
    if (!user) {
      throw AUTH_RESPONSES.INVALID_CREDENTIALS;
    }

    const isMatch = await bcrypt.compare(credential.password, user.password);
    if (!isMatch) {
      throw AUTH_RESPONSES.INVALID_CREDENTIALS;
    }

    const token = sign(
      { id: user._id, businessId: user.businessId },
      process.env.SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    return { token, businessId: user.businessId };
  } catch (e) {
    throw e;
  }
};

const register = async (user: Register) => {
  try {
    const existingUser = await userService.getOneUser(user.email);
    if (existingUser) {
      throw AUTH_RESPONSES.USER_ALREADY_EXISTS;
    }

    const rawPassword = generatePassword();

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser: Zuser = {
      ...user,
      password: hashedPassword,
      businessId: uuidv4(),
      role: "customer", 
    };

    const created = await userService.createUser(newUser);

    console.log("Generated password:", rawPassword);

    return created;
  } catch (e) {
    throw e;
  }
};


const logout = async () => {
  // stateless JWT: just let client delete token
  return { message: "Logged out successfully" };
};

export default { login, register, logout };
