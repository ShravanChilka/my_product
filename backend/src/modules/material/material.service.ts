import { inject, injectable } from "tsyringe";
import prisma from "../../core/prisma_client";
import {
  MaterialCreateBody,
  MaterialGenerateSku,
  MaterialGetByIdParam,
  MaterialGetQuery,
  MaterialUpdateBody,
  MaterialUpdateParam,
} from "./material.validation";
import { Prisma } from "@prisma/client";
import CategoryService from "../material_category/material_category.service";
import { parseBoolean } from "../../utils/parse_boolean";

@injectable()
export default class MaterialService {
  private service: CategoryService;

  constructor(@inject(CategoryService) service: CategoryService) {
    this.service = service;
  }

  create = async (body: MaterialCreateBody) => {
    const material = await prisma.material.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (material) {
      throw Error(`Material with the name ${body.name} already exists`);
    }
    const category = await this.service.getById({ id: body.categoryId });
    const tempSku = `TEMP-${Date.now()}`;
    const tempResult = await prisma.material.create({
      data: { ...body, sku: tempSku },
    });
    const sku = this.generateSku({
      materialName: body.name,
      categoryName: category.name,
      materialId: tempResult.id,
    });
    const result = await prisma.material.update({
      where: { id: tempResult.id },
      data: { sku },
    });
    return result;
  };

  update = async (param: MaterialUpdateParam, body: MaterialUpdateBody) => {
    const duplicate = await prisma.material.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (duplicate) {
      throw Error(`Material with the name ${body.name} already exists`);
    }
    const material = await prisma.material.findFirst({
      where: { id: Number(param.id) },
    });
    if (!material) throw Error(`Material with id ${param.id} not found!`);

    var sku: string | undefined = undefined;
    if (body.categoryId != null || body.name != null) {
      const category = await this.service.getById({
        id: body.categoryId ?? material.categoryId,
      });
      const categoryName = category.name;
      const materialName = body.name ?? material.name;
      sku = this.generateSku({
        categoryName,
        materialName,
        materialId: material.id,
      });
    }

    const result = await prisma.material.update({
      where: { id: Number(param.id) },
      data: { ...body, sku },
    });
    return result;
  };

  get = async (query: MaterialGetQuery) => {
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);
    const skip = (page - 1) * perPage;
    const where: Prisma.MaterialWhereInput = {
      OR:
        query.q != null
          ? [
              {
                name: { contains: query.q, mode: "insensitive" },
              },
              {
                sku: {
                  contains: query.q,
                  mode: "insensitive",
                },
              },
            ]
          : undefined,
      categoryId:
        query.categoryId != null
          ? {
              equals: Number(query.categoryId),
            }
          : undefined,
      brandId:
        query.brandId != null
          ? {
              equals: Number(query.brandId),
            }
          : undefined,
    };

    const [items, total] = await Promise.all([
      prisma.material.findMany({
        where: where,
        skip: skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          brand: parseBoolean(query.brand),
          category: parseBoolean(query.category),
          unitOfMeasure: parseBoolean(query.unitOfMeasure),
        },
      }),
      prisma.material.count({ where: where }),
    ]);

    return {
      page: page,
      perPage: perPage,
      total: total,
      items: items,
    };
  };

  getById = async (param: MaterialGetByIdParam) => {
    const material = await prisma.material.findFirst({
      where: { id: Number(param.id) },
      include: {
        brand: true,
        category: true,
        unitOfMeasure: true,
      },
    });
    if (!material) throw Error(`Material with id ${param.id} not found!`);
    return material;
  };

  private generateSku = (data: MaterialGenerateSku) => {
    const materialNameShort = data.materialName
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 3);
    const categoryNameShort = data.categoryName
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 3);
    const paddedId = data.materialId.toString().padStart(4, "0");
    return `${materialNameShort}-${categoryNameShort}-${paddedId}`;
  };
}
