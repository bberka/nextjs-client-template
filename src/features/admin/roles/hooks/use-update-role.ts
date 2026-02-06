"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRole } from "../services/role-admin-service";
import { roleAdminKeys } from "../services/role-admin-queries";
import { showResult } from "@/services/notification-service";
import type { UpdateRoleRequest } from "../types";

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoleRequest }) => updateRole(id, data),
    onSuccess(result) {
      showResult(result);
      queryClient.invalidateQueries({ queryKey: roleAdminKeys.all });
    },
  });
}
