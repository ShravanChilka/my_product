import { Router } from "express";
import MaterialBrandController from "./material_brand.controller";
import { inject, injectable } from "tsyringe";
import BaseRoute from "../../base/base.route";
import { validateRequest } from "../../middlewares/validation.middleware";
import MaterialBrandValidation from "./material_brand.validation";

@injectable()
export default class MaterialBrandRoutes implements BaseRoute {
  public router: Router;
  private controller: MaterialBrandController;

  constructor(
    @inject(MaterialBrandController) controller: MaterialBrandController
  ) {
    this.router = Router();
    this.controller = controller;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/",
      validateRequest({
        body: MaterialBrandValidation.createBody,
      }),
      this.controller.create
    );
    this.router.patch(
      "/:id",
      validateRequest({
        params: MaterialBrandValidation.updateParam,
        body: MaterialBrandValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.put(
      "/:id",
      validateRequest({
        params: MaterialBrandValidation.updateParam,
        body: MaterialBrandValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.get(
      "/:id",
      validateRequest({ params: MaterialBrandValidation.getByIdParam }),
      this.controller.getById
    );
    this.router.get(
      "/",
      validateRequest({ query: MaterialBrandValidation.getQuery }),
      this.controller.get
    );
  }
}
