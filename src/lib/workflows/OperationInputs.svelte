<script lang="ts">

	import ValueInput from "./ValueInput.svelte";
	import type {Operation, ValueSchema} from "../models";

	import {kiara_api} from "../stores.ts";

	export let operation_id: string;
	$: set_operation(operation_id)

	let operation: Operation;

	async function set_operation(operation_id) {

		if ( operation_id == null ) {
			operation = null
			return
		}

		operation = await $kiara_api.get_operation(operation_id);
		console.log("OPERATION", operation)
	}

	function handle_input_changes(event) {
		console.log("INPUT CHANGED", event.detail)
	}

</script>

<section>
{#if (operation != null)}
	{#each Object.entries(operation.module_details.inputs_schema) as [field_name, schema]}
		<ValueInput field_name={field_name} schema={schema} on:input_changed={handle_input_changes}></ValueInput>
	{/each}
{/if}

</section>


<style>
	section {
		height: auto;
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: repeat(3, 1fr);
		align-items: start;
	}

</style>
