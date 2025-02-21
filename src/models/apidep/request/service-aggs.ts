import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Endpoint } from "./endpoint";

@JsonObject()
export class ServiceAggs {
    // Define properties
    @JsonProperty()
    private endpoint: Endpoint;

    // Constructor to initialize properties
    constructor() {
        this.endpoint = new Endpoint();
    }

    // Getter for endpoint
    public getEndpoint(): Endpoint {
        return this.endpoint;
    }

    // Setter for endpoint
    public setEndpoint(endpoint: Endpoint): void {
        this.endpoint = endpoint;
    }
}
