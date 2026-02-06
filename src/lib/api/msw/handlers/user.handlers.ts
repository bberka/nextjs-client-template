import { http, HttpResponse } from "msw";
import { db } from "../db";
import { SeverityLevel } from "@/types/api";

function getUserFromToken(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token || !db.tokens.has(token)) return null;
  const userId = db.tokens.get(token)!;
  return db.users.find((u) => u.id === userId) ?? null;
}

export const userHandlers = [
  http.get("/api/profile", ({ request }) => {
    const user = getUserFromToken(request);
    if (!user) {
      return HttpResponse.json(
        { value: null, message: "Unauthorized", severity: SeverityLevel.Error },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      value: { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt },
      message: "OK",
      severity: SeverityLevel.Success,
    });
  }),

  http.put("/api/profile", async ({ request }) => {
    const user = getUserFromToken(request);
    if (!user) {
      return HttpResponse.json(
        { value: null, message: "Unauthorized", severity: SeverityLevel.Error },
        { status: 401 },
      );
    }

    const body = (await request.json()) as { name?: string; email?: string };
    if (body.name) user.name = body.name;
    if (body.email) user.email = body.email;
    user.updatedAt = new Date().toISOString();
    db.addAuditEntry(user.id, "update_profile", "profile", `${user.name} updated profile`);

    return HttpResponse.json({
      value: { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt },
      message: "Profile updated",
      severity: SeverityLevel.Success,
    });
  }),
];
