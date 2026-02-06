import { apiClient } from "@/lib/api/client";
import type { OtpRequest, OtpVerifyRequest, OtpVerifyResponse } from "../types";

export function requestOtp(data: OtpRequest) {
  return apiClient.post<null>("/otp/request", data);
}

export function verifyOtp(data: OtpVerifyRequest) {
  return apiClient.post<OtpVerifyResponse>("/otp/verify", data);
}
