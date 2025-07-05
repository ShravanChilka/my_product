import { inject, injectable } from "tsyringe";
import UnitOfMeasureService from "./unit_of_measure.service";
import { Request, Response } from "express";
import {
  UnitOfMeasureCreateBody,
  UnitOfMeasureGetByIdParam,
  UnitOfMeasureGetQuery,
  UnitOfMeasureUpdateBody,
  UnitOfMeasureUpdateParam,
} from "./unit_of_measure.validation";
import ApiResponse from "../../shared/api.response";

@injectable()
export default class UnitOfMeasureController {
  private service: UnitOfMeasureService;

  constructor(@inject(UnitOfMeasureService) service: UnitOfMeasureService) {
    this.service = service;
  }

  create = async (
    req: Request<{}, {}, UnitOfMeasureCreateBody>,
    res: Response
  ) => {
    const result = await this.service.create(req.body);
    return ApiResponse.success(res, {
      data: result,
      code: 201,
    });
  };

  update = async (
    req: Request<UnitOfMeasureUpdateParam, {}, UnitOfMeasureUpdateBody>,
    res: Response
  ) => {
    const result = await this.service.update(req.params, req.body);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  get = async (
    req: Request<{}, {}, {}, UnitOfMeasureGetQuery>,
    res: Response
  ) => {
    const result = await this.service.get(req.query);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  getById = async (req: Request<UnitOfMeasureGetByIdParam>, res: Response) => {
    const result = await this.service.getById(req.params);
    return ApiResponse.success(res, { data: result });
  };
}
