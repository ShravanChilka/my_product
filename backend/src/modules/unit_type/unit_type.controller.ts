import { inject, injectable } from "tsyringe";
import UnitTypeService from "./unit_type.service";
import { Request, Response } from "express";
import {
  UnitTypeCreateBody,
  UnitTypeGetByIdParam,
  UnitTypeGetQuery,
  UnitTypeUpdateBody,
  UnitTypeUpdateParam,
} from "./unit_type.validation";
import ApiResponse from "../../shared/api.response";

@injectable()
export default class UnitTypeController {
  private service: UnitTypeService;

  constructor(@inject(UnitTypeService) service: UnitTypeService) {
    this.service = service;
  }

  create = async (req: Request<{}, {}, UnitTypeCreateBody>, res: Response) => {
    const result = await this.service.create(req.body);
    return ApiResponse.success(res, {
      data: result,
      code: 201,
    });
  };

  update = async (
    req: Request<UnitTypeUpdateParam, {}, UnitTypeUpdateBody>,
    res: Response
  ) => {
    const result = await this.service.update(req.params, req.body);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  get = async (req: Request<{}, {}, {}, UnitTypeGetQuery>, res: Response) => {
    const result = await this.service.get(req.query);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  getById = async (req: Request<UnitTypeGetByIdParam>, res: Response) => {
    const result = await this.service.getById(req.params);
    return ApiResponse.success(res, { data: result });
  };
}
