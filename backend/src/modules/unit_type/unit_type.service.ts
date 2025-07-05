import { injectable } from "tsyringe";
import prisma from "../../core/prisma_client";
import {
  UnitTypeCreateBody,
  UnitTypeGetByIdParam,
  UnitTypeGetQuery,
  UnitTypeUpdateBody,
  UnitTypeUpdateParam,
} from "./unit_type.validation";
import { Prisma } from "@prisma/client";

@injectable()
export default class UnitTypeService {
  create = async (body: UnitTypeCreateBody) => {
    const unitType = await prisma.unitType.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (unitType) {
      throw Error(`UnitType with the name ${body.name} already exists`);
    }
    const result = await prisma.unitType.create({
      data: body,
    });
    return result;
  };

  update = async (param: UnitTypeUpdateParam, body: UnitTypeUpdateBody) => {
    const duplicate = await prisma.unitType.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (duplicate) {
      throw Error(`UnitType with the name ${body.name} already exists`);
    }
    const unitType = await prisma.unitType.findFirst({
      where: { id: Number(param.id) },
    });
    if (!unitType) throw Error(`UnitType with id ${param.id} not found!`);

    const result = await prisma.unitType.update({
      where: { id: Number(param.id) },
      data: body,
    });
    return result;
  };

  get = async (query: UnitTypeGetQuery) => {
    console.log(query);
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);
    const skip = (page - 1) * perPage;
    const where: Prisma.UnitTypeWhereInput | undefined = query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: "insensitive" } },
            { description: { contains: query.q, mode: "insensitive" } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.unitType.findMany({
        where: where,
        skip: skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.unitType.count({ where: where }),
    ]);

    return {
      page: page,
      perPage: perPage,
      total: total,
      items: items,
    };
  };

  getById = async (param: UnitTypeGetByIdParam) => {
    const unitType = await prisma.unitType.findFirst({
      where: { id: Number(param.id) },
    });
    if (!unitType) throw Error(`UnitType with id ${param.id} not found!`);
    return unitType;
  };
}
