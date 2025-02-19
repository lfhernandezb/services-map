// To parse this data:
//
//   import { Convert, Response } from "./file";
//
//   const response = Convert.toResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface DBDepResponse {
    took:         number;
    timedOut:     boolean;
    shards:       Shards;
    hits:         Hits;
    aggregations: Aggregations;
}

export interface Aggregations {
    service: DBDepService;
}

export interface DBDepService {
    docCountErrorUpperBound: number;
    sumOtherDocCount:        number;
    buckets:                 ServiceBucket[];
}

export interface ServiceBucket {
    key:        string;
    docCount:   number;
    engineType: EngineType;
}

export interface EngineType {
    docCountErrorUpperBound: number;
    sumOtherDocCount:        number;
    buckets:                 EngineTypeBucket[];
}

export interface EngineTypeBucket {
    key:      string;
    docCount: number;
    host:     DBDepHost;
}

export interface DBDepHost {
    docCountErrorUpperBound: number;
    sumOtherDocCount:        number;
    buckets:                 HostBucket[];
}

export interface HostBucket {
    key:      string;
    docCount: number;
    instance: Instance;
}

export interface Instance {
    docCountErrorUpperBound: number;
    sumOtherDocCount:        number;
    buckets:                 InstanceBucket[];
}

export interface InstanceBucket {
    key:      string;
    docCount: number;
    sentence: Sentence;
}

export interface Sentence {
    docCountErrorUpperBound: number;
    sumOtherDocCount:        number;
    buckets:                 SentenceBucket[];
}

export interface SentenceBucket {
    key:      string;
    docCount: number;
}

export interface Hits {
    total:    Total;
    maxScore: null;
    hits:     any[];
}

export interface Total {
    value:    number;
    relation: string;
}

export interface Shards {
    total:      number;
    successful: number;
    skipped:    number;
    failed:     number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toResponse(json: string): Response {
        return cast(JSON.parse(json), r("Response"));
    }

    public static responseToJson(value: Response): string {
        return JSON.stringify(uncast(value, r("Response")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Response": o([
        { json: "took", js: "took", typ: 0 },
        { json: "timed_out", js: "timedOut", typ: true },
        { json: "_shards", js: "shards", typ: r("Shards") },
        { json: "hits", js: "hits", typ: r("Hits") },
        { json: "aggregations", js: "aggregations", typ: r("Aggregations") },
    ], false),
    "Aggregations": o([
        { json: "service", js: "service", typ: r("Service") },
    ], false),
    "Service": o([
        { json: "doc_count_error_upper_bound", js: "docCountErrorUpperBound", typ: 0 },
        { json: "sum_other_doc_count", js: "sumOtherDocCount", typ: 0 },
        { json: "buckets", js: "buckets", typ: a(r("ServiceBucket")) },
    ], false),
    "ServiceBucket": o([
        { json: "key", js: "key", typ: "" },
        { json: "doc_count", js: "docCount", typ: 0 },
        { json: "engine_type", js: "engineType", typ: r("EngineType") },
    ], false),
    "EngineType": o([
        { json: "doc_count_error_upper_bound", js: "docCountErrorUpperBound", typ: 0 },
        { json: "sum_other_doc_count", js: "sumOtherDocCount", typ: 0 },
        { json: "buckets", js: "buckets", typ: a(r("EngineTypeBucket")) },
    ], false),
    "EngineTypeBucket": o([
        { json: "key", js: "key", typ: "" },
        { json: "doc_count", js: "docCount", typ: 0 },
        { json: "host", js: "host", typ: r("Host") },
    ], false),
    "Host": o([
        { json: "doc_count_error_upper_bound", js: "docCountErrorUpperBound", typ: 0 },
        { json: "sum_other_doc_count", js: "sumOtherDocCount", typ: 0 },
        { json: "buckets", js: "buckets", typ: a(r("HostBucket")) },
    ], false),
    "HostBucket": o([
        { json: "key", js: "key", typ: "" },
        { json: "doc_count", js: "docCount", typ: 0 },
        { json: "instance", js: "instance", typ: r("Instance") },
    ], false),
    "Instance": o([
        { json: "doc_count_error_upper_bound", js: "docCountErrorUpperBound", typ: 0 },
        { json: "sum_other_doc_count", js: "sumOtherDocCount", typ: 0 },
        { json: "buckets", js: "buckets", typ: a(r("InstanceBucket")) },
    ], false),
    "InstanceBucket": o([
        { json: "key", js: "key", typ: "" },
        { json: "doc_count", js: "docCount", typ: 0 },
        { json: "sentence", js: "sentence", typ: r("Sentence") },
    ], false),
    "Sentence": o([
        { json: "doc_count_error_upper_bound", js: "docCountErrorUpperBound", typ: 0 },
        { json: "sum_other_doc_count", js: "sumOtherDocCount", typ: 0 },
        { json: "buckets", js: "buckets", typ: a(r("SentenceBucket")) },
    ], false),
    "SentenceBucket": o([
        { json: "key", js: "key", typ: "" },
        { json: "doc_count", js: "docCount", typ: 0 },
    ], false),
    "Hits": o([
        { json: "total", js: "total", typ: r("Total") },
        { json: "max_score", js: "maxScore", typ: null },
        { json: "hits", js: "hits", typ: a("any") },
    ], false),
    "Total": o([
        { json: "value", js: "value", typ: 0 },
        { json: "relation", js: "relation", typ: "" },
    ], false),
    "Shards": o([
        { json: "total", js: "total", typ: 0 },
        { json: "successful", js: "successful", typ: 0 },
        { json: "skipped", js: "skipped", typ: 0 },
        { json: "failed", js: "failed", typ: 0 },
    ], false),
};
