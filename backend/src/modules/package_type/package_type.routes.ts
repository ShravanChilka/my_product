import { inject, injectable } from "tsyringe";
import BaseRoute from "../../base/base.route";
import { Router } from "express";
import PackageTypeController from "./package_type.controller";
import { validateRequest } from "../../middlewares/validation.middleware";
import PackageTypeValidation from "./package_type.validation";

@injectable()
export default class PackageTypeRoutes implements BaseRoute {
  public router: Router;
  private controller: PackageTypeController;

  constructor(
    @inject(PackageTypeController) controller: PackageTypeController
  ) {
    this.router = Router();
    this.controller = controller;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/",
      validateRequest({
        body: PackageTypeValidation.createBody,
      }),
      this.controller.create
    );
    this.router.patch(
      "/:id",
      validateRequest({
        params: PackageTypeValidation.updateParam,
        body: PackageTypeValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.put(
      "/:id",
      validateRequest({
        params: PackageTypeValidation.updateParam,
        body: PackageTypeValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.get(
      "/:id",
      validateRequest({ params: PackageTypeValidation.getByIdParam }),
      this.controller.getById
    );
    this.router.get(
      "/",
      validateRequest({ query: PackageTypeValidation.getQuery }),
      this.controller.get
    );
  }
}
