import { apiClient } from "@/lib/api/client";
import type { PagedListResponse } from "@/types/pagination";
import type { AuditEntry } from "../types";

export function getAuditLog(params?: { page?: number; size?: number }) {
  return apiClient.get<PagedListResponse<AuditEntry>>("/admin/audit-log", { params });
}
