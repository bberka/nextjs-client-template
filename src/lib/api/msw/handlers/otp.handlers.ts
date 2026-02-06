import { http, HttpResponse } from "msw";
import { db } from "../db";
import { SeverityLevel } from "@/types/api";

export const otpHandlers = [
  http.post("/api/otp/request", async ({ request }) => {
    const body = (await request.json()) as { email: string };
    const code = String(Math.floor(100000 + Math.random() * 900000));
    db.otps.push({ email: body.email, code, expiresAt: Date.now() + 5 * 60 * 1000 });

    console.log(`[MSW] OTP for ${body.email}: ${code}`);

    return HttpResponse.json({
      value: null,
      message: "OTP sent",
      severity: SeverityLevel.Success,
    });
  }),

  http.post("/api/otp/verify", async ({ request }) => {
    const body = (await request.json()) as { email: string; code: string };
    const otpIndex = db.otps.findIndex(
      (o) => o.email === body.email && o.code === body.code && o.expiresAt > Date.now(),
    );

    if (otpIndex === -1) {
      return HttpResponse.json(
        { value: null, message: "Invalid or expired OTP", severity: SeverityLevel.Error },
        { status: 400 },
      );
    }

    db.otps.splice(otpIndex, 1);

    return HttpResponse.json({
      value: { verified: true },
      message: "OTP verified",
      severity: SeverityLevel.Success,
    });
  }),
];
