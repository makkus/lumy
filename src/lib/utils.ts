// from: https://stackoverflow.com/questions/29855098/is-there-a-built-in-javascript-function-similar-to-os-path-join
import type {
    ActiveJob, InternalErrorModel,
    Operation,
    OperationInfo, PipelineStructureInfo,
    RenderValueResult,
    Value,
    ValueInfo,
    ValueMatcher,
    ValueSchema, WorkflowInfo
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

/**
 * Format bytes as human-readable text.
 *
 * Copied from: https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export function humanFileSize(bytes: number, si=false, dp=2) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
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

    public abstract get_value_info(value: string): Promise<ValueInfo>;

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

    public abstract render_value_info(value: string): Promise<string>;

    public abstract get_value_lineage(value: string): Promise<Record<string, any>>;

    public abstract get_workflow_info(workflow_id: string): Promise<WorkflowInfo>;

    public abstract get_pipeline_structure(pipeline: string): Promise<PipelineStructureInfo>;

}

export class KiaraRestClientContext extends KiaraContext {

    url: string;

    constructor(url: string) {
        super()
        this.url = url;
    }

    public async get_value_info(value: string): Promise<ValueInfo> {
        const url = pathJoin([this.url, "data" , "value_info", value])

        const response = await fetch(url, {method: 'GET'})
        return await this.check_status(response)
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
        const url = pathJoin([this.url, "render", "value", value, "html"])

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
        return await this.check_status(response)
    }

    public async render_value_info(value: string): Promise<string> {

        const url = pathJoin([this.url, "render", "value_info", value, "html"])

        const response = await fetch(url, {method: 'POST'})
        return await this.check_status(response)
    }

    public async get_value_lineage(value: string): Promise<Record<string, any>> {

        const url = pathJoin([this.url, "data", "lineage", value])

        const response = await fetch(url, {method: 'GET'})
        return await this.check_status(response)
    }

    public async get_workflow_info(workflow_id: string) {

        const url = pathJoin([this.url, "workflows", "workflow_info", workflow_id])

        const response = await fetch(url, {method: "GET"})
        return await this.check_status(response)
        
    }

    public async get_pipeline_structure(pipeline: string) {
        const url = pathJoin([this.url, "pipelines", "structure", pipeline])
        const response = await fetch(url, {method: "Get"})
        return await this.check_status(response)
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

    constructor(backend_url: string = "http://localhost:8080") {
        console.log("BACKEND")
        console.log(backend_url)
        this.default_url = backend_url;
        this.context_name = "default";
        this.contexts = {};
        this.contexts["default"] = new KiaraRestClientContext(backend_url);
    }

    public context(context_name?: string): KiaraContext {
        if (context_name == null) {
            context_name = this.context_name
        }
        return this.contexts[context_name]
    }

}

