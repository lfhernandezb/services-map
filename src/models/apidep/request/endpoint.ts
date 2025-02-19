import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Terms } from "../../terms";

@JsonObject()
export class Endpoint {
    @JsonProperty("terms")
    private terms: Terms;

    constructor() {
        this.terms = new Terms();
    }

    getTerms(): Terms {
        return this.terms;
    }

    setTerms(terms: Terms) {
        this.terms = terms;
    }
}