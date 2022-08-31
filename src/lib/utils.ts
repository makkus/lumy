// from: https://stackoverflow.com/questions/29855098/is-there-a-built-in-javascript-function-similar-to-os-path-join
import type {
    ActiveJob, InternalErrorModel,
    Operation,
    OperationInfo,
    RenderValueResult,
    Value,
    ValueInfo,
    ValueMatcher,
    ValueSchema
} from "./models";
import * as url from "url";
import * as path from "path";

export const NOT_SET_VALUE_ID = "00000000-0000-0000-0000-000000000001"
export const NONE_VALUE_ID = "00000000-0000-0000-0000-000000000002"

export function pathJoin(parts: string[], sep = "/") {
    const separator = sep || '/';
    parts = parts.map((part, index) => {
        if (index) {
            part = part.replace(new RegExp('^' + separator), '');
        }
        if (index !== parts.length - 1) {
            part = part.replace(new RegExp(separator + '$'), '');
        }
        return part;
    })
    return parts.join(separator);
}

export class InternalServiceError extends Error {
    status: number;
    msg: string;

    constructor(error_model: InternalErrorModel) {
        super();
        this.status = error_model.status
        this.msg = error_model.msg
    }

}

export abstract class KiaraContext {

    value_cache: Record<string, Value>;
    operation_cache: Record<string, Operation>;

    constructor() {
        this.value_cache = {}
        this.operation_cache = {}
    }

    public abstract render_value(value: string, render_config: Record<string, any>): Promise<RenderValueResult>;

    public abstract list_aliases(matcher?: ValueMatcher): Promise<Record<string, Value>>;

    public abstract list_values(matcher?: ValueMatcher): Promise<Record<string, Value>>;

    public abstract get_alias_names(data_type?: string): Promise<string[]>;

    public abstract get_aliases_info(matcher?: ValueMatcher): Promise<Record<string, ValueInfo>>;

    public abstract get_alias_names_for_types(data_types: string[]): Promise<Record<string, string[]>>;

    public abstract list_operations(filters?: string[], include_internal?: boolean): Promise<Record<string, OperationInfo>>;

    public abstract list_operation_ids(filters?: string[], include_internal?: boolean): Promise<string[]>;

    public abstract get_operation(operation_id: string): Promise<OperationInfo>;

    public abstract validate_inputs(inputs: Record<string, any>, inputs_schema: Record<string, ValueSchema>): Promise<Record<string, string>>;

    public abstract queue_job(operation_id: string, inputs: Record<string, any>, operation_config?: Record<string, any>): Promise<ActiveJob>;

    public abstract monitor_job(job_id: string): Promise<ActiveJob>;
}

export class KiaraRestClientContext extends KiaraContext {

    url: string;

    constructor(url = "http://localhost:8080") {
        super()
        this.url = url;
    }

    public async list_aliases(matcher?: ValueMatcher): Promise<Record<string, Value>> {

        const url = pathJoin([this.url, "data", "aliases"])

        let response;
        if (matcher == null) {
            response = await fetch(url, {method: 'POST'})
        } else {
            response = await fetch(url, {method: 'POST', body: JSON.stringify(matcher)})
        }
        return await this.check_status(response)
    }

    public async list_values(matcher?: ValueMatcher): Promise<Record<string, Value>> {
        const url = pathJoin([this.url, "data", "values"])

        let response;
        if (matcher == null) {
            response = await fetch(url, {method: 'POST'})
        } else {
            response = await fetch(url, {method: 'POST', body: JSON.stringify(matcher)})
        }
        return await this.check_status(response)
    }

    async get_aliases_info(matcher?: ValueMatcher): Promise<Record<string, ValueInfo>> {

        const url = pathJoin([this.url, "data", "aliases_info"])
        let data: Record<string, any>;
        let response;
        if (matcher == null) {
            response = await fetch(url, {method: 'POST'})
        } else {
            response = await fetch(url, {method: 'POST', body: JSON.stringify(matcher)})
        }

        return await this.check_status(response)
    }

