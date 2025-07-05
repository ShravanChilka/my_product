import { z } from "zod";

export default class PackageSizeValidation {
  static createBody = z.object({
    size: z.number().positive(),
    unitOfMeasureId: z.number().positive(),
    baseUnitOfMeasureId: z.number().positive(),
    conversionFactor: z.number().positive().default(1),
  });

  static updateParam = z.object({
    id: z.coerce.number().int().positive(),
  });

  static updateBody = z.object({
    size: z.number().positive().optional(),
    unitOfMeasureId: z.number().positive().optional(),
    baseUnitOfMeasureId: z.number().positive().optional(),
    conversionFactor: z.number().positive().optional(),
  });

  static getQuery = z.object({
    page: z.coerce.number().int().positive().optional(),
    perPage: z.coerce.number().int().positive().optional(),
    unitOfMeasure: z.union([z.literal("true"), z.literal("false")]).optional(),
    unitOfMeasureId: z.coerce.number().positive().optional(),
    baseUnitOfMeasure: z
      .union([z.literal("true"), z.literal("false")])
      .optional(),
    baseUnitOfMeasureId: z.coerce.number().positive().optional(),
    size: z.coerce.number().positive().optional(),
  });

  static getByIdParam = z.object({
    id: z.coerce.number().int().positive(),
  });
}

export type PackageSizeCreateBody = z.infer<
  typeof PackageSizeValidation.createBody
>;
export type PackageSizeUpdateBody = z.infer<
  typeof PackageSizeValidation.updateBody
>;
export type PackageSizeUpdateParam = z.infer<
  typeof PackageSizeValidation.updateParam
>;
export type PackageSizeGetQuery = z.infer<
  typeof PackageSizeValidation.getQuery
>;
export type PackageSizeGetByIdParam = z.infer<
  typeof PackageSizeValidation.getByIdParam
>;
