import z from "zod";

export default class MaterialCategoryValidation {
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

export type MaterialCategoryCreateBody = z.infer<
  typeof MaterialCategoryValidation.createBody
>;
export type MaterialCategoryUpdateBody = z.infer<
  typeof MaterialCategoryValidation.updateBody
>;
export type MaterialCategoryUpdateParam = z.infer<
  typeof MaterialCategoryValidation.updateParam
>;
export type MaterialCategoryGetQuery = z.infer<
  typeof MaterialCategoryValidation.getQuery
>;
export type MaterialCategoryGetByIdParam = z.infer<
  typeof MaterialCategoryValidation.getByIdParam
>;
