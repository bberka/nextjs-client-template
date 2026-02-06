import type { User } from "./types";
import { UserRole } from "./types";

export enum Permission {
  UsersRead = "users.read",
  UsersWrite = "users.write",
  UsersDelete = "users.delete",
  RolesRead = "roles.read",
  RolesWrite = "roles.write",
  AuditRead = "audit.read",
  ProfileRead = "profile.read",
  ProfileWrite = "profile.write",
}

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.Admin]: Object.values(Permission),
  [UserRole.User]: [Permission.ProfileRead, Permission.ProfileWrite],
};

export function hasPermission(user: User, permission: Permission): boolean {
  return ROLE_PERMISSIONS[user.role]?.includes(permission) ?? false;
}
