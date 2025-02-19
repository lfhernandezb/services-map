import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class QueryTerms {
    @JsonProperty("http.request.method")
    private httpRequestMethod: string[];

    constructor() {
        this.httpRequestMethod = [];
    }

    getHttpRequestMethod(): string[] {
        return this.httpRequestMethod;
    }

    setHttpRequestMethod(httpRequestMethod: string[]): void {
        this.httpRequestMethod = httpRequestMethod;
    }
}