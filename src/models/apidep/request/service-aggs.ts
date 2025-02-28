import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Method } from "./method";

@JsonObject()
export class ServiceAggs {
    // Define properties
    @JsonProperty()
    private method: Method;

    // Constructor to initialize properties
    constructor() {
        this.method = new Method();
    }

    // Getter for method
    public getMethod(): Method {
        return this.method;
    }

    // Setter for method
    public setMethod(method: Method): void {
        this.method = method;
    }
}
