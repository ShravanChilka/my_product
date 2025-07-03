import express, { Application, Router } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import UserService from "./modules/user/user.service";
import AuthRoutes from "./modules/auth/auth.routes";
import AuthController from "./modules/auth/auth.controller";
import AuthService from "./modules/auth/auth.service";

class App {
  private application: Application;

  constructor() {
    this.application = express();

    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares() {
    this.application.use(helmet());
    this.application.use(cors());
    this.application.use(morgan("dev"));
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
  }

  private initRoutes() {
    const authRoutes = new AuthRoutes(
      new AuthController(new AuthService(new UserService())),
      Router()
    );
    this.application.use("/api", authRoutes.router);
  }

  public listen(port: number): void {
    this.application.listen(port, () => {
      console.log(`Application listening on port ${port}`);
    });
  }
}

export default App;
