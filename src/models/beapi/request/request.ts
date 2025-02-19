import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { BEApiQuery } from "./query";
import { BEApiRequestAggs } from "./request-aggs";

@JsonObject()
export class BEApiRequest {
    @JsonProperty()
    private query: BEApiQuery;
    @JsonProperty()
    private aggs: BEApiRequestAggs;
    @JsonProperty()
    private size: number;

    constructor() {
        this.query = new BEApiQuery();
        this.aggs = new BEApiRequestAggs();
        this.size = 0;
    }

    getQuery(): BEApiQuery {
        return this.query;
    }

    setQuery(query: BEApiQuery): void {
        this.query = query;
    }

    getAggs(): BEApiRequestAggs {
        return this.aggs;
    }

    setAggs(aggs: BEApiRequestAggs): void {
        this.aggs = aggs;
    }

    getSize(): number {
        return this.size;
    }

    setSize(size: number): void {
        this.size = size;
    }
}