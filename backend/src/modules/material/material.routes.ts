import { inject, injectable } from "tsyringe";
import BaseRoute from "../../base/base.route";
import { Router } from "express";
import MaterialController from "./material.controller";
import { validateRequest } from "../../middlewares/validation.middleware";
import MaterialValidation from "./material.validation";

@injectable()
export default class MaterialRoutes implements BaseRoute {
  public router: Router;
  private controller: MaterialController;

  constructor(@inject(MaterialController) controller: MaterialController) {
    this.router = Router();
    this.controller = controller;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/",
      validateRequest({
        body: MaterialValidation.createBody,
      }),
      this.controller.create
    );
    this.router.patch(
      "/:id",
      validateRequest({
        params: MaterialValidation.updateParam,
        body: MaterialValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.put(
      "/:id",
      validateRequest({
        params: MaterialValidation.updateParam,
        body: MaterialValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.get(
      "/:id",
      validateRequest({ params: MaterialValidation.getByIdParam }),
      this.controller.getById
    );
    this.router.get(
      "/",
      validateRequest({ query: MaterialValidation.getQuery }),
      this.controller.get
    );
  }
}
