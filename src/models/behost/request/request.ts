import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { BEHostQuery } from "./query";
import { RequestAggs } from "../../fehost/request/request-aggs";

@JsonObject()
export class BEHostRequest {
    @JsonProperty()
    private query: BEHostQuery;
    @JsonProperty("aggs")
    private requestAggs: RequestAggs;
    @JsonProperty()
    private size: number;

    constructor() {
        this.query = new BEHostQuery();
        this.requestAggs = new RequestAggs();
        this.size = 0;
    }

    public getQuery(): BEHostQuery {
        return this.query;
    }

    public setQuery(query: BEHostQuery): void {
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