import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Host } from "./host";

@JsonObject()
export class ServiceAggs {
    // Define properties
    @JsonProperty()
    private host: Host;

    // Constructor to initialize properties
    constructor() {
        this.host = new Host();
    }

    // Getter for host
    public getHost(): Host {
        return this.host;
    }

    // Setter for host
    public setHost(host: Host): void {
        this.host = host;
    }
}