import z from "zod";
import { LocationType } from "@prisma/client";

export default class LocationValidation {
  static createBody = z.object({
    name: z.string().trim().min(3).max(100),
    address: z.string().trim().min(3).max(300),
    type: z.nativeEnum(LocationType).optional(),
    parentId: z.number().int().optional(),
  });

  static updateBody = z.object({
    name: z.string().trim().min(3).max(100).optional(),
    address: z.string().trim().min(3).max(300).optional(),
    type: z.nativeEnum(LocationType).optional(),
    parentId: z.number().int().optional(),
  });

  static updateParam = z.object({
    id: z.coerce.number().int(),
  });

  static getQuery = z.object({
    page: z.coerce.number().positive().optional(),
    perPage: z.coerce.number().positive().optional(),
    q: z.string().trim().optional(),
    type: z.nativeEnum(LocationType).optional(),
    parentId: z.coerce.number().int().optional(),
    parent: z.union([z.literal("true"), z.literal("false")]).optional(),
  });

  static getByIdParam = z.object({
    id: z.coerce.number().int().positive(),
  });
}

export type LocationCreateBody = z.infer<typeof LocationValidation.createBody>;
export type LocationUpdateBody = z.infer<typeof LocationValidation.updateBody>;
export type LocationUpdateParam = z.infer<
  typeof LocationValidation.updateParam
>;
export type LocationGetQuery = z.infer<typeof LocationValidation.getQuery>;
export type LocationGetByIdParam = z.infer<
  typeof LocationValidation.getByIdParam
>;
