import { inject, injectable } from "tsyringe";
import CategoryService from "./category.service";
import { Request, Response } from "express";
import {
  CategoryCreateBody,
  CategoryGetByIdParam,
  CategoryGetQuery,
  CategoryUpdateBody,
  CategoryUpdateParam,
} from "./category.validation";
import ApiResponse from "../../shared/api.response";

@injectable()
export default class CategoryController {
  private service: CategoryService;

  constructor(@inject(CategoryService) service: CategoryService) {
    this.service = service;
  }

  create = async (req: Request<{}, {}, CategoryCreateBody>, res: Response) => {
    const result = await this.service.create(req.body);
    return ApiResponse.success(res, {
      data: result,
      code: 201,
    });
  };

  update = async (
    req: Request<CategoryUpdateParam, {}, CategoryUpdateBody>,
    res: Response
  ) => {
    const result = await this.service.update(req.params, req.body);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  get = async (req: Request<{}, {}, {}, CategoryGetQuery>, res: Response) => {
    const result = await this.service.get(req.query);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  getById = async (req: Request<CategoryGetByIdParam>, res: Response) => {
    const result = await this.service.getById(req.params);
    return ApiResponse.success(res, { data: result });
  };
}
