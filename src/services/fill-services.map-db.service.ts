import { FrontendService } from "../db/models/frontend-service.model";
import { Host } from "../db/models/host.model";
import { Response as FEResponse } from "../models/fehost/response/response";
import { createBackendServiceHost, getBackendServiceHostByFks } from "./db/backend-service-host.service";
import { createFrontendService, getFrontendServiceByName } from "./db/frontend-service.service";
import { createHost, getHostByName } from "./db/host.service";
import { BackendServiceHost } from "./elasticsearch/backend-service-host.service";
import { BackendService } from "../db/models/backend-service.model";
import { Response as BEResponse } from "../models/behost/response/response";
import { createFrontendServiceHost, getFrontendServiceHostByFks } from "./db/frontend-service-host.service";
import { createBackendService, getBackendServiceById, getBackendServiceByName } from "./db/backend-service.service";
import { FrontendServiceHost } from "./elasticsearch/frontend-service-host.service";
import { BackendApi } from "./elasticsearch/backend-api.service";
import { Response as BEApiResponse } from "../models/beapi/response/response";
import { Response as DBDepResponse } from "../models/dbdep/response/response";
import { Response as ApiDepResponse } from "../models/apidep/response/response";
import { API } from "../db/models/api.model";
import { createAPI, getAPIByFields, getAPIsByPath, getBackendIdByPath } from "./db/api.service";
import { DBDependency } from "./elasticsearch/db-dependency.service";
import { createDBEngineType, getDBEngineTypeByDescription } from "./db/db-engine-type.service";
import { createDBEngine, getDBEngineByFields, getDBEngineById } from "./db/db-engine.service";
import { createDBSchema, getDBSchemaByFields } from "./db/db-schema.service";
import { ApiDependency } from "./elasticsearch/api-dependency.service";
import { APIConsumption } from "../db/models/api-consumption.model";
import { createAPIConsumption, getAPIConsumptionByFields } from "./db/api-consumption.service";

