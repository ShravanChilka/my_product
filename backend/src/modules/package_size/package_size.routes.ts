import { inject, injectable } from "tsyringe";
import BaseRoute from "../../base/base.route";
import { Router } from "express";
import PackageSizeController from "./package_size.controller";
import { validateRequest } from "../../middlewares/validation.middleware";
import PackageSizeValidation from "./package_size.validation";

@injectable()
export default class PackageSizeRoutes implements BaseRoute {
  public router: Router;
  private controller: PackageSizeController;

  constructor(
    @inject(PackageSizeController) controller: PackageSizeController
  ) {
    this.router = Router();
    this.controller = controller;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/",
      validateRequest({
        body: PackageSizeValidation.createBody,
      }),
      this.controller.create
    );
    this.router.patch(
      "/:id",
      validateRequest({
        params: PackageSizeValidation.updateParam,
        body: PackageSizeValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.put(
      "/:id",
      validateRequest({
        params: PackageSizeValidation.updateParam,
        body: PackageSizeValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.get(
      "/:id",
      validateRequest({ params: PackageSizeValidation.getByIdParam }),
      this.controller.getById
    );
    this.router.get(
      "/",
      validateRequest({ query: PackageSizeValidation.getQuery }),
      this.controller.get
    );
  }
}
