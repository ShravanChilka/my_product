import { injectable } from "tsyringe";
import {
  UnitOfMeasureCreateBody,
  UnitOfMeasureGetByIdParam,
  UnitOfMeasureGetQuery,
  UnitOfMeasureUpdateBody,
  UnitOfMeasureUpdateParam,
} from "./unit_of_measure.validation";
import prisma from "../../core/prisma_client";
import { Prisma } from "@prisma/client";

@injectable()
export default class UnitOfMeasureService {
  create = async (body: UnitOfMeasureCreateBody) => {
    const uom = await prisma.unitOfMeasure.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (uom) {
      throw Error(`UnitOfMeasure with the name ${body.name} already exists`);
    }
    const result = await prisma.unitOfMeasure.create({
      data: body,
    });
    return result;
  };

  update = async (
    param: UnitOfMeasureUpdateParam,
    body: UnitOfMeasureUpdateBody
  ) => {
    const duplicate = await prisma.unitOfMeasure.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (duplicate) {
      throw Error(`UnitOfMeasure with the name ${body.name} already exists`);
    }
    const uom = await prisma.unitOfMeasure.findFirst({
      where: { id: Number(param.id) },
    });
    if (!uom) throw Error(`UnitOfMeasure with id ${param.id} not found!`);

    const result = await prisma.unitOfMeasure.update({
      where: { id: Number(param.id) },
      data: body,
    });
    return result;
  };

  get = async (query: UnitOfMeasureGetQuery) => {
    console.log(query);
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);
    const skip = (page - 1) * perPage;
    const where: Prisma.UnitOfMeasureWhereInput | undefined = query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: "insensitive" } },
            { abbreviation: { contains: query.q, mode: "insensitive" } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.unitOfMeasure.findMany({
        where: where,
        skip: skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.unitOfMeasure.count({ where: where }),
    ]);

    return {
      page: page,
      perPage: perPage,
      total: total,
      items: items,
    };
  };

  getById = async (param: UnitOfMeasureGetByIdParam) => {
    const uom = await prisma.unitOfMeasure.findFirst({
      where: { id: Number(param.id) },
    });
    if (!uom) throw Error(`UnitOfMeasure with id ${param.id} not found!`);
    return uom;
  };
}
