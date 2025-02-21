import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Query } from "./query";
import { RequestAggs } from "./request-aggs";

@JsonObject()
export class Request {
    @JsonProperty()
    private query: Query;
    @JsonProperty()
    private aggs: RequestAggs;
    @JsonProperty()
    private size: number;

    constructor() {
        this.query = new Query();
        this.aggs = new RequestAggs();
        this.size = 0;
    }

    getQuery(): Query {
        return this.query;
    }

    setQuery(query: Query): void {
        this.query = query;
    }

    getAggs(): RequestAggs {
        return this.aggs;
    }

    setAggs(aggs: RequestAggs): void {
        this.aggs = aggs;
    }

    getSize(): number {
        return this.size;
    }

    setSize(size: number): void {
        this.size = size;
    }
}
