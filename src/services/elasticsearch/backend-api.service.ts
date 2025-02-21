import axios from "axios";
import { customSerializer } from "../../libs/customSerializer";
import { Method } from "../../models/beapi/request/method";
import { MethodAggs } from "../../models/beapi/request/method-aggs";
import { Path } from "../../models/beapi/request/path";
import { Query } from "../../models/beapi/request/query";
import { QueryTerms } from "../../models/beapi/request/query-terms";
import { Request } from "../../models/beapi/request/request";
import { RequestAggs } from "../../models/beapi/request/request-aggs";
import { Service } from "../../models/beapi/request/service";
import { ServiceAggs } from "../../models/beapi/request/service-aggs";
import { Terms } from "../../models/terms";
import { Response } from "../../models/beapi/response/response";

async function BackendApi(): Promise<Response> {
  const API_KEY: string = "aS1BYzlaUUJsSVBwZ3B0OE9nTnc6WnA5eGRtckpUVGFsNzBWaVF6UVZJZw==";

  // create a new Terms object
  const terms1: Terms = new Terms();
  terms1.setField("url.path");

  const path: Path = new Path();
  path.setTerms(terms1);

  const aggs1: MethodAggs = new MethodAggs();
  aggs1.setPath(path);

  const terms2: Terms = new Terms();
  terms2.setField("http.request.method");

  const method: Method = new Method();
  method.setTerms(terms2);
  method.setAggs(aggs1);

  const aggs2: ServiceAggs = new ServiceAggs();
  aggs2.setMethod(method);

  const terms3: Terms = new Terms();
  terms3.setField("service.name");

  const service: Service = new Service();
  service.setAggs(aggs2);
  service.setTerms(terms3);

  const aggs3: RequestAggs = new RequestAggs();
  aggs3.setService(service);

  const terms4: QueryTerms = new QueryTerms();
  terms4.setHttpRequestMethod(["GET", "POST", "PUT", "DELETE"]);

  const query: Query = new Query();
  query.setTerms(terms4);

  const request: Request = new Request();
  request.setQuery(query);
  request.setAggs(aggs3);
  request.setSize(0);

  console.log(customSerializer.serialize(request));

  // return;

  // send an http request to the backend using axios
  return axios.post("http://172.31.218.37:9200/*apm*/_search", customSerializer.serialize(request), {
      headers: {
          "Content-Type": "application/json",
          "Authorization": `ApiKey ${API_KEY}`
      }
  }); /*.then((response: { data: Response; }) => {
      // console.log(response.data);

      response.data.aggregations.service.buckets.forEach((service: any) => {
          console.log(service.key);
          // console.log(service.doc_count);

          service.method.buckets.forEach((method: any) => {
              console.log("  " + method.key);
              // console.log(method.doc_count);

              method.path.buckets.forEach((path: any) => {
                  console.log("    " + path.key); // PÄTH
              });
          });
      });

      return response.data;
  }).catch((error: any) => {
      throw new Error(error)
  });
  */

}

export { BackendApi };
