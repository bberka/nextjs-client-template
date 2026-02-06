"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole } from "../services/role-admin-service";
import { roleAdminKeys } from "../services/role-admin-queries";
import { showResult } from "@/services/notification-service";
import type { CreateRoleRequest } from "../types";

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleRequest) => createRole(data),
    onSuccess(result) {
      showResult(result);
      queryClient.invalidateQueries({ queryKey: roleAdminKeys.all });
    },
  });
}
