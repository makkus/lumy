<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import {onMount} from "svelte";
	import {kiara_api} from "../lib/stores.ts";
	import {KiaraRestClientContext} from "../lib/utils";

	// import {kiara_service_url} from "./data/+page.svelte";
	let kiara_service_url = "http://localhost:8080"

</script>


<main>
<Header />
	<slot />

<footer>
	<p>visit <a href="https://dharpa.org/kiara.documentation">dharpa.org/kiara.documentation</a> to learn more about kiara</p>
</footer>
</main>


<style>
	main {
		/*display: grid;*/
		/*grid-template-rows: auto 1fr auto;*/
		/*width: 98vw;*/
		/*height: 98vh;*/
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}
</style>
