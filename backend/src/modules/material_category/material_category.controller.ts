import { inject, injectable } from "tsyringe";
import MaterialCategoryService from "./material_category.service";
import { Request, Response } from "express";
import {
  MaterialCategoryCreateBody,
  MaterialCategoryGetByIdParam,
  MaterialCategoryGetQuery,
  MaterialCategoryUpdateBody,
  MaterialCategoryUpdateParam,
} from "./material_category.validation";
import ApiResponse from "../../shared/api.response";

@injectable()
export default class MaterialCategoryController {
  private service: MaterialCategoryService;

  constructor(
    @inject(MaterialCategoryService) service: MaterialCategoryService
  ) {
    this.service = service;
  }

  create = async (
    req: Request<{}, {}, MaterialCategoryCreateBody>,
    res: Response
  ) => {
    const result = await this.service.create(req.body);
    return ApiResponse.success(res, {
      data: result,
      code: 201,
    });
  };

  update = async (
    req: Request<MaterialCategoryUpdateParam, {}, MaterialCategoryUpdateBody>,
    res: Response
  ) => {
    const result = await this.service.update(req.params, req.body);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  get = async (
    req: Request<{}, {}, {}, MaterialCategoryGetQuery>,
    res: Response
  ) => {
    const result = await this.service.get(req.query);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  getById = async (
    req: Request<MaterialCategoryGetByIdParam>,
    res: Response
  ) => {
    const result = await this.service.getById(req.params);
    return ApiResponse.success(res, { data: result });
  };
}
