import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Service } from "./service";

@JsonObject()
export class RequestAggs {
    // Define properties
    @JsonProperty()
    private service: Service;

    // Constructor to initialize properties
    constructor() {
        this.service = new Service();
    }

    // Getter for service
    public getService(): Service {
        return this.service;
    }

    // Setter for service
    public setService(service: Service): void {
        this.service = service;
    }
}