"use client";

import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "../services/permissions-service";

export function usePermissionsList() {
  return useQuery({
    queryKey: ["admin", "permissions"],
    queryFn: getPermissions,
  });
}
