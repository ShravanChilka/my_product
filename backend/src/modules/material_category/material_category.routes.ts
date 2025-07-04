import { inject, injectable } from "tsyringe";
import BaseRoute from "../../base/base.route";
import { Router } from "express";
import MaterialCategoryController from "./material_category.controller";
import { validateRequest } from "../../middlewares/validation.middleware";
import MaterialCategoryValidation from "./material_category.validation";

@injectable()
export default class MaterialCategoryRoutes implements BaseRoute {
  public router: Router;
  private controller: MaterialCategoryController;

  constructor(
    @inject(MaterialCategoryController) controller: MaterialCategoryController
  ) {
    this.router = Router();
    this.controller = controller;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/",
      validateRequest({
        body: MaterialCategoryValidation.createBody,
      }),
      this.controller.create
    );
    this.router.patch(
      "/:id",
      validateRequest({
        params: MaterialCategoryValidation.updateParam,
        body: MaterialCategoryValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.put(
      "/:id",
      validateRequest({
        params: MaterialCategoryValidation.updateParam,
        body: MaterialCategoryValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.get(
      "/:id",
      validateRequest({ params: MaterialCategoryValidation.getByIdParam }),
      this.controller.getById
    );
    this.router.get(
      "/",
      validateRequest({ query: MaterialCategoryValidation.getQuery }),
      this.controller.get
    );
  }
}
