export const auditLogKeys = {
  all: ["admin", "audit-log"] as const,
  list: (params?: { page?: number; size?: number }) =>
    [...auditLogKeys.all, "list", params] as const,
};
