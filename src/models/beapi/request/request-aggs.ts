import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { BEApiService } from "./service";

@JsonObject()
export class BEApiRequestAggs {
    @JsonProperty("service")
    private service: BEApiService;

    constructor() {
        this.service = new BEApiService();
    }

    getService(): BEApiService {
        return this.service;
    }

    setService(service: BEApiService): void {
        this.service = service;
    }
}