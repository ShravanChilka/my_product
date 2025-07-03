import { Router } from "express";
import BrandController from "./brand.controller";
import { inject, injectable } from "tsyringe";
import BaseRoute from "../../base/base.route";
import { validateRequest } from "../../middlewares/validation.middleware";
import BrandValidation from "./brand.validation";

@injectable()
export default class BrandRoutes implements BaseRoute {
  public router: Router;
  private controller: BrandController;

  constructor(@inject(BrandController) controller: BrandController) {
    this.router = Router();
    this.controller = controller;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/",
      validateRequest({
        body: BrandValidation.createBody,
      }),
      this.controller.create
    );
    this.router.patch(
      "/:id",
      validateRequest({
        params: BrandValidation.updateParam,
        body: BrandValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.put(
      "/:id",
      validateRequest({
        params: BrandValidation.updateParam,
        body: BrandValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.get(
      "/:id",
      validateRequest({ params: BrandValidation.getByIdParam }),
      this.controller.getById
    );
    this.router.get(
      "/",
      validateRequest({ query: BrandValidation.getQuery }),
      this.controller.get
    );
  }
}
