import { Request, RequestHandler, Response } from "express";
import { FrontendServiceHost } from "../services/elasticsearch/frontend-service-host.service";
import { BackendServiceHost } from "../services/elasticsearch/backend-service-host.service";
import { BackendApi } from "../services/elasticsearch/backend-api.service";
import { ApiDependency } from "../services/elasticsearch/api-dependency.service";
import { DBDependency } from "../services/elasticsearch/db-dependency.service";
import { fillServicesMapDB } from "../services/fill-services.map-db.service";

export const welcome: RequestHandler = (req: Request, res: Response) => {
    res.send("Welcome to the home page!");
};

export const frontEndHost: RequestHandler = (req: Request, res: Response) => {
  FrontendServiceHost();
  res.send("ok");
};

export const backEndHost: RequestHandler = (req: Request, res: Response) => {
  BackendServiceHost();
  res.send("ok");
};

export const apiDep: RequestHandler = (req: Request, res: Response) => {
  ApiDependency();
  res.send("ok");
};

export const backEndApi: RequestHandler = (req: Request, res: Response) => {
  BackendApi();
  res.send("ok");
};

export const dbDep: RequestHandler = (req: Request, res: Response) => {
  DBDependency();
  res.send("ok");
};

export const populateServicesMapDB: RequestHandler = (req: Request, res: Response) => {
  fillServicesMapDB();
  res.send("ok");
};
