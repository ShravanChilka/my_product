import { Router } from "express";
import UnitOfMeasureController from "./unit_of_measure.controller";
import { inject, injectable } from "tsyringe";
import BaseRoute from "../../base/base.route";
import { validateRequest } from "../../middlewares/validation.middleware";
import UnitOfMeasureValidation from "./unit_of_measure.validation";

@injectable()
export default class UnitOfMeasureRoutes implements BaseRoute {
  public router: Router;
  private controller: UnitOfMeasureController;

  constructor(
    @inject(UnitOfMeasureController) controller: UnitOfMeasureController
  ) {
    this.router = Router();
    this.controller = controller;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/",
      validateRequest({
        body: UnitOfMeasureValidation.createBody,
      }),
      this.controller.create
    );
    this.router.patch(
      "/:id",
      validateRequest({
        params: UnitOfMeasureValidation.updateParam,
        body: UnitOfMeasureValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.put(
      "/:id",
      validateRequest({
        params: UnitOfMeasureValidation.updateParam,
        body: UnitOfMeasureValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.get(
      "/:id",
      validateRequest({ params: UnitOfMeasureValidation.getByIdParam }),
      this.controller.getById
    );
    this.router.get(
      "/",
      validateRequest({ query: UnitOfMeasureValidation.getQuery }),
      this.controller.get
    );
  }
}
