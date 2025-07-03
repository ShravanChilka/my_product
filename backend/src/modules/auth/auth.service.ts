import UserService from "../user/user.service";
import { inject, injectable } from "tsyringe";
import { AuthLogin, AuthRegister } from "./auth.validation";
import jwt from "jsonwebtoken";

class AuthService {
  private service: UserService;

  constructor(service: UserService) {
    console.log(service);
    this.service = service;
  }

  async login(data: AuthLogin) {
    const user = await this.service.getUserByEmailPassword(data);
    const token = jwt.sign(data, process.env.JWT_SECRET ?? "", {
      expiresIn: "1d",
    });
    return {
      token,
      user,
    };
  }

  async register(data: AuthRegister) {
    const user = await this.service.createUser(data);
    return user;
  }
}

export default AuthService;
