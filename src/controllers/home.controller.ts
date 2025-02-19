import { Request, RequestHandler, Response } from "express";
import axios from "axios";
import { Terms } from "../models/terms"; // Adjust the import path as necessary
import { Host } from "../models/fehost/request/host";
import { ServiceAggs } from "../models/fehost/request/service-aggs";
import { Service } from "../models/fehost/request/service";
import { RequestAggs } from "../models/fehost/request/request-aggs";
import { FEHostQuery } from "../models/fehost/request/query";
import { FEHostRequest } from "../models/fehost/request/request";
import { FEHostResponse } from "../models/fehost/response/response";
import { JsonSerializer } from "typescript-json-serializer";
import { BEHostQuery } from "../models/behost/request/query";
import { BEHostRequest } from "../models/behost/request/request";
import { BEHostResponse } from "../models/behost/response/response";
import { Endpoint } from "../models/apidep/request/endpoint";
import { APIDepServiceAggs } from "../models/apidep/request/service-aggs";
import { APIDepService } from "../models/apidep/request/service";
import { APIDepRequestAggs } from "../models/apidep/request/request-aggs";
import { Term } from "../models/term";
import { Should } from "../models/apidep/request/should";
import { Bool } from "../models/apidep/request/bool";
import { APIDepQuery } from "../models/apidep/request/query";
import { APIDepRequest } from "../models/apidep/request/request";
import { APIDepResponse } from "../models/apidep/response/response";
import { Path } from "../models/beapi/request/path";
import { MethodAggs } from "../models/beapi/request/method-aggs";
import { Method } from "../models/beapi/request/method";
import { BEApiServiceAggs } from "../models/beapi/request/service-aggs";
import { BEApiService } from "../models/beapi/request/service";
import { QueryTerms } from "../models/beapi/request/query-terms";
import { BEApiRequest } from "../models/beapi/request/request";
import { BEApiQuery } from "../models/beapi/request/query";
import { BEApiRequestAggs } from "../models/beapi/request/request-aggs";
import { BEApiResponse } from "../models/beapi/response/response";
import { DBDepResponse, EngineTypeBucket, HostBucket, InstanceBucket, ServiceBucket } from "../models/dbdep/response/response";
import { ElasticsearchQueryBuilder } from "../models/dbdep/request/elasticsearch-query-builder";

// Instantiate a custom serializer
const customSerializer = new JsonSerializer({
    // Throw errors instead of logging
    // errorCallback: throwError,

    // Allow all nullish values
    nullishPolicy: {
        undefined: 'remove',
        null: 'remove'
    },

    // Disallow additional properties (non JsonProperty)
    additionalPropertiesPolicy: 'disallow',

    // e.g. if all the properties in the json object are prefixed by '_'
    // formatPropertyName: (propertyName: string) => `_${propertyName}`,
})

export const welcome: RequestHandler = (req: Request, res: Response) => {
    res.send("Welcome to the home page!");
};

export const frontEndHost: RequestHandler = (req: Request, res: Response) => {
    const API_KEY: string = "aS1BYzlaUUJsSVBwZ3B0OE9nTnc6WnA5eGRtckpUVGFsNzBWaVF6UVZJZw==";

    // create a new Terms object
    const terms1: Terms = new Terms();
    terms1.setField("source.ip");

    const host: Host = new Host();
    host.setTerms(terms1);

    const serviceAggs: ServiceAggs = new ServiceAggs();
    serviceAggs.setHost(host);

    const terms2: Terms = new Terms();
    terms2.setField("service.name");

    const service: Service = new Service();
    service.setTerms(terms2);
    service.setAggs(serviceAggs);

    const requestAggs: RequestAggs = new RequestAggs();
    requestAggs.setService(service);

    const term: Term = new Term();
    term.setSpanType("external");

    const query: FEHostQuery = new FEHostQuery();
    query.setTerm(term);

    const request: FEHostRequest = new FEHostRequest();
    request.setQuery(query);
    request.setRequestAggs(requestAggs);
    request.setSize(0);

    // console.log(customSerializer.serialize(request));

    // return;

    // send an http request to the backend using axios
    axios.post("http://172.31.218.37:9200/*apm*/_search", customSerializer.serialize(request), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `ApiKey ${API_KEY}`
        }
    }).then((response: { data: FEHostResponse; }) => {
        console.log(response.data);

        response.data.aggregations.service.buckets.forEach((service: any) => {
            console.log(service.key);
            // console.log(service.doc_count);

            service.host.buckets.forEach((host: any) => {
                console.log("  " + host.key);
                // console.log(host.doc_count);
            });
        });

        res.send("ok");
    }).catch((error: any) => {
        res.send(error);
    });
    

};

