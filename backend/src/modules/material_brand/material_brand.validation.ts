import { z } from "zod";

export default class MaterialBrandValidation {
  static createBody = z.object({
    name: z.string().trim().min(3).max(100),
    description: z.string().trim().min(3).max(200).optional(),
    logoURL: z.string().url("Invalid URL format"),
  });

  static updateParam = z.object({
    id: z.coerce.number().int().positive(),
  });

  static updateBody = z.object({
    name: z.string().trim().min(3).max(100),
    description: z.string().trim().min(3).max(200).optional(),
    logoURL: z.string().url("Invalid URL format"),
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

export type MaterialBrandCreateBody = z.infer<
  typeof MaterialBrandValidation.createBody
>;
export type MaterialBrandUpdateBody = z.infer<
  typeof MaterialBrandValidation.updateBody
>;
export type MaterialBrandUpdateParam = z.infer<
  typeof MaterialBrandValidation.updateParam
>;
export type MaterialBrandGetQuery = z.infer<
  typeof MaterialBrandValidation.getQuery
>;
export type MaterialBrandGetByIdParam = z.infer<
  typeof MaterialBrandValidation.getByIdParam
>;
