import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Query } from "./query";
import { RequestAggs } from "../../fehost/request/request-aggs";

@JsonObject()
export class Request {
    @JsonProperty()
    private query: Query;
    @JsonProperty("aggs")
    private requestAggs: RequestAggs;
    @JsonProperty()
    private size: number;

    constructor() {
        this.query = new Query();
        this.requestAggs = new RequestAggs();
        this.size = 0;
    }

    public getQuery(): Query {
        return this.query;
    }

    public setQuery(query: Query): void {
        this.query = query;
    }

    public getRequestAggs(): RequestAggs {
        return this.requestAggs;
    }

    public setRequestAggs(requestAggs: RequestAggs): void {
        this.requestAggs = requestAggs;
    }

    public getSize(): number {
        return this.size;
    }

    public setSize(size: number): void {
        this.size = size;
    }

}
