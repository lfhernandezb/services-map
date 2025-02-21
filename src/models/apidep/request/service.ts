import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Terms } from "../../terms";
import { ServiceAggs } from "./service-aggs";

@JsonObject()
export class Service {
    @JsonProperty()
    private terms: Terms;
    @JsonProperty("aggs")
    private ServiceAggs: ServiceAggs;

    constructor() {
        this.terms = new Terms();
        this.ServiceAggs = new ServiceAggs();
    }

    getTerms(): Terms {
        return this.terms;
    }

    setTerms(terms: Terms) {
        this.terms = terms;
    }

    getAggs(): ServiceAggs {
        return this.ServiceAggs;
    }

    setAggs(ServiceAggs: ServiceAggs) {
        this.ServiceAggs = ServiceAggs;
    }
}
