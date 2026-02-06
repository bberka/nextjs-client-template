"use client";

import { useMutation } from "@tanstack/react-query";
import { register } from "../services/auth-service";
import { useAuthStore } from "./use-auth";
import { showResult } from "@/services/notification-service";
import type { RegisterRequest } from "../types";
import { SeverityLevel } from "@/types/api";

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess(result) {
      if (result.severity === SeverityLevel.Success && result.value) {
        setAuth(result.value.user, result.value.token);
      }
      showResult(result);
    },
  });
}
