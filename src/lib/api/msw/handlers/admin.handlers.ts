import { http, HttpResponse } from "msw";
import { db } from "../db";
import { SeverityLevel } from "@/types/api";

function requireAdmin(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token || !db.tokens.has(token)) return null;
  const userId = db.tokens.get(token)!;
  const user = db.users.find((u) => u.id === userId);
  if (!user || user.role !== "admin") return null;
  return user;
}

function paginate<T>(items: T[], page = 1, size = 10) {
  const start = (page - 1) * size;
  return {
    items: items.slice(start, start + size),
    totalCount: items.length,
    page,
    size,
    totalPages: Math.ceil(items.length / size),
  };
}

export const adminHandlers = [
  // Users CRUD
  http.get("/api/admin/users", ({ request }) => {
    const admin = requireAdmin(request);
    if (!admin) {
      return HttpResponse.json({ value: null, message: "Forbidden", severity: SeverityLevel.Error }, { status: 403 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const size = parseInt(url.searchParams.get("size") ?? "10");
    const search = url.searchParams.get("search") ?? "";

    let users = db.users.map(({ password: _, ...u }) => u);
    if (search) {
      const q = search.toLowerCase();
      users = users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }

    return HttpResponse.json({
      value: paginate(users, page, size),
      message: "OK",
      severity: SeverityLevel.Success,
    });
  }),

  http.post("/api/admin/users", async ({ request }) => {
    const admin = requireAdmin(request);
    if (!admin) {
      return HttpResponse.json({ value: null, message: "Forbidden", severity: SeverityLevel.Error }, { status: 403 });
    }

    const body = (await request.json()) as { email: string; password: string; name: string; role: "admin" | "user" };
    if (db.users.find((u) => u.email === body.email)) {
      return HttpResponse.json({ value: null, message: "Email already in use", severity: SeverityLevel.Error }, { status: 409 });
    }

    const newUser = {
      id: db.nextId(db.users),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    db.addAuditEntry(admin.id, "create_user", "admin", `Created user ${newUser.name}`);

    const { password: _, ...userWithoutPassword } = newUser;
    return HttpResponse.json({ value: userWithoutPassword, message: "User created", severity: SeverityLevel.Success }, { status: 201 });
  }),

  http.put("/api/admin/users/:id", async ({ request, params }) => {
    const admin = requireAdmin(request);
    if (!admin) {
      return HttpResponse.json({ value: null, message: "Forbidden", severity: SeverityLevel.Error }, { status: 403 });
    }

    const user = db.users.find((u) => u.id === params.id);
    if (!user) {
      return HttpResponse.json({ value: null, message: "User not found", severity: SeverityLevel.Error }, { status: 404 });
    }

    const body = (await request.json()) as { name?: string; email?: string; role?: "admin" | "user" };
    if (body.name) user.name = body.name;
    if (body.email) user.email = body.email;
    if (body.role) user.role = body.role;
    user.updatedAt = new Date().toISOString();
    db.addAuditEntry(admin.id, "update_user", "admin", `Updated user ${user.name}`);

    const { password: _, ...userWithoutPassword } = user;
    return HttpResponse.json({ value: userWithoutPassword, message: "User updated", severity: SeverityLevel.Success });
  }),

  http.delete("/api/admin/users/:id", ({ request, params }) => {
    const admin = requireAdmin(request);
    if (!admin) {
      return HttpResponse.json({ value: null, message: "Forbidden", severity: SeverityLevel.Error }, { status: 403 });
    }

    const index = db.users.findIndex((u) => u.id === params.id);
    if (index === -1) {
      return HttpResponse.json({ value: null, message: "User not found", severity: SeverityLevel.Error }, { status: 404 });
    }

    const removed = db.users.splice(index, 1)[0];
    db.addAuditEntry(admin.id, "delete_user", "admin", `Deleted user ${removed.name}`);

    return HttpResponse.json({ value: null, message: "User deleted", severity: SeverityLevel.Success });
  }),

  // Roles
  http.get("/api/admin/roles", ({ request }) => {
    const admin = requireAdmin(request);
    if (!admin) {
      return HttpResponse.json({ value: null, message: "Forbidden", severity: SeverityLevel.Error }, { status: 403 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const size = parseInt(url.searchParams.get("size") ?? "10");

    return HttpResponse.json({ value: paginate(db.roles, page, size), message: "OK", severity: SeverityLevel.Success });
  }),

  http.post("/api/admin/roles", async ({ request }) => {
    const admin = requireAdmin(request);
    if (!admin) {
      return HttpResponse.json({ value: null, message: "Forbidden", severity: SeverityLevel.Error }, { status: 403 });
    }

    const body = (await request.json()) as { name: string; permissions: string[] };
    const newRole = { id: db.nextId(db.roles), ...body, createdAt: new Date().toISOString() };
    db.roles.push(newRole);
    db.addAuditEntry(admin.id, "create_role", "admin", `Created role ${newRole.name}`);

    return HttpResponse.json({ value: newRole, message: "Role created", severity: SeverityLevel.Success }, { status: 201 });
  }),

  http.put("/api/admin/roles/:id", async ({ request, params }) => {
    const admin = requireAdmin(request);
    if (!admin) {
      return HttpResponse.json({ value: null, message: "Forbidden", severity: SeverityLevel.Error }, { status: 403 });
    }

    const role = db.roles.find((r) => r.id === params.id);
    if (!role) {
      return HttpResponse.json({ value: null, message: "Role not found", severity: SeverityLevel.Error }, { status: 404 });
    }

    const body = (await request.json()) as { name?: string; permissions?: string[] };
    if (body.name) role.name = body.name;
    if (body.permissions) role.permissions = body.permissions;
    db.addAuditEntry(admin.id, "update_role", "admin", `Updated role ${role.name}`);

    return HttpResponse.json({ value: role, message: "Role updated", severity: SeverityLevel.Success });
  }),

  // Permissions
  http.get("/api/admin/permissions", ({ request }) => {
    const admin = requireAdmin(request);
    if (!admin) {
      return HttpResponse.json({ value: null, message: "Forbidden", severity: SeverityLevel.Error }, { status: 403 });
    }

    return HttpResponse.json({ value: db.permissions, message: "OK", severity: SeverityLevel.Success });
  }),

  // Audit Log
  http.get("/api/admin/audit-log", ({ request }) => {
    const admin = requireAdmin(request);
    if (!admin) {
      return HttpResponse.json({ value: null, message: "Forbidden", severity: SeverityLevel.Error }, { status: 403 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const size = parseInt(url.searchParams.get("size") ?? "10");

    const sorted = [...db.auditLog].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return HttpResponse.json({ value: paginate(sorted, page, size), message: "OK", severity: SeverityLevel.Success });
  }),
];
