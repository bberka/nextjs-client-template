import { apiClient } from "@/lib/api/client";
import type { PagedListResponse } from "@/types/pagination";
import type { Role, CreateRoleRequest, UpdateRoleRequest } from "../types";

export function getRoles(params?: { page?: number; size?: number }) {
  return apiClient.get<PagedListResponse<Role>>("/admin/roles", { params });
}

export function createRole(data: CreateRoleRequest) {
  return apiClient.post<Role>("/admin/roles", data);
}

export function updateRole(id: string, data: UpdateRoleRequest) {
  return apiClient.put<Role>(`/admin/roles/${id}`, data);
}
