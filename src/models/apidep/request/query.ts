import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Bool } from "./bool";

@JsonObject()
export class Query {
    @JsonProperty()
    private bool: Bool;

    constructor() {
        this.bool = new Bool();
    }

    setBool(bool: Bool): void {
        this.bool = bool;
    }

    getBool(): Bool {
        return this.bool;
    }
}
