import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Path } from "./path";

@JsonObject()
export class MethodAggs {
    @JsonProperty()
    private path: Path;

    constructor() {
        this.path = new Path();
    }

    getPath(): Path {
        return this.path;
    }

    setPath(path: Path): void {
        this.path = path;
    }
    
}