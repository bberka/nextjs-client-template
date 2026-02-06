import { apiClient } from "@/lib/api/client";
import type { LoginRequest, LoginResponse, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest, User } from "../types";

export function login(data: LoginRequest) {
  return apiClient.post<LoginResponse>("/auth/login", data);
}

export function register(data: RegisterRequest) {
  return apiClient.post<LoginResponse>("/auth/register", data);
}

export function forgotPassword(data: ForgotPasswordRequest) {
  return apiClient.post<null>("/auth/forgot-password", data);
}

export function resetPassword(data: ResetPasswordRequest) {
  return apiClient.post<null>("/auth/reset-password", data);
}

export function getCurrentUser() {
  return apiClient.get<User>("/auth/me");
}

export function logout() {
  return apiClient.post<null>("/auth/logout");
}
