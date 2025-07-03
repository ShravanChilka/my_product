import z from "zod";

export default class CategoryValidation {
  static createBody = z.object({
    name: z.string().trim().min(3).max(100),
    parentId: z.number().int().positive().optional(),
  });

  static updateBody = z.object({
    name: z.string().trim().min(3).max(100),
    parentId: z.number().int().positive().optional(),
  });

  static updateParam = z.object({
    id: z.number().int().positive(),
  });

  static getQuery = z.object({
    page: z.coerce.number().int().positive().optional(),
    perPage: z.coerce.number().int().positive().optional(),
    q: z.string().trim().optional(),
  });

  static getByIdParam = z.object({
    id: z.coerce.number().int().positive(),
  });
}

export type CategoryCreateBody = z.infer<typeof CategoryValidation.createBody>;
export type CategoryUpdateBody = z.infer<typeof CategoryValidation.updateBody>;
export type CategoryUpdateParam = z.infer<
  typeof CategoryValidation.updateParam
>;
export type CategoryGetQuery = z.infer<typeof CategoryValidation.getQuery>;
export type CategoryGetByIdParam = z.infer<
  typeof CategoryValidation.getByIdParam
>;
