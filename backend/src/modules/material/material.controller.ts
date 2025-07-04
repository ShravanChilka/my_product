import { inject, injectable } from "tsyringe";
import MaterialService from "./material.service";
import { Request, Response } from "express";
import {
  MaterialCreateBody,
  MaterialGetByIdParam,
  MaterialGetQuery,
  MaterialUpdateBody,
  MaterialUpdateParam,
} from "./material.validation";
import ApiResponse from "../../shared/api.response";

@injectable()
export default class MaterialController {
  private service: MaterialService;

  constructor(@inject(MaterialService) service: MaterialService) {
    this.service = service;
  }

  create = async (req: Request<{}, {}, MaterialCreateBody>, res: Response) => {
    const result = await this.service.create(req.body);
    return ApiResponse.success(res, {
      data: result,
      code: 201,
    });
  };

  update = async (
    req: Request<MaterialUpdateParam, {}, MaterialUpdateBody>,
    res: Response
  ) => {
    const result = await this.service.update(req.params, req.body);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  get = async (req: Request<{}, {}, {}, MaterialGetQuery>, res: Response) => {
    const result = await this.service.get(req.query);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  getById = async (req: Request<MaterialGetByIdParam>, res: Response) => {
    const result = await this.service.getById(req.params);
    return ApiResponse.success(res, { data: result });
  };
}
