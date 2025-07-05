import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import AuthRoutes from "./modules/auth/auth.routes";
import { handleError } from "./middlewares/error.middleware";
import { container } from "tsyringe";
import MaterialBrandRoutes from "./modules/material_brand/material_brand.routes";
import MaterialCategoryRoutes from "./modules/material_category/material_category.routes";
import MaterialRoutes from "./modules/material/material.routes";
import LocationRoutes from "./modules/location/location.routes";
import InventoryRoutes from "./modules/inventory/inventory.routes";
import UnitOfMeasureRoutes from "./modules/unit_of_measure/unit_of_measure.routes";
import PackageTypeRoutes from "./modules/package_type/package_type.routes";
import PackageSizeRoutes from "./modules/package_size/package_size.routes";
import MaterialPackageRoutes from "./modules/material_package/material_package.routes";

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
    this.application.use(
      "/api/material_brand",
      container.resolve(MaterialBrandRoutes).router
    );
    this.application.use(
      "/api/material_category",
      container.resolve(MaterialCategoryRoutes).router
    );
    this.application.use(
      "/api/unit_of_measure",
      container.resolve(UnitOfMeasureRoutes).router
    );
    this.application.use(
      "/api/material",
      container.resolve(MaterialRoutes).router
    );
    this.application.use(
      "/api/location",
      container.resolve(LocationRoutes).router
    );
    this.application.use(
      "/api/package_type",
      container.resolve(PackageTypeRoutes).router
    );
    this.application.use(
      "/api/package_size",
      container.resolve(PackageSizeRoutes).router
    );
    this.application.use(
      "/api/material_package",
      container.resolve(MaterialPackageRoutes).router
    );
    this.application.use(
      "/api/inventory",
      container.resolve(InventoryRoutes).router
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
