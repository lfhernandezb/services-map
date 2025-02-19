import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { APIDepService } from "./service";

@JsonObject()
export class APIDepRequestAggs {
    @JsonProperty("service")
    private service: APIDepService;

    constructor() {
        this.service = new APIDepService();
    }

    getService(): APIDepService {
        return this.service;
    }

    setService(service: APIDepService) {
        this.service = service;
    }
}