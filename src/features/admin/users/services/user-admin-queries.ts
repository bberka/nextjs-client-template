export const userAdminKeys = {
  all: ["admin", "users"] as const,
  list: (params?: { page?: number; size?: number; search?: string }) =>
    [...userAdminKeys.all, "list", params] as const,
};
