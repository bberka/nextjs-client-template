import { authHandlers } from "./auth.handlers";
import { userHandlers } from "./user.handlers";
import { adminHandlers } from "./admin.handlers";
import { otpHandlers } from "./otp.handlers";

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...adminHandlers,
  ...otpHandlers,
];
