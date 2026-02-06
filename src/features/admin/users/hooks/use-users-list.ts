"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/user-admin-service";
import { userAdminKeys } from "../services/user-admin-queries";

export function useUsersList(params?: { page?: number; size?: number; search?: string }) {
  return useQuery({
    queryKey: userAdminKeys.list(params),
    queryFn: () => getUsers(params),
  });
}
