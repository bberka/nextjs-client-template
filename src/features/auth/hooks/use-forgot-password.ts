"use client";

import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../services/auth-service";
import { showResult } from "@/services/notification-service";
import type { ForgotPasswordRequest } from "../types";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => forgotPassword(data),
    onSuccess(result) {
      showResult(result);
    },
  });
}
