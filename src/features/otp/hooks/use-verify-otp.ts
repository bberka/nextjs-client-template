"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../services/otp-service";
import { showResult } from "@/services/notification-service";
import type { OtpVerifyRequest } from "../types";

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (data: OtpVerifyRequest) => verifyOtp(data),
    onSuccess(result) {
      showResult(result);
    },
  });
}
