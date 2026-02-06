"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../services/user-admin-service";
import { userAdminKeys } from "../services/user-admin-queries";
import { showResult } from "@/services/notification-service";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess(result) {
      showResult(result);
      queryClient.invalidateQueries({ queryKey: userAdminKeys.all });
    },
  });
}
