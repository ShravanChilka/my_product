import { inject, injectable } from "tsyringe";
import BrandService from "./brand.service";
import { Request, Response } from "express";
import {
  BrandCreateBody,
  BrandGetByIdParam,
  BrandGetQuery,
  BrandUpdateBody,
  BrandUpdateParam,
} from "./brand.validation";
import ApiResponse from "../../shared/api.response";

@injectable()
export default class BrandController {
  private service: BrandService;

  constructor(@inject(BrandService) service: BrandService) {
    this.service = service;
  }

  create = async (req: Request<{}, {}, BrandCreateBody>, res: Response) => {
    const result = await this.service.create(req.body);
    return ApiResponse.success(res, {
      data: result,
      code: 201,
    });
  };

  update = async (
    req: Request<BrandUpdateParam, {}, BrandUpdateBody>,
    res: Response
  ) => {
    const result = await this.service.update(req.params, req.body);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  get = async (req: Request<{}, {}, {}, BrandGetQuery>, res: Response) => {
    const result = await this.service.get(req.query);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  getById = async (req: Request<BrandGetByIdParam>, res: Response) => {
    const result = await this.service.getById(req.params);
    return ApiResponse.success(res, { data: result });
  };
}
