import { inject, injectable } from "tsyringe";
import BaseRoute from "../../base/base.route";
import { Router } from "express";
import UnitTypeController from "./unit_type.controller";
import { validateRequest } from "../../middlewares/validation.middleware";
import UnitTypeValidation from "./unit_type.validation";

@injectable()
export default class UnitTypeRoutes implements BaseRoute {
  public router: Router;
  private controller: UnitTypeController;

  constructor(@inject(UnitTypeController) controller: UnitTypeController) {
    this.router = Router();
    this.controller = controller;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/",
      validateRequest({
        body: UnitTypeValidation.createBody,
      }),
      this.controller.create
    );
    this.router.patch(
      "/:id",
      validateRequest({
        params: UnitTypeValidation.updateParam,
        body: UnitTypeValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.put(
      "/:id",
      validateRequest({
        params: UnitTypeValidation.updateParam,
        body: UnitTypeValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.get(
      "/:id",
      validateRequest({ params: UnitTypeValidation.getByIdParam }),
      this.controller.getById
    );
    this.router.get(
      "/",
      validateRequest({ query: UnitTypeValidation.getQuery }),
      this.controller.get
    );
  }
}
