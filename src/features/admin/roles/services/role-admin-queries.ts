export const roleAdminKeys = {
  all: ["admin", "roles"] as const,
  list: (params?: { page?: number; size?: number }) =>
    [...roleAdminKeys.all, "list", params] as const,
};