export const backEndHost: RequestHandler = (req: Request, res: Response) => {
    const API_KEY: string = "aS1BYzlaUUJsSVBwZ3B0OE9nTnc6WnA5eGRtckpUVGFsNzBWaVF6UVZJZw==";

    // create a new Terms object
    const terms1: Terms = new Terms();
    terms1.setField("host.ip");

    const host: Host = new Host();
    host.setTerms(terms1);

    const serviceAggs: ServiceAggs = new ServiceAggs();
    serviceAggs.setHost(host);

    const terms2: Terms = new Terms();
    terms2.setField("service.name");

    const service: Service = new Service();
    service.setTerms(terms2);
    service.setAggs(serviceAggs);

    const requestAggs: RequestAggs = new RequestAggs();
    requestAggs.setService(service);

    const term: Term = new Term();
    term.setMetricSetName("app");

    const query: BEHostQuery = new BEHostQuery();
    query.setTerm(term);

    const request: BEHostRequest = new BEHostRequest();
    request.setQuery(query);
    request.setRequestAggs(requestAggs);
    request.setSize(0);

    // console.log(customSerializer.serialize(request));

    // return;

    // send an http request to the backend using axios
    axios.post("http://172.31.218.37:9200/*apm*/_search", customSerializer.serialize(request), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `ApiKey ${API_KEY}`
        }
    }).then((response: { data: BEHostResponse; }) => {
        // console.log(response.data);

        response.data.aggregations.service.buckets.forEach((service: any) => {
            console.log(service.key);
            // console.log(service.doc_count);

            service.host.buckets.forEach((host: any) => {
                console.log("  " + host.key);
                // console.log(host.doc_count);
            });
        });

        res.send("ok");
    }).catch((error: any) => {
        res.send(error);
    });
    

};

export const apiDep: RequestHandler = (req: Request, res: Response) => {
    const API_KEY: string = "aS1BYzlaUUJsSVBwZ3B0OE9nTnc6WnA5eGRtckpUVGFsNzBWaVF6UVZJZw==";

    // create a new Terms object
    const terms1: Terms = new Terms();
    terms1.setField("span.name");

    const endpoint: Endpoint = new Endpoint();
    endpoint.setTerms(terms1);

    const serviceAggs: APIDepServiceAggs = new APIDepServiceAggs();
    serviceAggs.setEndpoint(endpoint);

    const terms2: Terms = new Terms();
    terms2.setField("service.name");

    const service: APIDepService = new APIDepService();
    service.setTerms(terms2);
    service.setAggs(serviceAggs);

    const requestAggs: APIDepRequestAggs = new APIDepRequestAggs();
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

    const query: APIDepQuery = new APIDepQuery();
    query.setBool(bool);

    const request: APIDepRequest = new APIDepRequest();
    request.setQuery(query);
    request.setAggs(requestAggs);
    request.setSize(0);

    // console.log(customSerializer.serialize(request));

    // return;

    // send an http request to the backend using axios
    axios.post("http://172.31.218.37:9200/*apm*/_search", customSerializer.serialize(request), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `ApiKey ${API_KEY}`
        }
    }).then((response: { data: APIDepResponse; }) => {
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

        res.send("ok");
    }).catch((error: any) => {
        res.send(error);
    });
    

};

export const backEndApi: RequestHandler = (req: Request, res: Response) => {
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

    const aggs2: BEApiServiceAggs = new BEApiServiceAggs();
    aggs2.setMethod(method);

    const terms3: Terms = new Terms();
    terms3.setField("service.name");

    const service: BEApiService = new BEApiService();
    service.setAggs(aggs2);
    service.setTerms(terms3);

    const aggs3: BEApiRequestAggs = new BEApiRequestAggs();
    aggs3.setService(service);

    const terms4: QueryTerms = new QueryTerms();
    terms4.setHttpRequestMethod(["GET", "POST", "PUT", "DELETE"]);

    const query: BEApiQuery = new BEApiQuery();
    query.setTerms(terms4);
    
    const request: BEApiRequest = new BEApiRequest();
    request.setQuery(query);
    request.setAggs(aggs3);
    request.setSize(0);

    console.log(customSerializer.serialize(request));

    // return;

    // send an http request to the backend using axios
    axios.post("http://172.31.218.37:9200/*apm*/_search", customSerializer.serialize(request), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `ApiKey ${API_KEY}`
        }
    }).then((response: { data: BEApiResponse; }) => {
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

        res.send("ok");
    }).catch((error: any) => {
        res.send(error);
    });
    

};

export const dbDep: RequestHandler = (req: Request, res: Response) => {
    const API_KEY: string = "aS1BYzlaUUJsSVBwZ3B0OE9nTnc6WnA5eGRtckpUVGFsNzBWaVF6UVZJZw==";

    const queryBuilder = new ElasticsearchQueryBuilder();
    const esQuery = queryBuilder.build();

    const request: string = JSON.stringify(esQuery, null, 2);

    // console.log(JSON.stringify(esQuery, null, 2));

    // return;

    // send an http request to the backend using axios
    axios.post("http://172.31.218.37:9200/*apm*/_search", request, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `ApiKey ${API_KEY}`
        }
    }).then((response: { data: DBDepResponse; }) => {
        // console.log(response.data);

        response.data.aggregations.service.buckets.forEach((bucket1: any) => {
            console.log(bucket1.key);
            
            bucket1.engine_type.buckets.forEach((bucket2: any) => {
                console.log("  " + bucket2.key);

                bucket2.host.buckets.forEach((bucket3: any) => {
                    console.log("    " + bucket3.key);

                    bucket3.instance.buckets.forEach((bucket4: any) => {
                        console.log("      " + bucket4.key);
                    })
                });
            });
            
        });

        res.send("ok");
    }).catch((error: any) => {
        res.send(error);
    });
    

};