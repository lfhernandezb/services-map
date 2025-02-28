import axios from "axios";
import { customSerializer } from "../../libs/customSerializer";
import { Bool } from "../../models/apidep/request/bool";
import { Endpoint } from "../../models/apidep/request/endpoint";
import { Query } from "../../models/apidep/request/query";
import { Request } from "../../models/apidep/request/request";
import { RequestAggs } from "../../models/apidep/request/request-aggs";
import { Service } from "../../models/apidep/request/service";
import { ServiceAggs } from "../../models/apidep/request/service-aggs";
import { Should } from "../../models/apidep/request/should";
import { Term } from "../../models/term";
import { Terms } from "../../models/terms";
import { Response } from "../../models/apidep/response/response";
import { MethodAggs } from "../../models/apidep/request/method-aggs";
import { Method } from "../../models/apidep/request/method";

async function ApiDependency(): Promise<Response> {
  const API_KEY: string = "aS1BYzlaUUJsSVBwZ3B0OE9nTnc6WnA5eGRtckpUVGFsNzBWaVF6UVZJZw==";

  // create a new Terms object
  const terms1: Terms = new Terms();
  terms1.setField("url.original");

  const endpoint: Endpoint = new Endpoint();
  endpoint.setTerms(terms1);

  const methodAggs: MethodAggs = new MethodAggs();
  methodAggs.setEndpoint(endpoint);

  const terms2: Terms = new Terms();
  terms2.setField("http.request.method");

  const method: Method = new Method();
  method.setTerms(terms2);
  method.setAggs(methodAggs);

  const serviceAggs: ServiceAggs = new ServiceAggs();
  serviceAggs.setMethod(method);

  const terms3: Terms = new Terms();
  terms3.setField("service.name");

  const service: Service = new Service();
  service.setTerms(terms3);
  service.setAggs(serviceAggs);

  const requestAggs: RequestAggs = new RequestAggs();
  requestAggs.setService(service);

  const term1: Term = new Term();
  term1.setSpanType("external");

  console.log(customSerializer.serialize(term1));

  const term2: Term = new Term();
  term2.setSpanSubType("http");

  console.log(customSerializer.serialize(term2));

  const should1: Should = new Should();
  should1.setTerm(term1);

  console.log(customSerializer.serialize(should1));

  const should2: Should = new Should();
  should2.setTerm(term2);

  console.log(customSerializer.serialize(should2));

  const bool: Bool = new Bool();
  bool.addShould(should1);
  bool.addShould(should2);

  console.log(customSerializer.serialize(bool));

  const query: Query = new Query();
  query.setBool(bool);

  const request: Request = new Request();
  request.setQuery(query);
  request.setAggs(requestAggs);
  request.setSize(0);

  // console.log(customSerializer.serialize(request));

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

          service.endpoint.buckets.forEach((call: any) => {
              // call.key has the form "METHOD URL"
              // parsing the URL
              const urlParts = call.key.split(" ");
              console.log(" -" + urlParts[0]); // METHOD
              // console.log(urlParts[1]); // URL

              const url: URL = new URL(urlParts[1]);

              console.log("  " + url.pathname); // URL path
              console.log("  " + url.hostname); // URL hostname
              console.log("  " + url.port); // URL port
              console.log("  " + url.protocol); // URL protocol

              // console.log(call.key);
              // console.log(call.doc_count);
          });
      });

      return response.data;
  }).catch((error: any) => {
      throw new Error(error)
  });
  */

}

export { ApiDependency };
