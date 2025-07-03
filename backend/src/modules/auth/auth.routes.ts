import AuthController from "./auth.controller";
import { Router } from "express";
import { validateRequest } from "../../middlewares/validation.middleware";
import AuthValidation from "./auth.validation";
import BaseRoute from "../../base/base.route";
import { inject, singleton } from "tsyringe";

@singleton()
export default class AuthRoutes implements BaseRoute {
  private controller: AuthController;
  public router: Router;

  constructor(@inject(AuthController) controller: AuthController) {
    this.controller = controller;
    this.router = Router();
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/login",
      validateRequest({
        body: AuthValidation.loginBody,
      }),
      this.controller.login
    );
    this.router.post(
      "/register",
      validateRequest({ body: AuthValidation.registerBody }),
      this.controller.register
    );
  }
}
