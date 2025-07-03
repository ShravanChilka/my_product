import { inject, injectable } from "tsyringe";
import UserService from "../user/user.service";
import { AuthLoginBody, AuthRegisterBody } from "./auth.validation";
import jwt from "jsonwebtoken";

@injectable()
export default class AuthService {
  private service: UserService;

  constructor(@inject(UserService) service: UserService) {
    this.service = service;
  }

  login = async (data: AuthLoginBody) => {
    const user = await this.service.getUserByEmailPassword(data);
    const token = jwt.sign(data, process.env.JWT_SECRET ?? "", {
      expiresIn: "1d",
    });
    return {
      token,
      user,
    };
  };

  register = async (data: AuthRegisterBody) => {
    const user = await this.service.createUser(data);
    return user;
  };
}
