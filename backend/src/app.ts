import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import AuthRoutes from "./modules/auth/auth.routes";
import { handleError } from "./middlewares/error.middleware";
import { container } from "tsyringe";
import BrandRoutes from "./modules/brand/brand.routes";
import CategoryRoutes from "./modules/category/category.routes";

class App {
  private application: Application;

  constructor() {
    this.application = express();

    this.initMiddlewares();
    this.initRoutes();
    this.handleError();
  }

  private initMiddlewares() {
    this.application.use(helmet());
    this.application.use(cors());
    this.application.use(morgan("dev"));
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
  }

  private initRoutes() {
    this.application.use("/api", container.resolve(AuthRoutes).router);
    this.application.use("/api/brand", container.resolve(BrandRoutes).router);
    this.application.use(
      "/api/category",
      container.resolve(CategoryRoutes).router
    );
  }

  private handleError() {
    this.application.use(handleError);
  }

  public listen(port: number): void {
    this.application.listen(port, () => {
      console.log(`Application listening on port ${port}`);
    });
  }
}

export default App;
