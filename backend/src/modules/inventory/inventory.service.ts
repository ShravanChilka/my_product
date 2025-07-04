import { inject, injectable } from "tsyringe";
import prisma from "../../core/prisma_client";
import {
  InventoryCreateBody,
  InventoryGetByIdParam,
  InventoryGetQuery,
  InventoryUpdateBody,
  InventoryUpdateParam,
} from "./inventory.validation";
import { Prisma } from "@prisma/client";
import { parseBoolean } from "../../utils/parse_boolean";

@injectable()
export default class InventoryService {
  create = async (body: InventoryCreateBody) => {
    const inventory = await prisma.inventory.findFirst({
      where: {
        materialId: {
          equals: body.materialId,
        },
        locationId: {
          equals: body.locationId,
        },
      },
    });
    if (inventory) {
      throw Error(
        `Inventory with the materialId and locationId already exists`
      );
    }
    const result = await prisma.inventory.create({
      data: body,
    });
    return result;
  };

  update = async (param: InventoryUpdateParam, body: InventoryUpdateBody) => {
    const duplicate = await prisma.inventory.findFirst({
      where: {
        materialId: {
          equals: body.materialId,
        },
        locationId: {
          equals: body.locationId,
        },
      },
    });
    if (duplicate) {
      throw Error(
        `Inventory with the materialId and locationId already exists`
      );
    }
    const inventory = await prisma.inventory.findFirst({
      where: { id: Number(param.id) },
    });
    if (!inventory) throw Error(`Inventory with id ${param.id} not found!`);

    const result = await prisma.inventory.update({
      where: { id: Number(param.id) },
      data: body,
    });
    return result;
  };

  get = async (query: InventoryGetQuery) => {
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);
    const skip = (page - 1) * perPage;
    const where: Prisma.InventoryWhereInput = {
      materialId:
        query.materialId != null
          ? {
              equals: Number(query.materialId),
            }
          : undefined,
      locationId:
        query.locationId != null
          ? {
              equals: Number(query.locationId),
            }
          : undefined,
    };

    const [items, total] = await Promise.all([
      prisma.inventory.findMany({
        where: where,
        skip: skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          material: parseBoolean(query.material),
          location: parseBoolean(query.location),
        },
      }),
      prisma.inventory.count({ where: where }),
    ]);

    return {
      page: page,
      perPage: perPage,
      total: total,
      items: items,
    };
  };

  getById = async (param: InventoryGetByIdParam) => {
    const inventory = await prisma.inventory.findFirst({
      where: { id: Number(param.id) },
      include: {
        material: true,
        location: true,
      },
    });
    if (!inventory) throw Error(`Inventory with id ${param.id} not found!`);
    return inventory;
  };
}
