import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  permissions: z.array(z.string()).min(1, "Select at least one permission"),
});

export const updateRoleSchema = createRoleSchema;
