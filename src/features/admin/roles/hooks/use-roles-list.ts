"use client";

import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../services/role-admin-service";
import { roleAdminKeys } from "../services/role-admin-queries";

export function useRolesList(params?: { page?: number; size?: number }) {
  return useQuery({
    queryKey: roleAdminKeys.list(params),
    queryFn: () => getRoles(params),
  });
}
