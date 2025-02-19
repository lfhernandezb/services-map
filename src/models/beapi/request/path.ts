import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Terms } from "../../terms";

@JsonObject()
export class Path {
    @JsonProperty()
    private terms: Terms;

    constructor() {
        this.terms = new Terms();
    }

    setTerms(terms: Terms) {
        this.terms = terms;
    }

    getTerms(): Terms {
        return this.terms;
    }
}