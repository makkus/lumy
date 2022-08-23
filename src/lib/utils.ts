// from: https://stackoverflow.com/questions/29855098/is-there-a-built-in-javascript-function-similar-to-os-path-join
import type {Operation, RenderValueResult, Value, ValueInfo, ValueMatcher} from "./models";

export function pathJoin(parts: string[], sep="/"){
    const separator = sep || '/';
    parts = parts.map((part, index)=>{
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

 export abstract class KiaraAPI {

     value_cache: Record<string, Value>;
     operation_cache: Record<string, Operation>;

     constructor() {
         this.value_cache = {}
         this.operation_cache = {}
     }

     public abstract get_operation(operation_id: string): Promise<Operation>;

     public abstract render_value(value: string, render_config: Record<string, any>): Promise<RenderValueResult>;

     public abstract list_aliases(matcher?: ValueMatcher): Promise<Record<string, Value>>;

     public abstract list_values(matcher?: ValueMatcher): Promise<Record<string, Value>>;

     public abstract get_alias_names(data_type?: string): Promise<string[]>;

     public abstract get_aliases_info(matcher?: ValueMatcher): Promise<Record<string, ValueInfo>>;

     public abstract get_alias_names_for_types(data_types: string[]): Promise<Record<string, string[]>>;


 }

 export class KiaraRestClientAPI extends KiaraAPI {

    url: string;

     constructor(url="http://localhost:8080") {
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
		const result = await response.json()
		return result
     }

     public async list_values(matcher?: ValueMatcher): Promise<Record<string, Value>> {
         const url = pathJoin([this.url, "data", "values"])

         let response;
         if (matcher == null) {
             response = await fetch(url, {method: 'POST'})
         } else {
             response = await fetch(url, {method: 'POST', body: JSON.stringify(matcher)})
         }
		const result = await response.json()
		return result
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

		const result = await response.json()
		return result
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

		const result = await response.json()
		return result
    }

	async get_alias_names(data_type?: string): Promise<string[]> {
         let url;
         let method;
         if (data_type == null) {
             url = pathJoin([this.url, "data", "alias_names"])
             method = "POST"
         } else{
             url = pathJoin([this.url, "data", "type", data_type, "alias_names"])
             method = "GET"
         }

		const response = await fetch(url, {method: method})
		const result = await response.json()
		return result
	}

	public async get_alias_names_for_types(data_types: string[]): Promise<Record<string, string[]>> {
		console.log("RETRIEVE" + data_types)
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
        return await response.json();
    }


    public async get_operation(operation_id: string): Promise<Operation> {

         // if (operation_id in Object.keys(this.operation_cache)) {
         //     return new Promise(resolve => resolve(this.operation_cache[operation_id]))
         // }

        const url = pathJoin([this.url, "operations", operation_id])
		const response = await fetch(url, {method: 'GET'});
        return await response.json();
    }


 }
