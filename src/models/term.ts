import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class Term {
    @JsonProperty("span.type")
    private spanType: string | undefined;
    @JsonProperty("span.subtype")
    private spanSubType: string | undefined;
    @JsonProperty("metricset.name")
    private metricsetName: string | undefined;

    constructor() {
    }

    setSpanType(spanType: string): void {
        this.spanType = spanType;
    }

    getSpanType(): string | undefined {
        return this.spanType;
    }

    setSpanSubType(spanSubType: string): void {
        this.spanSubType = spanSubType;
    }

    getSpanSubType(): string | undefined {
        return this.spanSubType;
    }

    setMetricSetName(metricsetName: string): void {
        this.metricsetName = metricsetName;
    }

    getMetricSetName(): string | undefined {
        return this.metricsetName;
    }

}