import { inject, injectable } from "tsyringe";
import LocationService from "./location.service";
import { Request, Response } from "express";
import {
  LocationCreateBody,
  LocationGetByIdParam,
  LocationGetQuery,
  LocationUpdateBody,
  LocationUpdateParam,
} from "./location.validation";
import ApiResponse from "../../shared/api.response";

@injectable()
export default class LocationController {
  private service: LocationService;

  constructor(@inject(LocationService) service: LocationService) {
    this.service = service;
  }

  create = async (req: Request<{}, {}, LocationCreateBody>, res: Response) => {
    const result = await this.service.create(req.body);
    return ApiResponse.success(res, {
      data: result,
      code: 201,
    });
  };

  update = async (
    req: Request<LocationUpdateParam, {}, LocationUpdateBody>,
    res: Response
  ) => {
    const result = await this.service.update(req.params, req.body);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  get = async (req: Request<{}, {}, {}, LocationGetQuery>, res: Response) => {
    const result = await this.service.get(req.query);
    return ApiResponse.success(res, {
      data: result,
    });
  };

  getById = async (req: Request<LocationGetByIdParam>, res: Response) => {
    const result = await this.service.getById(req.params);
    return ApiResponse.success(res, { data: result });
  };
}
