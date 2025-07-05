import { inject, injectable } from "tsyringe";
import PackageSizeService from "./package_size.service";
import { Request, Response } from "express";
import {
  PackageSizeCreateBody,
  PackageSizeGetByIdParam,
  PackageSizeGetQuery,
  PackageSizeUpdateBody,
  PackageSizeUpdateParam,
} from "./package_size.validation";
import ApiResponse from "../../shared/api.response";

@injectable()
export default class PackageSizeController {
  private service: PackageSizeService;

  constructor(@inject(PackageSizeService) service: PackageSizeService) {
    this.service = service;
  }

  create = async (
    req: Request<{}, {}, PackageSizeCreateBody>,
    res: Response
  ) => {
    const result = await this.service.create(req.body);
    return ApiResponse.success(res, {
      data: result,
      code: 201,
    });
  };

  update = async (
    req: Request<PackageSizeUpdateParam, {}, PackageSizeUpdateBody>,
    res: Response
  ) => {
    const result = await this.service.update(req.params, req.body);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  get = async (
    req: Request<{}, {}, {}, PackageSizeGetQuery>,
    res: Response
  ) => {
    const result = await this.service.get(req.query);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  getById = async (req: Request<PackageSizeGetByIdParam>, res: Response) => {
    const result = await this.service.getById(req.params);
    return ApiResponse.success(res, { data: result });
  };
}
