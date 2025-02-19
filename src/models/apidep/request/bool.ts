import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Should } from "./should";

@JsonObject()
export class Bool {
    // @JsonProperty("should")
    @JsonProperty({ name: 'should', type: Should })
    private shoulds: Should[];

    constructor() {
        this.shoulds = [];
    }

    addShould(should: Should): void {
        this.shoulds.push(should);
    }

    getShoulds(): Should[] {
        return this.shoulds;
    }

    setShoulds(shoulds: Should[]): void {
        this.shoulds = shoulds;
    }
}