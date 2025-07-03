import AuthService from "./auth.service";
import { Request, Response, NextFunction } from "express";
import { AuthLogin, AuthRegister } from "./auth.validation";
import ApiResponse from "../../shared/api.response";

class AuthController {
  private service: AuthService;

  constructor(service: AuthService) {
    console.log(service);
    this.service = service;
  }

  async login(
    req: Request<{}, {}, AuthLogin, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    const result = await this.service.login(req.body);
    return ApiResponse.success(res, {
      data: result,
      message: "Login Success",
    });
  }

  async register(
    req: Request<{}, {}, AuthRegister>,
    res: Response,
    next: NextFunction
  ) {
    const result = await this.service.register(req.body);
    return ApiResponse.success(res, {
      data: result,
      message: "Register Success",
    });
  }
}

export default AuthController;
