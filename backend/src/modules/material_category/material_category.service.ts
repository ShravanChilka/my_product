import { Prisma } from "@prisma/client";
import prisma from "../../core/prisma_client";
import {
  MaterialCategoryCreateBody,
  MaterialCategoryGetByIdParam,
  MaterialCategoryGetQuery,
  MaterialCategoryUpdateBody,
  MaterialCategoryUpdateParam,
} from "./material_category.validation";
import { injectable } from "tsyringe";

@injectable()
export default class MaterialCategoryService {
  create = async (body: MaterialCategoryCreateBody) => {
    const category = await prisma.materialCategory.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (category) {
      throw Error(`MaterialCategory with the name ${body.name} already exists`);
    }
    const result = await prisma.materialCategory.create({
      data: {
        name: body.name,
        parentId: body.parentId,
      },
    });
    return result;
  };

  update = async (
    param: MaterialCategoryUpdateParam,
    body: MaterialCategoryUpdateBody
  ) => {
    const duplicate = await prisma.materialCategory.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (duplicate) {
      throw Error(`MaterialCategory with the name ${body.name} already exists`);
    }
    const category = await prisma.materialCategory.findFirst({
      where: { id: Number(param.id) },
    });
    if (!category)
      throw Error(`MaterialCategory with id ${param.id} not found!`);

    const result = await prisma.materialCategory.update({
      where: { id: Number(param.id) },
      data: body,
    });
    return result;
  };

  get = async (query: MaterialCategoryGetQuery) => {
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);
    const skip = (page - 1) * perPage;
    const where: Prisma.MaterialCategoryWhereInput | undefined = query.q
      ? { name: { contains: query.q, mode: "insensitive" } }
      : {};

    const [items, total] = await Promise.all([
      prisma.materialCategory.findMany({
        where: where,
        skip: skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.materialCategory.count({ where: where }),
    ]);

    return {
      page: page,
      perPage: perPage,
      total: total,
      items: items,
    };
  };

  getById = async (param: MaterialCategoryGetByIdParam) => {
    const category = await prisma.materialCategory.findFirst({
      where: { id: Number(param.id) },
    });
    if (!category)
      throw Error(`MaterialCategory with id ${param.id} not found!`);
    return category;
  };
}
