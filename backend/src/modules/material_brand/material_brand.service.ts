import { injectable } from "tsyringe";
import prisma from "../../core/prisma_client";
import {
  MaterialBrandCreateBody,
  MaterialBrandGetByIdParam,
  MaterialBrandGetQuery,
  MaterialBrandUpdateBody,
  MaterialBrandUpdateParam,
} from "./material_brand.validation";
import { Prisma } from "@prisma/client";

@injectable()
export default class MaterialBrandService {
  create = async (body: MaterialBrandCreateBody) => {
    const brand = await prisma.materialBrand.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (brand) {
      throw Error(`MaterialBrand with the name ${body.name} already exists`);
    }
    const result = await prisma.materialBrand.create({
      data: {
        name: body.name,
        description: body.description,
        logoURL: body.logoURL,
      },
    });
    return result;
  };

  update = async (
    param: MaterialBrandUpdateParam,
    body: MaterialBrandUpdateBody
  ) => {
    const duplicate = await prisma.materialBrand.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (duplicate) {
      throw Error(`MaterialBrand with the name ${body.name} already exists`);
    }
    const brand = await prisma.materialBrand.findFirst({
      where: { id: Number(param.id) },
    });
    if (!brand) throw Error(`MaterialBrand with id ${param.id} not found!`);

    const result = await prisma.materialBrand.update({
      where: { id: Number(param.id) },
      data: body,
    });
    return result;
  };

  get = async (query: MaterialBrandGetQuery) => {
    console.log(query);
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);
    const skip = (page - 1) * perPage;
    const where: Prisma.MaterialBrandWhereInput | undefined = query.q
      ? { name: { contains: query.q, mode: "insensitive" } }
      : {};

    const [items, total] = await Promise.all([
      prisma.materialBrand.findMany({
        where: where,
        skip: skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.materialBrand.count({ where: where }),
    ]);

    return {
      page: page,
      perPage: perPage,
      total: total,
      items: items,
    };
  };

  getById = async (param: MaterialBrandGetByIdParam) => {
    const brand = await prisma.materialBrand.findFirst({
      where: { id: Number(param.id) },
    });
    if (!brand) throw Error(`MaterialBrand with id ${param.id} not found!`);
    return brand;
  };
}
