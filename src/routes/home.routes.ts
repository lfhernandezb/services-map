import { Router } from "express";
import { Request, Response } from "express";
import { apiDep, backEndApi, backEndHost, dbDep, frontEndHost, populateServicesMapDB, welcome } from "../controllers/home.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", welcome);
    this.router.get("/fehost", frontEndHost);
    this.router.get("/behost", backEndHost);
    this.router.get("/beapi", backEndApi);
    this.router.get("/apidep", apiDep);
    this.router.get("/dbdep", dbDep);
    this.router.get("/doall", populateServicesMapDB);
  }
}

export default new HomeRoutes().router;
