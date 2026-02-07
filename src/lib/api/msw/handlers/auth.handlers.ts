import { http, HttpResponse } from "msw";
import { db } from "../db";
import { SeverityLevel } from "@/types/api";

function createMockJwt(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400,
    }),
  );
  const signature = btoa(`mock-signature-${Date.now()}`);
  return `${header}.${body}.${signature}`;
}

function decodeMockJwt(
  token: string,
): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
}

export const authHandlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    const user = db.users.find(
      (u) => u.email === body.email && u.password === body.password,
    );

    if (!user) {
      return HttpResponse.json(
        {
          value: null,
          message: "Invalid email or password",
          severity: SeverityLevel.Error,
        },
        { status: 401 },
      );
    }

    const token = createMockJwt({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    db.tokens.set(token, user.id);
    db.addAuditEntry(user.id, "login", "auth", `${user.name} logged in`);

    return HttpResponse.json({
      value: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
      message: "Login successful",
      severity: SeverityLevel.Success,
    });
  }),

  http.post("/api/auth/register", async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
      name: string;
    };

    if (db.users.find((u) => u.email === body.email)) {
      return HttpResponse.json(
        {
          value: null,
          message: "Email already in use",
          severity: SeverityLevel.Error,
        },
        { status: 409 },
      );
    }

    const newUser = {
      id: db.nextId(db.users),
      email: body.email,
      password: body.password,
      name: body.name,
      role: "user" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.users.push(newUser);

    const token = createMockJwt({
      sub: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });
    db.tokens.set(token, newUser.id);
    db.addAuditEntry(
      newUser.id,
      "register",
      "auth",
      `${newUser.name} registered`,
    );

    return HttpResponse.json({
      value: {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
        token,
      },
      message: "Registration successful",
      severity: SeverityLevel.Success,
    });
  }),

  http.post("/api/auth/forgot-password", async ({ request }) => {
    const body = (await request.json()) as { email: string };
    const user = db.users.find((u) => u.email === body.email);

    if (user) {
      const code = String(Math.floor(100000 + Math.random() * 900000));
      db.otps.push({
        email: body.email,
        code,
        expiresAt: Date.now() + 5 * 60 * 1000,
      });
      console.log(`[MSW] OTP for ${body.email}: ${code}`);
    }

    return HttpResponse.json({
      value: null,
      message: "If the email exists, a reset code has been sent",
      severity: SeverityLevel.Success,
    });
  }),

  http.post("/api/auth/reset-password", async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      code: string;
      newPassword: string;
    };
    const otpIndex = db.otps.findIndex(
      (o) =>
        o.email === body.email &&
        o.code === body.code &&
        o.expiresAt > Date.now(),
    );

    if (otpIndex === -1) {
      return HttpResponse.json(
        {
          value: null,
          message: "Invalid or expired code",
          severity: SeverityLevel.Error,
        },
        { status: 400 },
      );
    }

    const user = db.users.find((u) => u.email === body.email);
    if (user) {
      user.password = body.newPassword;
      user.updatedAt = new Date().toISOString();
    }
    db.otps.splice(otpIndex, 1);

    return HttpResponse.json({
      value: null,
      message: "Password reset successful",
      severity: SeverityLevel.Success,
    });
  }),

  http.get("/api/auth/me", ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return HttpResponse.json(
        {
          value: null,
          message: "Unauthorized",
          severity: SeverityLevel.Error,
        },
        { status: 401 },
      );
    }

    // First check the token map (for current-session tokens)
    if (db.tokens.has(token)) {
      const userId = db.tokens.get(token)!;
      const user = db.users.find((u) => u.id === userId);
      if (user) {
        return HttpResponse.json({
          value: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          message: "OK",
          severity: SeverityLevel.Success,
        });
      }
    }

    // Fallback: decode the JWT payload (for tokens surviving page reload)
    const payload = decodeMockJwt(token);
    if (payload && payload.sub) {
      const exp = payload.exp as number | undefined;
      if (exp && exp < Math.floor(Date.now() / 1000)) {
        return HttpResponse.json(
          {
            value: null,
            message: "Token expired",
            severity: SeverityLevel.Error,
          },
          { status: 401 },
        );
      }
      const user = db.users.find((u) => u.id === payload.sub);
      if (user) {
        // Re-register the token so subsequent calls use the fast path
        db.tokens.set(token, user.id);
        return HttpResponse.json({
          value: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          message: "OK",
          severity: SeverityLevel.Success,
        });
      }
    }

    return HttpResponse.json(
      {
        value: null,
        message: "Unauthorized",
        severity: SeverityLevel.Error,
      },
      { status: 401 },
    );
  }),

  http.post("/api/auth/logout", ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (token) db.tokens.delete(token);

    return HttpResponse.json({
      value: null,
      message: "Logged out",
      severity: SeverityLevel.Success,
    });
  }),
];
