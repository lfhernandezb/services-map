import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { FEHostQuery } from "./query";
import { RequestAggs } from "./request-aggs";

@JsonObject()
export class FEHostRequest {
    @JsonProperty()
    private query: FEHostQuery;
    @JsonProperty("aggs")
    private requestAggs: RequestAggs;
    @JsonProperty()
    private size: number;

    constructor() {
        this.query = new FEHostQuery();
        this.requestAggs = new RequestAggs();
        this.size = 0;
    }

    public getQuery(): FEHostQuery {
        return this.query;
    }

    public setQuery(query: FEHostQuery): void {
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