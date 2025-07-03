import { Prisma } from "@prisma/client";
import prisma from "../../core/prisma_client";
import {
  CategoryCreateBody,
  CategoryGetByIdParam,
  CategoryGetQuery,
  CategoryUpdateBody,
  CategoryUpdateParam,
} from "./category.validation";
import { injectable } from "tsyringe";

@injectable()
export default class CategoryService {
  create = async (body: CategoryCreateBody) => {
    const category = await prisma.category.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (category) {
      throw Error(`Category with the name ${body.name} already exists`);
    }
    console.log(body);
    const result = await prisma.category.create({
      data: {
        name: body.name,
        parentId: body.parentId,
      },
    });
    return result;
  };

  update = async (param: CategoryUpdateParam, body: CategoryUpdateBody) => {
    const duplicate = await prisma.category.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (duplicate) {
      throw Error(`Category with the name ${body.name} already exists`);
    }
    const category = await prisma.category.findFirst({
      where: { id: Number(param.id) },
    });
    if (!category) throw Error(`Category with id ${param.id} not found!`);

    const result = await prisma.category.update({
      where: { id: Number(param.id) },
      data: body,
    });
    return result;
  };

  get = async (query: CategoryGetQuery) => {
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);
    const skip = (page - 1) * perPage;
    const where: Prisma.CategoryWhereInput | undefined = query.q
      ? { name: { contains: query.q, mode: "insensitive" } }
      : {};

    const [items, total] = await Promise.all([
      prisma.category.findMany({
        where: where,
        skip: skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.category.count({ where: where }),
    ]);

    return {
      page: page,
      perPage: perPage,
      total: total,
      items: items,
    };
  };

  getById = async (param: CategoryGetByIdParam) => {
    const category = await prisma.category.findFirst({
      where: { id: Number(param.id) },
    });
    if (!category) throw Error(`Category with id ${param.id} not found!`);
    return category;
  };
}
