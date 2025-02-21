import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Terms } from "../../terms";
import { ServiceAggs } from "./service-aggs";

@JsonObject()
export class Service {
    @JsonProperty("terms")
    private terms: Terms;
    @JsonProperty("aggs")
    private aggs: ServiceAggs;

    constructor() {
        this.terms = new Terms();
        this.aggs = new ServiceAggs();
    }

    getTerms(): Terms {
        return this.terms;
    }

    setTerms(terms: Terms): void {
        this.terms = terms;
    }

    getAggs(): ServiceAggs {
        return this.aggs;
    }

    setAggs(aggs: ServiceAggs): void {
        this.aggs = aggs;
    }
}
