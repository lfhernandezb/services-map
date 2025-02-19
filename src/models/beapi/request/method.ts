import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Terms } from "../../terms";
import { MethodAggs } from "./method-aggs";

@JsonObject()
export class Method {
    @JsonProperty()
    private terms: Terms;
    @JsonProperty("aggs")
    private aggs: MethodAggs;

    constructor() {
        this.terms = new Terms();
        this.aggs = new MethodAggs();
    }

    getTerms(): Terms {
        return this.terms;
    }

    setTerms(terms: Terms): void {
        this.terms = terms;
    }

    getAggs(): MethodAggs {
        return this.aggs;
    }

    setAggs(aggs: MethodAggs): void {
        this.aggs = aggs;
    }
}