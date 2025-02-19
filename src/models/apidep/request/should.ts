import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Term } from "../../term";

@JsonObject()
export class Should {
    @JsonProperty()
    private term: Term;

    constructor() {
        this.term = new Term();
    }

    setTerm(term: Term): void {
        this.term = term;
    }

    getTerm(): Term {
        return this.term;
    }
}