import { z } from "zod";

export default class UnitOfMeasureValidation {
  static createBody = z.object({
    name: z.string().trim().min(3).max(100),
    abbreviation: z.string().trim().min(3).max(50),
  });

  static updateParam = z.object({
    id: z.coerce.number().int().positive(),
  });

  static updateBody = z.object({
    name: z.string().trim().min(3).max(100).optional(),
    abbreviation: z.string().trim().min(3).max(50).optional(),
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

export type UnitOfMeasureCreateBody = z.infer<
  typeof UnitOfMeasureValidation.createBody
>;
export type UnitOfMeasureUpdateBody = z.infer<
  typeof UnitOfMeasureValidation.updateBody
>;
export type UnitOfMeasureUpdateParam = z.infer<
  typeof UnitOfMeasureValidation.updateParam
>;
export type UnitOfMeasureGetQuery = z.infer<
  typeof UnitOfMeasureValidation.getQuery
>;
export type UnitOfMeasureGetByIdParam = z.infer<
  typeof UnitOfMeasureValidation.getByIdParam
>;
