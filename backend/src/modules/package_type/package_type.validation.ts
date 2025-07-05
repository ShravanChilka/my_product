import { z } from "zod";

export default class PackageTypeValidation {
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

export type PackageTypeCreateBody = z.infer<
  typeof PackageTypeValidation.createBody
>;
export type PackageTypeUpdateBody = z.infer<
  typeof PackageTypeValidation.updateBody
>;
export type PackageTypeUpdateParam = z.infer<
  typeof PackageTypeValidation.updateParam
>;
export type PackageTypeGetQuery = z.infer<
  typeof PackageTypeValidation.getQuery
>;
export type PackageTypeGetByIdParam = z.infer<
  typeof PackageTypeValidation.getByIdParam
>;
