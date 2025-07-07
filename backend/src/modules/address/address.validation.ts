import { z } from "zod";

export default class AddressValidation {
  static createBody = z.object({
    country: z.string().trim().min(3).max(100),
    countryCode: z.string().trim().min(3).max(100),
    state: z.string().trim().min(3).max(100),
    city: z.string().trim().min(3).max(100),
    area: z.string().trim().min(3).max(100).optional(),
    postalCode: z.string().trim().min(6).max(6).optional(),
  });

  static upsert = z.object({
    country: z.string().trim().min(3).max(100),
    countryCode: z.string().trim().min(3).max(100),
    state: z.string().trim().min(3).max(100),
    city: z.string().trim().min(3).max(100),
    area: z.string().trim().min(3).max(100).optional(),
    postalCode: z.string().trim().min(6).max(6).optional(),
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

export type AddressCreateBody = z.infer<typeof AddressValidation.createBody>;
export type AddressUpdateBody = z.infer<typeof AddressValidation.updateBody>;
export type AddressUpdateParam = z.infer<typeof AddressValidation.updateParam>;
export type AddressGetQuery = z.infer<typeof AddressValidation.getQuery>;
export type AddressGetByIdParam = z.infer<
  typeof AddressValidation.getByIdParam
>;
export type AddressUpsert = z.infer<typeof AddressValidation.upsert>;
