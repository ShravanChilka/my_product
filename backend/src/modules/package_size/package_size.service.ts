import { injectable } from "tsyringe";
import {
  PackageSizeCreateBody,
  PackageSizeGetByIdParam,
  PackageSizeGetQuery,
  PackageSizeUpdateBody,
  PackageSizeUpdateParam,
} from "./package_size.validation";
import prisma from "../../core/prisma_client";
import { Prisma } from "@prisma/client";
import { parseBoolean } from "../../utils/parse_boolean";

@injectable()
export default class PackageSizeService {
  create = async (body: PackageSizeCreateBody) => {
    const packageSize = await prisma.packageSize.findFirst({
      where: {
        size: {
          equals: body.size,
        },
        unitOfMeasureId: {
          equals: body.unitOfMeasureId,
        },
      },
    });
    if (packageSize) {
      throw Error(
        `PackageSize with the same size & unit of measure already exists`
      );
    }
    const result = await prisma.packageSize.create({
      data: body,
    });
    return result;
  };

  update = async (
    param: PackageSizeUpdateParam,
    body: PackageSizeUpdateBody
  ) => {
    const duplicate = await prisma.packageSize.findFirst({
      where: {
        size: {
          equals: body.size,
        },
        unitOfMeasureId: {
          equals: body.unitOfMeasureId,
        },
      },
    });
    if (duplicate) {
      throw Error(
        `PackageSize with the same size & unit of measure already exists`
      );
    }
    const packageSize = await prisma.packageSize.findFirst({
      where: { id: Number(param.id) },
    });
    if (!packageSize) throw Error(`PackageSize with id ${param.id} not found!`);

    const result = await prisma.packageSize.update({
      where: { id: Number(param.id) },
      data: body,
    });
    return result;
  };

  get = async (query: PackageSizeGetQuery) => {
    console.log(query);
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);
    const skip = (page - 1) * perPage;
    const where: Prisma.PackageSizeWhereInput | undefined = {
      size: query.size != null ? { equals: Number(query.size) } : undefined,
      unitOfMeasureId:
        query.unitOfMeasureId != null
          ? { equals: Number(query.unitOfMeasureId) }
          : undefined,
      baseUnitOfMeasureId:
        query.baseUnitOfMeasureId != null
          ? { equals: Number(query.baseUnitOfMeasureId) }
          : undefined,
    };

    const [items, total] = await Promise.all([
      prisma.packageSize.findMany({
        where: where,
        skip: skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          unitOfMeasure: parseBoolean(query.unitOfMeasure),
          baseUnitOfMeasure: parseBoolean(query.baseUnitOfMeasure),
        },
      }),
      prisma.packageSize.count({ where: where }),
    ]);

    return {
      page: page,
      perPage: perPage,
      total: total,
      items: items,
    };
  };

  getById = async (param: PackageSizeGetByIdParam) => {
    const packageSize = await prisma.packageSize.findFirst({
      where: { id: Number(param.id) },
      include: {
        baseUnitOfMeasure: true,
        unitOfMeasure: true,
      },
    });
    if (!packageSize) throw Error(`PackageSize with id ${param.id} not found!`);
    return packageSize;
  };
}
