import z from "zod";

export default class InventoryValidation {
  static createBody = z.object({
    materialPackageId: z.number().positive(),
    locationId: z.number().positive(),
    quantity: z.number().positive().default(0).optional(),
    reservedQuantity: z.number().positive().default(0).optional(),
    thresholdQuantity: z.number().positive().default(0).optional(),
  });

  static updateBody = z.object({
    materialPackageId: z.number().positive().optional(),
    locationId: z.number().positive().optional(),
    quantity: z.number().positive().optional(),
    reservedQuantity: z.number().positive().optional(),
    thresholdQuantity: z.number().positive().optional(),
  });

  static updateParam = z.object({
    id: z.coerce.number().int(),
  });

  static getQuery = z.object({
    page: z.coerce.number().positive().optional(),
    perPage: z.coerce.number().positive().optional(),
    materialPackage: z
      .union([z.literal("true"), z.literal("false")])
      .optional(),
    location: z.union([z.literal("true"), z.literal("false")]).optional(),
    materialPackageId: z.coerce.number().positive().optional(),
    locationId: z.coerce.number().positive().optional(),
  });

  static getByIdParam = z.object({
    id: z.coerce.number().int().positive(),
  });
}

export type InventoryCreateBody = z.infer<
  typeof InventoryValidation.createBody
>;
export type InventoryUpdateBody = z.infer<
  typeof InventoryValidation.updateBody
>;
export type InventoryUpdateParam = z.infer<
  typeof InventoryValidation.updateParam
>;
export type InventoryGetQuery = z.infer<typeof InventoryValidation.getQuery>;
export type InventoryGetByIdParam = z.infer<
  typeof InventoryValidation.getByIdParam
>;
