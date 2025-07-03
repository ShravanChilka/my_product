import AuthController from "./auth.controller";
import { Router } from "express";
import { validateRequest } from "../../middlewares/validation.middleware";
import { AuthLoginValidation, AuthRegisterValidation } from "./auth.validation";
import BaseRoute from "../../base/base.route";

class AuthRoutes implements BaseRoute {
  private controller: AuthController;
  public router: Router;

  constructor(controller: AuthController, router: Router) {
    this.controller = controller;
    this.router = router;
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.post(
      "/login",
      validateRequest({
        body: AuthLoginValidation.schema,
      }),
      this.controller.login
    );
    this.router.post(
      "/register",
      validateRequest({ body: AuthRegisterValidation.schema }),
      this.controller.register
    );
  }
}

export default AuthRoutes;
