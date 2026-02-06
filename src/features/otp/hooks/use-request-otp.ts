"use client";

import { useMutation } from "@tanstack/react-query";
import { requestOtp } from "../services/otp-service";
import { showResult } from "@/services/notification-service";
import type { OtpRequest } from "../types";

export function useRequestOtp() {
  return useMutation({
    mutationFn: (data: OtpRequest) => requestOtp(data),
    onSuccess(result) {
      showResult(result);
    },
  });
}
