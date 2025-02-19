import { JsonObject } from "typescript-json-serializer";
import { Terms } from "../../terms";

@JsonObject()
export class Host {
    private terms: Terms;
    constructor() {
        this.terms = new Terms();
    }
    setTerms(terms: Terms) {
        this.terms = terms;
    }
}
