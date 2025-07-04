import { injectable } from "tsyringe";
import {
  LocationCreateBody,
  LocationGetByIdParam,
  LocationGetQuery,
  LocationUpdateBody,
  LocationUpdateParam,
} from "./location.validation";
import prisma from "../../core/prisma_client";
import { LocationType, Prisma } from "@prisma/client";
import { parseBoolean } from "../../utils/parse_boolean";

@injectable()
export default class LocationService {
  create = async (body: LocationCreateBody) => {
    const location = await prisma.location.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (location) {
      throw Error(`Location with the name ${body.name} already exists`);
    }

    const tempCode = `TEMP-${Date.now()}`;
    const tempResult = await prisma.location.create({
      data: { ...body, code: tempCode },
    });

    const code = this.generateCode({
      id: tempResult.id,
      type: body.type,
    });
    const result = await prisma.location.update({
      where: { id: tempResult.id },
      data: { code },
    });
    return result;
  };

  update = async (param: LocationUpdateParam, body: LocationUpdateBody) => {
    const duplicate = await prisma.location.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });
    if (duplicate) {
      throw Error(`Location with the name ${body.name} already exists`);
    }
    const location = await prisma.location.findFirst({
      where: { id: Number(param.id) },
    });
    if (!location) throw Error(`Location with id ${param.id} not found!`);

    var code: string | undefined = undefined;

    if (body.type != null) {
      code = this.generateCode({
        type: body.type,
        id: location.id,
      });
    }

    const result = await prisma.location.update({
      where: { id: Number(param.id) },
      data: { ...body, code },
    });
    return result;
  };

  get = async (query: LocationGetQuery) => {
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);
    const skip = (page - 1) * perPage;
    const where: Prisma.LocationWhereInput = {
      OR:
        query.q != null
          ? [
              {
                name: { contains: query.q, mode: "insensitive" },
              },
              {
                code: {
                  contains: query.q,
                  mode: "insensitive",
                },
              },
              {
                address: {
                  contains: query.q,
                  mode: "insensitive",
                },
              },
            ]
          : undefined,
      parent:
        query.parentId != null
          ? {
              parentId: {
                equals: Number(query.parentId),
              },
            }
          : undefined,
      type:
        query.type != null
          ? {
              equals: query.type,
            }
          : undefined,
    };
    const [items, total] = await Promise.all([
      prisma.location.findMany({
        where: where,
        skip: skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          parent: parseBoolean(query.parent),
        },
      }),
      prisma.location.count({ where: where }),
    ]);

    return {
      page: page,
      perPage: perPage,
      total: total,
      items: items,
    };
  };

  getById = async (param: LocationGetByIdParam) => {
    const location = await prisma.location.findFirst({
      where: { id: Number(param.id) },
    });
    if (!location) throw Error(`Location with id ${param.id} not found!`);
    return location;
  };

  private generateCode = ({
    id,
    type = LocationType.warehouse,
  }: {
    id: number;
    type?: LocationType;
  }) => {
    const prefix = type.toUpperCase().slice(0, 3);
    const suffix = id.toString().padStart(4, "0");
    return `${prefix}-${suffix}`;
  };
}
