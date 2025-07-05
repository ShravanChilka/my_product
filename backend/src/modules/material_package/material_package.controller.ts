import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import MaterialPackageService from "./material_package.service";
import {
  MaterialPackageCreateBody,
  MaterialPackageGetByIdParam,
  MaterialPackageGetQuery,
  MaterialPackageUpdateBody,
  MaterialPackageUpdateParam,
} from "./material_package.validation";
import ApiResponse from "../../shared/api.response";

@injectable()
export default class MaterialPackageController {
  private service: MaterialPackageService;

  constructor(@inject(MaterialPackageService) service: MaterialPackageService) {
    this.service = service;
  }

  create = async (
    req: Request<{}, {}, MaterialPackageCreateBody>,
    res: Response
  ) => {
    const result = await this.service.create(req.body);
    return ApiResponse.success(res, {
      data: result,
      code: 201,
    });
  };

  update = async (
    req: Request<MaterialPackageUpdateParam, {}, MaterialPackageUpdateBody>,
    res: Response
  ) => {
    const result = await this.service.update(req.params, req.body);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  get = async (
    req: Request<{}, {}, {}, MaterialPackageGetQuery>,
    res: Response
  ) => {
    const result = await this.service.get(req.query);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  getById = async (
    req: Request<MaterialPackageGetByIdParam>,
    res: Response
  ) => {
    const result = await this.service.getById(req.params);
    return ApiResponse.success(res, { data: result });
  };
}
