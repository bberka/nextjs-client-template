export interface Role {
  id: string;
  name: string;
  permissions: string[];
  createdAt: string;
}

export interface CreateRoleRequest {
  name: string;
  permissions: string[];
}

export interface UpdateRoleRequest {
  name?: string;
  permissions?: string[];
}
