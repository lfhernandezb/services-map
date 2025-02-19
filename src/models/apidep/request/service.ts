import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Terms } from "../../terms";
import { APIDepServiceAggs } from "./service-aggs";

@JsonObject()
export class APIDepService {
    @JsonProperty()
    private terms: Terms;
    @JsonProperty("aggs")
    private APIDepServiceAggs: APIDepServiceAggs;

    constructor() {
        this.terms = new Terms();
        this.APIDepServiceAggs = new APIDepServiceAggs();
    }

    getTerms(): Terms {
        return this.terms;
    }

    setTerms(terms: Terms) {
        this.terms = terms;
    }

    getAggs(): APIDepServiceAggs {
        return this.APIDepServiceAggs;
    }

    setAggs(APIDepServiceAggs: APIDepServiceAggs) {
        this.APIDepServiceAggs = APIDepServiceAggs;
    }
}