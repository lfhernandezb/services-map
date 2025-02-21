import axios from "axios";
import { Query } from "../../models/behost/request/query";
import { Request } from "../../models/behost/request/request";
import { Response } from "../../models/behost/response/response";
import { Host } from "../../models/fehost/request/host";
import { RequestAggs } from "../../models/fehost/request/request-aggs";
import { Service } from "../../models/fehost/request/service";
import { ServiceAggs } from "../../models/fehost/request/service-aggs";
import { Term } from "../../models/term";
import { Terms } from "../../models/terms";
import { customSerializer } from "../../libs/customSerializer";

async function BackendServiceHost(): Promise<Response> {
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

    const query: Query = new Query();
    query.setTerm(term);

    const request: Request = new Request();
    request.setQuery(query);
    request.setRequestAggs(requestAggs);
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

            service.host.buckets.forEach((host: any) => {
                console.log("  " + host.key);
                // console.log(host.doc_count);
            });
        });

        return response.data;
    }).catch((error: any) => {
        throw new Error(error.message);
    });
    */
}

export { BackendServiceHost };
