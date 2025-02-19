import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { QueryTerms } from "./query-terms";

@JsonObject()
export class BEApiQuery {
    @JsonProperty("terms")
    private queryTerms: QueryTerms;

    constructor() {
        this.queryTerms = new QueryTerms();
    }

    getTerms(): QueryTerms {
        return this.queryTerms;
    }

    setTerms(queryTerms: QueryTerms): void {
        this.queryTerms = queryTerms;
    }
}