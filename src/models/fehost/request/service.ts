import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { ServiceAggs } from "./service-aggs";
import { Terms } from "../../terms";

@JsonObject()
export class Service {
    @JsonProperty()
    private terms: Terms;
    @JsonProperty("aggs")
    private aggs: ServiceAggs;

    constructor() {
        this.terms = new Terms();
        this.aggs = new ServiceAggs();
    }

    public getTerms(): Terms {
        return this.terms;
    }

    public setTerms(terms: Terms): void {
        this.terms = terms;
    }

    public getAggs(): ServiceAggs {
        return this.aggs;
    }

    public setAggs(aggs: ServiceAggs): void {
        this.aggs = aggs;
    }
}