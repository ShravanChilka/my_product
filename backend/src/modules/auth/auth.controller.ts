import AuthService from "./auth.service";
import { Request, Response, NextFunction } from "express";
import { AuthLoginBody, AuthRegisterBody } from "./auth.validation";
import ApiResponse from "../../shared/api.response";
import { inject, injectable } from "tsyringe";

@injectable()
export default class AuthController {
  private service: AuthService;

  constructor(@inject(AuthService) service: AuthService) {
    this.service = service;
  }

  login = async (
    req: Request<{}, {}, AuthLoginBody, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await this.service.login(req.body);
    return ApiResponse.success(res, {
      data: result,
      message: "Login Success",
    });
  };

  register = async (
    req: Request<{}, {}, AuthRegisterBody, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const result = await this.service.register(req.body);
    return ApiResponse.success(res, {
      data: result,
      message: "Register Success",
    });
  };
}
