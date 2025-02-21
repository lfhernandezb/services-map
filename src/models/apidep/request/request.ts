import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Query } from "./query";
import { RequestAggs } from "./request-aggs";

@JsonObject()
export class Request {
    @JsonProperty("query")
    private query: Query;
    @JsonProperty("aggs")
    private aggs: RequestAggs;
    @JsonProperty("size")
    private size: number;

    constructor() {
        this.query = new Query();
        this.aggs = new RequestAggs();
        this.size = 0;
    }

    setQuery(query: Query): void {
        this.query = query;
    }

    getQuery(): Query {
        return this.query;
    }

    setAggs(aggs: RequestAggs): void {
        this.aggs = aggs;
    }

    getAggs(): RequestAggs {
        return this.aggs;
    }

    setSize(size: number): void {
        this.size = size;
    }

    getSize(): number {
        return this.size;
    }
}
