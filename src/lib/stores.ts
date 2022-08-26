import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';
import {KiaraAPI} from "./utils";

export const kiara_api: Writable<KiaraAPI> = writable(new KiaraAPI());
