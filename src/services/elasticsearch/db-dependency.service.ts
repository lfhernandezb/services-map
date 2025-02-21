import axios from "axios";
import { Response } from "../../models/dbdep/response/response";
import { ElasticsearchQueryBuilder } from "../../models/dbdep/request/elasticsearch-query-builder";

async function DBDependency(): Promise<Response> {
  const API_KEY: string = "aS1BYzlaUUJsSVBwZ3B0OE9nTnc6WnA5eGRtckpUVGFsNzBWaVF6UVZJZw==";

  const queryBuilder = new ElasticsearchQueryBuilder();
  const esQuery = queryBuilder.build();

  const request: string = JSON.stringify(esQuery, null, 2);

  // console.log(JSON.stringify(esQuery, null, 2));

  // return;

  // send an http request to the backend using axios
  return axios.post("http://172.31.218.37:9200/*apm*/_search", request, {
      headers: {
          "Content-Type": "application/json",
          "Authorization": `ApiKey ${API_KEY}`
      }
  }); /*.then((response: { data: Response; }) => {
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

      return response.data;
    }).catch((error: any) => {
        throw new Error(error)
    });
  */

}

export { DBDependency };
