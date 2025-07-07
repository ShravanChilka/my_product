import z from "zod";
import { LocationType } from "@prisma/client";

export default class LocationValidation {
  static createBody = z.object({
    name: z.string().trim().min(3).max(100),
    type: z.nativeEnum(LocationType).optional(),
    parentId: z.number().positive().optional(),
    address: z.object({
      country: z.string().trim().min(3).max(100),
      countryCode: z.string().trim().min(3).max(100),
      state: z.string().trim().min(3).max(100),
      city: z.string().trim().min(3).max(100),
      area: z.string().trim().min(3).max(100).optional(),
      postalCode: z.string().trim().min(6).max(6).optional(),
    }),
    geo: z
      .object({
        latitude: z.number().optional(),
        longitude: z.number().optional(),
      })
      .optional(),
  });

  static updateBody = z.object({
    name: z.string().trim().min(3).max(100).optional(),
    type: z.nativeEnum(LocationType).optional(),
    parentId: z.number().positive().optional(),
    address: z
      .object({
        country: z.string().trim().min(3).max(100),
        countryCode: z.string().trim().min(3).max(100),
        state: z.string().trim().min(3).max(100),
        city: z.string().trim().min(3).max(100),
        area: z.string().trim().min(3).max(100).optional(),
        postalCode: z.string().trim().min(6).max(6).optional(),
      })
      .optional(),
    geo: z
      .object({
        latitude: z.number().optional(),
        longitude: z.number().optional(),
      })
      .optional(),
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
    address: z.union([z.literal("true"), z.literal("false")]).optional(),
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
