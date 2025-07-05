import { inject, injectable } from "tsyringe";
import PackageTypeService from "./package_type.service";
import { Request, Response } from "express";
import {
  PackageTypeCreateBody,
  PackageTypeGetByIdParam,
  PackageTypeGetQuery,
  PackageTypeUpdateBody,
  PackageTypeUpdateParam,
} from "./package_type.validation";
import ApiResponse from "../../shared/api.response";

@injectable()
export default class PackageTypeController {
  private service: PackageTypeService;

  constructor(@inject(PackageTypeService) service: PackageTypeService) {
    this.service = service;
  }

  create = async (
    req: Request<{}, {}, PackageTypeCreateBody>,
    res: Response
  ) => {
    const result = await this.service.create(req.body);
    return ApiResponse.success(res, {
      data: result,
      code: 201,
    });
  };

  update = async (
    req: Request<PackageTypeUpdateParam, {}, PackageTypeUpdateBody>,
    res: Response
  ) => {
    const result = await this.service.update(req.params, req.body);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  get = async (
    req: Request<{}, {}, {}, PackageTypeGetQuery>,
    res: Response
  ) => {
    const result = await this.service.get(req.query);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  getById = async (req: Request<PackageTypeGetByIdParam>, res: Response) => {
    const result = await this.service.getById(req.params);
    return ApiResponse.success(res, { data: result });
  };
}
