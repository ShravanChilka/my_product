import { Router } from "express";
import { inject, injectable } from "tsyringe";
import BaseRoute from "../../base/base.route";
import MaterialPackageController from "./material_package.controller";
import { validateRequest } from "../../middlewares/validation.middleware";
import MaterialPackageValidation from "./material_package.validation";

@injectable()
export default class MaterialPackageRoutes implements BaseRoute {
  public router: Router;
  private controller: MaterialPackageController;

  constructor(
    @inject(MaterialPackageController) controller: MaterialPackageController
  ) {
    this.router = Router();
    this.controller = controller;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/",
      validateRequest({
        body: MaterialPackageValidation.createBody,
      }),
      this.controller.create
    );
    this.router.patch(
      "/:id",
      validateRequest({
        params: MaterialPackageValidation.updateParam,
        body: MaterialPackageValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.put(
      "/:id",
      validateRequest({
        params: MaterialPackageValidation.updateParam,
        body: MaterialPackageValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.get(
      "/:id",
      validateRequest({ params: MaterialPackageValidation.getByIdParam }),
      this.controller.getById
    );
    this.router.get(
      "/",
      validateRequest({ query: MaterialPackageValidation.getQuery }),
      this.controller.get
    );
  }
}
