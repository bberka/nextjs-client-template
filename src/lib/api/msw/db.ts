export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

export interface MockRole {
  id: string;
  name: string;
  permissions: string[];
  createdAt: string;
}

export interface MockAuditEntry {
  id: string;
  userId: string;
  action: string;
  target: string;
  timestamp: string;
  details: string;
}

export interface MockOtp {
  email: string;
  code: string;
  expiresAt: number;
}

const now = new Date().toISOString();

export const db = {
  users: [
    {
      id: "1",
      email: "admin@example.com",
      password: "admin123",
      name: "Admin User",
      role: "admin" as const,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "2",
      email: "user@example.com",
      password: "user123",
      name: "Regular User",
      role: "user" as const,
      createdAt: now,
      updatedAt: now,
    },
  ] as MockUser[],

  roles: [
    { id: "1", name: "Admin", permissions: ["users.read", "users.write", "users.delete", "roles.read", "roles.write", "audit.read"], createdAt: now },
    { id: "2", name: "User", permissions: ["profile.read", "profile.write"], createdAt: now },
  ] as MockRole[],

  permissions: [
    "users.read",
    "users.write",
    "users.delete",
    "roles.read",
    "roles.write",
    "audit.read",
    "profile.read",
    "profile.write",
  ],

  auditLog: [
    { id: "1", userId: "1", action: "login", target: "auth", timestamp: now, details: "Admin logged in" },
    { id: "2", userId: "2", action: "login", target: "auth", timestamp: now, details: "User logged in" },
  ] as MockAuditEntry[],

  otps: [] as MockOtp[],

  tokens: new Map<string, string>(),

  nextId(collection: { id: string }[]): string {
    const max = collection.reduce((m, item) => Math.max(m, parseInt(item.id)), 0);
    return String(max + 1);
  },

  addAuditEntry(userId: string, action: string, target: string, details: string) {
    this.auditLog.push({
      id: this.nextId(this.auditLog),
      userId,
      action,
      target,
      timestamp: new Date().toISOString(),
      details,
    });
  },
};
