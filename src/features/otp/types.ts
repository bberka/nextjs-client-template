export interface OtpRequest {
  email: string;
}

export interface OtpVerifyRequest {
  email: string;
  code: string;
}

export interface OtpVerifyResponse {
  verified: boolean;
}