async function fillServicesMapDB() {


  // servicios frontend
  try {
    const httpResponse: any = await FrontendServiceHost();

    const response: FEResponse = httpResponse.data
    // console.log(data);

    if (response.aggregations && response.aggregations.service) {
      for (const service of response.aggregations.service.buckets) {
        console.log(service.key);
        // console.log(service.doc_count);
        let feservice: FrontendService | null = await getFrontendServiceByName(service.key);

        // puede aparecer un servicio backend que llama a otro backend; estos vienen sin hosts
        if (!feservice && service.host.buckets.length > 0) {
          feservice = await createFrontendService(service.key);
        } else {
          continue;
        }

        for(const host of service.host.buckets) {
          console.log("  " + host.key);
          // console.log(host.doc_count);
          let host1: Host | null = await getHostByName(host.key);

          if (!host1) {
            host1 = await createHost(host.key, host.key, "type");
          }

          let feserviceHost = await getFrontendServiceHostByFks(host1.id, feservice.id);

          if (!feserviceHost) {
            feserviceHost = await createFrontendServiceHost(host1.id, feservice.id);
          }

        };
      };
    } else {
      console.error("Unexpected response structure:", response);
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    // throw new Error(error.message);
  }

  // servicios backend
  try {
    const httpResponse: any = await BackendServiceHost();

    const response: BEResponse = httpResponse.data
    // console.log(data);

    if (response.aggregations && response.aggregations.service) {
      for (const service of response.aggregations.service.buckets) {
        console.log(service.key);
        // console.log(service.doc_count);
        let beservice: BackendService | null = await getBackendServiceByName(service.key);

        if (!beservice) {
          beservice = await createBackendService(service.key);
        }

        for (const host of service.host.buckets) {
          console.log("  " + host.key);
          // console.log(host.doc_count);
          let host1: Host | null = await getHostByName(host.key);

          if (!host1) {
            host1 = await createHost(host.key, host.key, "type");
          }

          let beserviceHost = await getBackendServiceHostByFks(host1.id, beservice.id);

          if (!beserviceHost) {
            beserviceHost = await createBackendServiceHost(host1.id, beservice.id);
          }

        };
      };
    } else {
      console.error("Unexpected response structure:", response);
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    // throw new Error(error.message);
  }

  // apis publicadas por los backends
  try {
    const httpResponse: any = await BackendApi();

    const response: BEApiResponse = httpResponse.data
    // console.log(data);

    if (response.aggregations && response.aggregations.service) {
      for (const service of response.aggregations.service.buckets) {
        console.log(service.key);
        // console.log(service.doc_count);
        let beservice: BackendService | null = await getBackendServiceByName(service.key);

        if (!beservice) {
          beservice = await createBackendService(service.key);
        }

        for (const method of service.method.buckets) {
          console.log("  " + method.key);

          console.log(method);

          for (const path of method.path.buckets) {
            console.log("    " + path.key)

            let api = await getAPIByFields(method.key, path.key, beservice.id);

            if (!api) {
              api = await createAPI("x", method.key as 'GET' | 'POST' | 'PUT' | 'DELETE', path.key, beservice.id);
            }
          };

        };
      };
    } else {
      console.error("Unexpected response structure:", response);
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    // throw new Error(error.message);
  }

  // dependencias backend - base de datos
  try {
    const httpResponse: any = await DBDependency();

    const response: DBDepResponse = httpResponse.data
    // console.log(data);

    if (response.aggregations && response.aggregations.service) {
      for (const service of response.aggregations.service.buckets) {
        console.log(service.key);
        // console.log(service.doc_count);
        let beservice: BackendService | null = await getBackendServiceByName(service.key);

        if (!beservice) {
          beservice = await createBackendService(service.key);
        }

        for (const engineType of service.engine_type.buckets) {
          console.log("  " + engineType.key);

          let dbEngineType = await getDBEngineTypeByDescription(engineType.key);

          if (!dbEngineType) {
            dbEngineType = await createDBEngineType(engineType.key);
          }

          // console.log(engineType);

          for (const host of engineType.host.buckets) {
            console.log("    " + host.key);

            let host1: Host | null = await getHostByName(host.key);

            if (!host1) {
              host1 = await createHost(host.key, host.key, "type");
            }

            let dbEngine = await getDBEngineByFields(host1.id, dbEngineType.id);

            if (!dbEngine) {
              dbEngine = await createDBEngine("x", host1.id, dbEngineType.id);
            }

            for (const instance of host.instance.buckets) {
              console.log("      " + instance.key);

              let dbSchema = await getDBSchemaByFields(instance.key, dbEngine.id);

              if (!dbSchema) {
                dbSchema = await createDBSchema(instance.key, dbEngine.id);
              }

            };

          };

        };
      };
    } else {
      console.error("Unexpected response structure:", response);
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    // throw new Error(error.message);
  }

  // consumo de APIs - dependencias
  try {
    const httpResponse: any = await ApiDependency();

    const response: ApiDepResponse = httpResponse.data
    // console.log(data);

    if (response.aggregations && response.aggregations.service) {
      for (const service of response.aggregations.service.buckets) {
        console.log(service.key);
        // console.log(service.doc_count);

        let consumerServiceId: number = 0;
        let consumerType: string = "";

        // in service.key we have the consumer service name... it could be frontend or backend... we look for its code:
        const frontendService: FrontendService | null = await getFrontendServiceByName(service.key);

        if (!frontendService) {
          console.log("Service not foud as frontend: " + service.key);

          // backend?
          const backendService: BackendService | null = await getBackendServiceByName(service.key);

          if (!backendService) {
            console.log("Service not foud as backend: " + service.key);

            continue;
          } else {
            consumerServiceId = backendService.id;
            consumerType = "backend";
          }
        } else {
          consumerServiceId = frontendService.id;
          consumerType = "frontend";
        }

        for (const method of service.method.buckets) {
          console.log("  " + method.key);

          for (const call of method.endpoint.buckets) {



            // call.key has the form "URL"
            // parsing the URL
            // const urlParts = call.key.split(" ");
            // console.log(" -" + urlParts[0]); // METHOD
            // console.log(urlParts[1]); // URL

            const url: URL = new URL(call.key);

            console.log("  " + url.pathname); // URL path
            console.log("  " + url.hostname); // URL hostname
            console.log("  " + url.port); // URL port
            console.log("  " + url.protocol); // URL protocol
            console.log("  " + url.search); // URL search
            console.log("  " + url.searchParams); // URL search
            console.log("  " + url.href); // URL search

            interface BackendApiResponse {
              backend_service_id: number;
            }

            const backendApi: BackendApiResponse[] = await getBackendIdByPath(method.key, url.pathname) as BackendApiResponse[];

            console.log(backendApi);

            if (backendApi.length == 1) {
              console.log("found a match " + backendApi[0]);
              const backendService = await getBackendServiceById(backendApi[0].backend_service_id);
              console.log(backendService);

              // insert into APIConsumption if not exists
              if (backendService) {
                let apiConsumption = await getAPIConsumptionByFields(consumerType as 'frontend' | 'backend', consumerServiceId, backendService.id);

                if (!apiConsumption) {
                  apiConsumption = await createAPIConsumption(consumerType as 'frontend' | 'backend', consumerServiceId, backendService.id);
                }
              } else {
                console.log("Backend service not found for API consumption.");
              }

            } else if (backendApi.length == 0) {
              console.log("no match");
            } else {
              console.log("found more than one match");
            }

          }
        };
      };
    } else {
      console.error("Unexpected response structure:", response);
    }
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(error);
  }

}

export { fillServicesMapDB };
