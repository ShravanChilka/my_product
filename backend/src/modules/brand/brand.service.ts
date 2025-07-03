import { injectable } from "tsyringe";
import prisma from "../../core/prisma_client";
import {
  BrandCreateBody,
  BrandGetByIdParam,
  BrandGetQuery,
  BrandUpdateBody,
  BrandUpdateParam,
} from "./brand.validation";
import { Prisma } from "@prisma/client";

@injectable()
export default class BrandService {
  create = async (body: BrandCreateBody) => {
    const brand = await prisma.brand.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (brand) {
      throw Error(`Brand with the name ${body.name} already exists`);
    }
    const result = await prisma.brand.create({
      data: {
        name: body.name,
        description: body.description,
        logoURL: body.logoURL,
      },
    });
    return result;
  };

  update = async (param: BrandUpdateParam, body: BrandUpdateBody) => {
    const duplicate = await prisma.brand.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (duplicate) {
      throw Error(`Brand with the name ${body.name} already exists`);
    }
    const brand = await prisma.brand.findFirst({
      where: { id: Number(param.id) },
    });
    if (!brand) throw Error(`Brand with id ${param.id} not found!`);

    const result = await prisma.brand.update({
      where: { id: Number(param.id) },
      data: body,
    });
    return result;
  };

  get = async (query: BrandGetQuery) => {
    console.log(query);
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);
    const skip = (page - 1) * perPage;
    const where: Prisma.BrandWhereInput | undefined = query.q
      ? { name: { contains: query.q, mode: "insensitive" } }
      : {};

    const [items, total] = await Promise.all([
      prisma.brand.findMany({
        where: where,
        skip: skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.brand.count({ where: where }),
    ]);

    return {
      page: page,
      perPage: perPage,
      total: total,
      items: items,
    };
  };

  getById = async (param: BrandGetByIdParam) => {
    const brand = await prisma.brand.findFirst({
      where: { id: Number(param.id) },
    });
    if (!brand) throw Error(`Brand with id ${param.id} not found!`);
    return brand;
  };
}
