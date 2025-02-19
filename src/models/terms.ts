import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class Terms {
    @JsonProperty()
    private field: string;

    constructor() {
        this.field = "";
    }

    setField(field: string) {
        this.field = field;
    }
}
