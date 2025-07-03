import { z } from "zod";

export default class BrandValidation {
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

export type BrandCreateBody = z.infer<typeof BrandValidation.createBody>;
export type BrandUpdateBody = z.infer<typeof BrandValidation.updateBody>;
export type BrandUpdateParam = z.infer<typeof BrandValidation.updateParam>;
export type BrandGetQuery = z.infer<typeof BrandValidation.getQuery>;
export type BrandGetByIdParam = z.infer<typeof BrandValidation.getByIdParam>;
