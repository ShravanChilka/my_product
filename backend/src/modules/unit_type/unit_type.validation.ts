import { z } from "zod";

export default class UnitTypeValidation {
  static createBody = z.object({
    name: z.string().trim().min(3).max(100),
    description: z.string().trim().min(3).max(200).optional(),
  });

  static updateParam = z.object({
    id: z.coerce.number().int().positive(),
  });

  static updateBody = z.object({
    name: z.string().trim().min(3).max(100).optional(),
    description: z.string().trim().min(3).max(200).optional(),
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

export type UnitTypeCreateBody = z.infer<typeof UnitTypeValidation.createBody>;
export type UnitTypeUpdateBody = z.infer<typeof UnitTypeValidation.updateBody>;
export type UnitTypeUpdateParam = z.infer<
  typeof UnitTypeValidation.updateParam
>;
export type UnitTypeGetQuery = z.infer<typeof UnitTypeValidation.getQuery>;
export type UnitTypeGetByIdParam = z.infer<
  typeof UnitTypeValidation.getByIdParam
>;
