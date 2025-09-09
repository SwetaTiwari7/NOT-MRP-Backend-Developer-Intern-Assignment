export const AUTH_RESPONSES = {
  INVALID_CREDENTIALS: {
    status: 400,
    message: "Invalid Credentials",
  },
  USER_REGISTERED: {
    status: 200,
    message: "Registered Successfully",
  },
  USER_ALREADY_EXISTS: {
    status: 400,
    message: "User already exists",
  },
  USER_CREATED: {
    status: 201,
    message: "User created successfully",
  },
  LOGOUT_SUCCESS: {
    status: 200,
    message: "Logged out successfully",
  },
};
