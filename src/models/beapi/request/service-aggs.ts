import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Method } from "./method";

@JsonObject()
export class ServiceAggs {
    @JsonProperty("method")
    private method: Method;

    constructor() {
        this.method = new Method();
    }

    getMethod(): Method {
        return this.method;
    }

    setMethod(method: Method): void {
        this.method = method;
    }
}
