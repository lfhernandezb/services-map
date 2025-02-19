import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Terms } from "../../terms";
import { BEApiServiceAggs } from "./service-aggs";

@JsonObject()
export class BEApiService {
    @JsonProperty("terms")
    private terms: Terms;
    @JsonProperty("aggs")
    private aggs: BEApiServiceAggs;

    constructor() {
        this.terms = new Terms();
        this.aggs = new BEApiServiceAggs();
    }

    getTerms(): Terms {
        return this.terms;
    }

    setTerms(terms: Terms): void {
        this.terms = terms;
    }

    getAggs(): BEApiServiceAggs {
        return this.aggs;
    }

    setAggs(aggs: BEApiServiceAggs): void {
        this.aggs = aggs;
    }
}