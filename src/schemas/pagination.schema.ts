import { z } from "zod";

export const pagedListRequestSchema = z.object({
  page: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
  search: z.string().nullable().optional(),
  sort: z.enum(["asc", "desc"]).nullable().optional(),
  sortBy: z.string().nullable().optional(),
});