    async get_values_info(matcher?: ValueMatcher): Promise<Record<string, ValueInfo>> {

        const url = pathJoin([this.url, "data", "values_info"])
        let data: Record<string, any>;
        let response;
        if (matcher == null) {
            response = await fetch(url, {method: 'POST'})
        } else {
            response = await fetch(url, {method: 'POST', body: JSON.stringify(matcher)})
        }

        return await this.check_status(response)        
    }

    async get_alias_names(data_type?: string): Promise<string[]> {
        let url;
        let method;
        if (data_type == null) {
            url = pathJoin([this.url, "data", "alias_names"])
            method = "POST"
        } else {
            url = pathJoin([this.url, "data", "type", data_type, "alias_names"])
            method = "GET"
        }

        const response = await fetch(url, {method: method})
        return await this.check_status(response)
    }

    public async get_alias_names_for_types(data_types: string[]): Promise<Record<string, string[]>> {
        const result: Record<string, string[]> = {}

        // TODO: make this parallel
        for (const data_type of data_types) {
            const value_aliases = await this.get_alias_names(data_type)
            result[data_type] = value_aliases
        }
        return result
    }

    public async render_value(value: string, render_config: Record<string, any>): Promise<RenderValueResult> {
        const url = pathJoin([this.url, "data", "render", value])

        const response = await fetch(url, {method: 'POST', body: JSON.stringify(render_config)});
        return await this.check_status(response)        
    }


    public async get_operation(operation_id: string): Promise<OperationInfo> {

        const url = pathJoin([this.url, "operations", operation_id])
        const response = await fetch(url, {method: 'GET'});
        return await this.check_status(response)
    }

    public async list_operation_ids(filters?: string[], include_internal?: boolean): Promise<string[]> {

        if (filters == null) {
            filters = [];
        }
        if (include_internal == null) {
            include_internal = false;
        }

        const url = pathJoin([this.url, "operations", "ids"])
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({filters: filters, include_internal: include_internal})
        })
        return await this.check_status(response)
    }

    public async list_operations(filters?: string[], include_internal?: boolean) {

        if (filters == null) {
            filters = [];
        }
        if (include_internal == null) {
            include_internal = false;
        }

        const url = pathJoin([this.url, "operations"])
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({filters: filters, include_internal: include_internal})
        })
        return await this.check_status(response)
    }

    public async validate_inputs(inputs: Record<string, any>, inputs_schema: Record<string, ValueSchema>): Promise<Record<string, string>> {

        const url = pathJoin([this.url, "data", "validate", "inputs"])
        const body = JSON.stringify({inputs: inputs, inputs_schema: inputs_schema})
        const response = await fetch(url, {method: 'POST', body: body})
        return await this.check_status(response)
    }

    public async queue_job(operation_id: string, inputs: Record<string, any>, operation_config?: Record<string, any>): Promise<ActiveJob> {

        const url = pathJoin([this.url, "jobs", "queue_job"])
        const body: Record<string, any> = {operation_id: operation_id, inputs: inputs}
        if ( operation_config ) {
            body["operation_config"] = operation_config
        }
        const response = await fetch(url, {method: 'POST', body: JSON.stringify(body)})
        return await this.check_status(response)
    }

    public async monitor_job(job_id: string): Promise<ActiveJob> {

        const url = pathJoin([this.url, "jobs", "monitor_job", job_id])
        const response = await fetch(url, {method: 'GET'})
        return response.json()
    }

    private async check_status(response: Response) {
        if ( response.status >=200 && response.status <=300 ) {
            return await response.json()
        } else {
            const error_model = await response.json();
            const error = new InternalServiceError(error_model.detail);
            throw error;
        }
    }

}

export class KiaraAPI {

    default_url: string;
    context_name: string;
    contexts: Record<string, KiaraContext>;

    constructor(default_url = "http://localhost:8080") {
        this.default_url = default_url;
        this.context_name = "default";
        this.contexts = {};
        this.contexts["default"] = new KiaraRestClientContext(default_url);
    }

    public context(context_name?: string): KiaraContext {
        if (context_name == null) {
            context_name = this.context_name
        }
        return this.contexts[context_name]
    }

}

