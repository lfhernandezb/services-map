import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Service } from "./service";

@JsonObject()
export class RequestAggs {
    @JsonProperty("service")
    private service: Service;

    constructor() {
        this.service = new Service();
    }

    getService(): Service {
        return this.service;
    }

    setService(service: Service) {
        this.service = service;
    }
}
