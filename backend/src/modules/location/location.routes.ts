import { Router } from "express";
import { inject, injectable } from "tsyringe";
import BaseRoute from "../../base/base.route";
import LocationController from "./location.controller";
import { validateRequest } from "../../middlewares/validation.middleware";
import LocationValidation from "./location.validation";

@injectable()
export default class LocationRoutes implements BaseRoute {
  public router: Router;
  private controller: LocationController;

  constructor(@inject(LocationController) controller: LocationController) {
    this.router = Router();
    this.controller = controller;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/",
      validateRequest({
        body: LocationValidation.createBody,
      }),
      this.controller.create
    );
    this.router.patch(
      "/:id",
      validateRequest({
        params: LocationValidation.updateParam,
        body: LocationValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.put(
      "/:id",
      validateRequest({
        params: LocationValidation.updateParam,
        body: LocationValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.get(
      "/:id",
      validateRequest({ params: LocationValidation.getByIdParam }),
      this.controller.getById
    );
    this.router.get(
      "/",
      validateRequest({ query: LocationValidation.getQuery }),
      this.controller.get
    );
  }
}
