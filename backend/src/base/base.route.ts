import { Router } from "express";

export default interface BaseRoute {
  router: Router;

  createRoutes(): void;
}
