import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Term } from "../../term";

@JsonObject()
export class Query {
    @JsonProperty()
    private term: Term;

    constructor() {
        this.term = new Term();
    }

    public getTerm(): Term {
        return this.term;
    }

    public setTerm(term: Term): void {
        this.term = term;
    }
}
