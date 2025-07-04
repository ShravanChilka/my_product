import { inject, injectable } from "tsyringe";
import MaterialBrandService from "./material_brand.service";
import { Request, Response } from "express";
import {
  MaterialBrandCreateBody,
  MaterialBrandGetByIdParam,
  MaterialBrandGetQuery,
  MaterialBrandUpdateBody,
  MaterialBrandUpdateParam,
} from "./material_brand.validation";
import ApiResponse from "../../shared/api.response";

@injectable()
export default class MaterialBrandController {
  private service: MaterialBrandService;

  constructor(@inject(MaterialBrandService) service: MaterialBrandService) {
    this.service = service;
  }

  create = async (
    req: Request<{}, {}, MaterialBrandCreateBody>,
    res: Response
  ) => {
    const result = await this.service.create(req.body);
    return ApiResponse.success(res, {
      data: result,
      code: 201,
    });
  };

  update = async (
    req: Request<MaterialBrandUpdateParam, {}, MaterialBrandUpdateBody>,
    res: Response
  ) => {
    const result = await this.service.update(req.params, req.body);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  get = async (
    req: Request<{}, {}, {}, MaterialBrandGetQuery>,
    res: Response
  ) => {
    const result = await this.service.get(req.query);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  getById = async (req: Request<MaterialBrandGetByIdParam>, res: Response) => {
    const result = await this.service.getById(req.params);
    return ApiResponse.success(res, { data: result });
  };
}
