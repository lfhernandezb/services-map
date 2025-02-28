import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Terms } from "../../terms";
import { MethodAggs } from "./method-aggs";

@JsonObject()
export class Method {
    @JsonProperty()
    private terms: Terms;
    @JsonProperty("aggs")
    private MethodAggs: MethodAggs;

    constructor() {
        this.terms = new Terms();
        this.MethodAggs = new MethodAggs();
    }

    getTerms(): Terms {
        return this.terms;
    }

    setTerms(terms: Terms) {
        this.terms = terms;
    }

    getAggs(): MethodAggs {
        return this.MethodAggs;
    }

    setAggs(MethodAggs: MethodAggs) {
        this.MethodAggs = MethodAggs;
    }
}
