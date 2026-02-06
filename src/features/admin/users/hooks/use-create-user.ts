"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/user-admin-service";
import { userAdminKeys } from "../services/user-admin-queries";
import { showResult } from "@/services/notification-service";
import type { CreateUserRequest } from "../types";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => createUser(data),
    onSuccess(result) {
      showResult(result);
      queryClient.invalidateQueries({ queryKey: userAdminKeys.all });
    },
  });
}
