import z from "zod";

export default class MaterialValidation {
  static createBody = z.object({
    name: z.string().trim().min(3).max(100),
    parentId: z.number().int().positive().optional(),
  });

  static updateBody = z.object({
    name: z.string().trim().min(3).max(100),
    parentId: z.number().int().positive().optional(),
  });

  static updateParam = z.object({
    id: z.string().transform(Number).transform(String),
  });

  static getQuery = z.object({
    page: z.coerce.number().positive().optional(),
    perPage: z.coerce.number().positive().optional(),
    q: z.string().trim().optional(),
  });
}
