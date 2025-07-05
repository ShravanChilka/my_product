import { injectable } from "tsyringe";
import {
  MaterialPackageCreateBody,
  MaterialPackageGenerateSku,
  MaterialPackageGetByIdParam,
  MaterialPackageGetQuery,
  MaterialPackageUpdateBody,
  MaterialPackageUpdateParam,
} from "./material_package.validation";
import prisma from "../../core/prisma_client";
import { Prisma } from "@prisma/client";
import { parseBoolean } from "../../utils/parse_boolean";

@injectable()
export default class MaterialPackageService {
  create = async (body: MaterialPackageCreateBody) => {
    const materialPackage = await prisma.materialPackage.findFirst({
      where: {
        materialId: {
          equals: body.materialId,
        },
        packageSizeId: {
          equals: body.packageSizeId,
        },
        packageTypeId: {
          equals: body.packageTypeId,
        },
      },
    });
    if (materialPackage) {
      throw Error(
        `MaterialPackage with the materialId, packageSizeId and packageTypeId already exists`
      );
    }
    const sku = await this.generateSku(body);
    const result = await prisma.materialPackage.create({
      data: { ...body, sku },
    });
    return result;
  };

  update = async (
    param: MaterialPackageUpdateParam,
    body: MaterialPackageUpdateBody
  ) => {
    const duplicate = await prisma.materialPackage.findFirst({
      where: {
        materialId: {
          equals: body.materialId,
        },
        packageSizeId: {
          equals: body.packageSizeId,
        },
        packageTypeId: {
          equals: body.packageTypeId,
        },
      },
    });
    if (duplicate) {
      throw Error(
        `MaterialPackage with the materialId, packageSizeId and packageTypeId already exists`
      );
    }
    const materialPackage = await prisma.materialPackage.findFirst({
      where: { id: Number(param.id) },
    });
    if (!materialPackage)
      throw Error(`MaterialPackage with id ${param.id} not found!`);

    var sku: string | undefined;

    if (
      body?.materialId != null ||
      body?.packageSizeId != null ||
      body?.packageTypeId != null
    ) {
      sku = await this.generateSku({
        materialId: body.materialId ?? materialPackage.materialId,
        packageSizeId: body.packageSizeId ?? materialPackage.packageSizeId,
        packageTypeId: body.packageTypeId ?? materialPackage.packageTypeId,
      });
    }
    const result = await prisma.materialPackage.update({
      where: { id: Number(param.id) },
      data: { ...body, sku },
    });
    return result;
  };

  get = async (query: MaterialPackageGetQuery) => {
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);
    const skip = (page - 1) * perPage;
    const where: Prisma.MaterialPackageWhereInput = {
      materialId:
        query.materialId != null
          ? {
              equals: Number(query.materialId),
            }
          : undefined,
      packageSizeId:
        query.packageSizeId != null
          ? {
              equals: Number(query.packageSizeId),
            }
          : undefined,
      packageTypeId:
        query.packageTypeId != null
          ? {
              equals: Number(query.packageTypeId),
            }
          : undefined,
    };

    const [items, total] = await Promise.all([
      prisma.materialPackage.findMany({
        where: where,
        skip: skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          material: parseBoolean(query.material),
          packageType: parseBoolean(query.packageType),
          packageSize: parseBoolean(query.packageSize),
        },
      }),
      prisma.materialPackage.count({ where: where }),
    ]);

    return {
      page: page,
      perPage: perPage,
      total: total,
      items: items,
    };
  };

  getById = async (param: MaterialPackageGetByIdParam) => {
    const materialPackage = await prisma.materialPackage.findFirst({
      where: { id: Number(param.id) },
      include: {
        material: true,
        packageSize: true,
        packageType: true,
      },
    });
    if (!materialPackage)
      throw Error(`MaterialPackage with id ${param.id} not found!`);
    return materialPackage;
  };

  private generateSku = async (data: MaterialPackageGenerateSku) => {
    const material = await prisma.material.findFirst({
      where: { id: Number(data.materialId) },
      select: { sku: true },
    });
    if (!material)
      throw Error(`Material with id ${data.materialId} not found!`);
    const packageType = await prisma.packageType.findFirst({
      where: { id: Number(data.packageTypeId) },
      select: { name: true },
    });
    if (!packageType)
      throw Error(`PackageType with id ${data.packageTypeId} not found!`);
    const packageSize = await prisma.packageSize.findFirst({
      where: { id: Number(data.packageSizeId) },
      select: { size: true, unitOfMeasure: true },
    });
    if (!packageSize)
      throw Error(`PackageSize with id ${data.packageSizeId} not found!`);

    const materialSku = material.sku
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 3);
    const packageTypeName = packageType.name
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 3);
    const packageSizeText =
      packageSize.size.toFixed(0) +
      packageSize.unitOfMeasure.abbreviation.toUpperCase();
    const sku = `${materialSku}-${packageTypeName}-${packageSizeText}`;
    console.log(sku);
    return sku;
  };
}
