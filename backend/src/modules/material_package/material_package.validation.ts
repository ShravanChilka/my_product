import z from "zod";

export default class MaterialPackageValidation {
  static createBody = z.object({
    materialId: z.number().positive(),
    packageTypeId: z.number().positive(),
    packageSizeId: z.number().positive(),
    barcode: z.string().optional(),
    quantity: z.number().positive().default(0).optional(),
    reservedQuantity: z.number().positive().default(0).optional(),
    thresholdQuantity: z.number().positive().default(0).optional(),
  });

  static updateBody = z.object({
    materialId: z.number().positive().optional(),
    packageTypeId: z.number().positive().optional(),
    packageSizeId: z.number().positive().optional(),
    barcode: z.string().optional(),
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
    q: z.string().trim().optional(),
    material: z.union([z.literal("true"), z.literal("false")]).optional(),
    packageType: z.union([z.literal("true"), z.literal("false")]).optional(),
    packageSize: z.union([z.literal("true"), z.literal("false")]).optional(),
    materialId: z.coerce.number().positive().optional(),
    packageTypeId: z.coerce.number().positive().optional(),
    packageSizeId: z.coerce.number().positive().optional(),
    barcode: z.coerce.string().optional(),
  });

  static getByIdParam = z.object({
    id: z.coerce.number().int().positive(),
  });

  static generateSku = z.object({
    materialId: z.number().positive(),
    packageTypeId: z.number().positive(),
    packageSizeId: z.number().positive(),
  });
}

export type MaterialPackageCreateBody = z.infer<
  typeof MaterialPackageValidation.createBody
>;
export type MaterialPackageUpdateBody = z.infer<
  typeof MaterialPackageValidation.updateBody
>;
export type MaterialPackageUpdateParam = z.infer<
  typeof MaterialPackageValidation.updateParam
>;
export type MaterialPackageGetQuery = z.infer<
  typeof MaterialPackageValidation.getQuery
>;
export type MaterialPackageGetByIdParam = z.infer<
  typeof MaterialPackageValidation.getByIdParam
>;
export type MaterialPackageGenerateSku = z.infer<
  typeof MaterialPackageValidation.generateSku
>;
