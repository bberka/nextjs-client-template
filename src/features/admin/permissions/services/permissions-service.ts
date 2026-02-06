import { apiClient } from "@/lib/api/client";

export function getPermissions() {
  return apiClient.get<string[]>("/admin/permissions");
}
