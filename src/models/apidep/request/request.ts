import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { APIDepQuery } from "./query";
import { APIDepRequestAggs } from "./request-aggs";

@JsonObject()
export class APIDepRequest {
    @JsonProperty("query")
    private query: APIDepQuery;
    @JsonProperty("aggs")
    private aggs: APIDepRequestAggs;
    @JsonProperty("size")
    private size: number;

    constructor() {
        this.query = new APIDepQuery();
        this.aggs = new APIDepRequestAggs();
        this.size = 0;
    }

    setQuery(query: APIDepQuery): void {
        this.query = query;
    }

    getQuery(): APIDepQuery {
        return this.query;
    }

    setAggs(aggs: APIDepRequestAggs): void {
        this.aggs = aggs;
    }

    getAggs(): APIDepRequestAggs {
        return this.aggs;
    }

    setSize(size: number): void {
        this.size = size;
    }

    getSize(): number {
        return this.size;
    }
}