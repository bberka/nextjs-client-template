"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuditLog } from "../services/audit-log-service";
import { auditLogKeys } from "../services/audit-log-queries";

export function useAuditLog(params?: { page?: number; size?: number }) {
  return useQuery({
    queryKey: auditLogKeys.list(params),
    queryFn: () => getAuditLog(params),
  });
}
