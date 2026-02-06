import { apiClient } from "@/lib/api/client";
import type { PagedListResponse } from "@/types/pagination";
import type { AdminUser, CreateUserRequest, UpdateUserRequest } from "../types";

export function getUsers(params?: { page?: number; size?: number; search?: string }) {
  return apiClient.get<PagedListResponse<AdminUser>>("/admin/users", { params });
}

export function createUser(data: CreateUserRequest) {
  return apiClient.post<AdminUser>("/admin/users", data);
}

export function updateUser(id: string, data: UpdateUserRequest) {
  return apiClient.put<AdminUser>(`/admin/users/${id}`, data);
}

export function deleteUser(id: string) {
  return apiClient.delete<null>(`/admin/users/${id}`);
}
