import { inject, injectable } from "tsyringe";
import BaseRoute from "../../base/base.route";
import { Router } from "express";
import CategoryController from "./category.controller";
import { validateRequest } from "../../middlewares/validation.middleware";
import CategoryValidation from "./category.validation";

@injectable()
export default class CategoryRoutes implements BaseRoute {
  public router: Router;
  private controller: CategoryController;

  constructor(@inject(CategoryController) controller: CategoryController) {
    this.router = Router();
    this.controller = controller;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/",
      validateRequest({
        body: CategoryValidation.createBody,
      }),
      this.controller.create
    );
    this.router.patch(
      "/:id",
      validateRequest({
        params: CategoryValidation.updateParam,
        body: CategoryValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.put(
      "/:id",
      validateRequest({
        params: CategoryValidation.updateParam,
        body: CategoryValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.get(
      "/:id",
      validateRequest({ params: CategoryValidation.getByIdParam }),
      this.controller.getById
    );
    this.router.get(
      "/",
      validateRequest({ query: CategoryValidation.getQuery }),
      this.controller.get
    );
  }
}
