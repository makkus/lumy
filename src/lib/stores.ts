import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';
import {KiaraAPI} from "./utils";
// import {env} from "./env.js"

// const BACKEND = env.BACKEND ? env.BACKEND : "http://localhost:8080"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const kiara_api: Writable<KiaraAPI> = writable(new KiaraAPI(BACKEND_URL));
