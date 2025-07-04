import { inject, injectable } from "tsyringe";
import InventoryService from "./inventory.service";
import { Request, Response } from "express";
import {
  InventoryCreateBody,
  InventoryGetByIdParam,
  InventoryGetQuery,
  InventoryUpdateBody,
  InventoryUpdateParam,
} from "./inventory.validation";
import ApiResponse from "../../shared/api.response";

@injectable()
export default class InventoryController {
  private service: InventoryService;

  constructor(@inject(InventoryService) service: InventoryService) {
    this.service = service;
  }

  create = async (req: Request<{}, {}, InventoryCreateBody>, res: Response) => {
    const result = await this.service.create(req.body);
    return ApiResponse.success(res, {
      data: result,
      code: 201,
    });
  };

  update = async (
    req: Request<InventoryUpdateParam, {}, InventoryUpdateBody>,
    res: Response
  ) => {
    const result = await this.service.update(req.params, req.body);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  get = async (req: Request<{}, {}, {}, InventoryGetQuery>, res: Response) => {
    const result = await this.service.get(req.query);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  getById = async (req: Request<InventoryGetByIdParam>, res: Response) => {
    const result = await this.service.getById(req.params);
    return ApiResponse.success(res, { data: result });
  };
}
