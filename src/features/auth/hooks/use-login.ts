"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth-service";
import { useAuthStore } from "./use-auth";
import { showResult } from "@/services/notification-service";
import type { LoginRequest } from "../types";
import { SeverityLevel } from "@/types/api";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess(result) {
      if (result.severity === SeverityLevel.Success && result.value) {
        setAuth(result.value.user, result.value.token);
      }
      showResult(result);
    },
  });
}
