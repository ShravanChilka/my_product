import { inject, injectable } from "tsyringe";
import BaseRoute from "../../base/base.route";
import { Router } from "express";
import InventoryController from "./inventory.controller";
import { validateRequest } from "../../middlewares/validation.middleware";
import InventoryValidation from "./inventory.validation";

@injectable()
export default class InventoryRoutes implements BaseRoute {
  public router: Router;
  private controller: InventoryController;

  constructor(@inject(InventoryController) controller: InventoryController) {
    this.router = Router();
    this.controller = controller;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/",
      validateRequest({
        body: InventoryValidation.createBody,
      }),
      this.controller.create
    );
    this.router.patch(
      "/:id",
      validateRequest({
        params: InventoryValidation.updateParam,
        body: InventoryValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.put(
      "/:id",
      validateRequest({
        params: InventoryValidation.updateParam,
        body: InventoryValidation.updateBody,
      }),
      this.controller.update
    );
    this.router.get(
      "/:id",
      validateRequest({ params: InventoryValidation.getByIdParam }),
      this.controller.getById
    );
    this.router.get(
      "/",
      validateRequest({ query: InventoryValidation.getQuery }),
      this.controller.get
    );
  }
}
