import z from "zod";

export default class MaterialValidation {
  static createBody = z.object({
    name: z.string().trim().min(3).max(100),
    description: z.string().trim().min(3).max(200).optional(),
    unitsOfMeasureId: z.coerce.number().int(),
    categoryId: z.coerce.number().int(),
    brandId: z.coerce.number().int(),
  });

  static updateBody = z.object({
    name: z.string().trim().min(3).max(100).optional(),
    description: z.string().trim().min(3).max(200).optional(),
    unitsOfMeasureId: z.coerce.number().int().optional(),
    categoryId: z.coerce.number().int().optional(),
    brandId: z.coerce.number().int().optional(),
  });

  static updateParam = z.object({
    id: z.coerce.number().int(),
  });

  static getQuery = z.object({
    page: z.coerce.number().positive().optional(),
    perPage: z.coerce.number().positive().optional(),
    q: z.string().trim().optional(),
    brand: z.union([z.literal("true"), z.literal("false")]).optional(),
    category: z.union([z.literal("true"), z.literal("false")]).optional(),
    unitOfMeasure: z.union([z.literal("true"), z.literal("false")]).optional(),
  });

  static getByIdParam = z.object({
    id: z.coerce.number().int().positive(),
  });

  static generateSku = z.object({
    materialName: z.string().trim().min(3).max(100),
    categoryName: z.string().trim().min(3).max(100),
  });
}

export type MaterialCreateBody = z.infer<typeof MaterialValidation.createBody>;
export type MaterialUpdateBody = z.infer<typeof MaterialValidation.updateBody>;
export type MaterialUpdateParam = z.infer<
  typeof MaterialValidation.updateParam
>;
export type MaterialGetQuery = z.infer<typeof MaterialValidation.getQuery>;
export type MaterialGetByIdParam = z.infer<
  typeof MaterialValidation.getByIdParam
>;
export type MaterialGenerateSku = z.infer<
  typeof MaterialValidation.generateSku
>;
