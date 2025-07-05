import { injectable } from "tsyringe";
import prisma from "../../core/prisma_client";
import {
  PackageTypeCreateBody,
  PackageTypeGetByIdParam,
  PackageTypeGetQuery,
  PackageTypeUpdateBody,
  PackageTypeUpdateParam,
} from "./package_type.validation";
import { Prisma } from "@prisma/client";

@injectable()
export default class PackageTypeService {
  create = async (body: PackageTypeCreateBody) => {
    const packageType = await prisma.packageType.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (packageType) {
      throw Error(`PackageType with the name ${body.name} already exists`);
    }
    const result = await prisma.packageType.create({
      data: body,
    });
    return result;
  };

  update = async (
    param: PackageTypeUpdateParam,
    body: PackageTypeUpdateBody
  ) => {
    const duplicate = await prisma.packageType.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (duplicate) {
      throw Error(`PackageType with the name ${body.name} already exists`);
    }
    const packageType = await prisma.packageType.findFirst({
      where: { id: Number(param.id) },
    });
    if (!packageType) throw Error(`PackageType with id ${param.id} not found!`);

    const result = await prisma.packageType.update({
      where: { id: Number(param.id) },
      data: body,
    });
    return result;
  };

  get = async (query: PackageTypeGetQuery) => {
    console.log(query);
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);
    const skip = (page - 1) * perPage;
    const where: Prisma.PackageTypeWhereInput | undefined = query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: "insensitive" } },
            { description: { contains: query.q, mode: "insensitive" } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.packageType.findMany({
        where: where,
        skip: skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.packageType.count({ where: where }),
    ]);

    return {
      page: page,
      perPage: perPage,
      total: total,
      items: items,
    };
  };

  getById = async (param: PackageTypeGetByIdParam) => {
    const packageType = await prisma.packageType.findFirst({
      where: { id: Number(param.id) },
    });
    if (!packageType) throw Error(`PackageType with id ${param.id} not found!`);
    return packageType;
  };
}
