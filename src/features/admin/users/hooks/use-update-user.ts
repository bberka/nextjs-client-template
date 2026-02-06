"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/user-admin-service";
import { userAdminKeys } from "../services/user-admin-queries";
import { showResult } from "@/services/notification-service";
import type { UpdateUserRequest } from "../types";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) => updateUser(id, data),
    onSuccess(result) {
      showResult(result);
      queryClient.invalidateQueries({ queryKey: userAdminKeys.all });
    },
  });
}
