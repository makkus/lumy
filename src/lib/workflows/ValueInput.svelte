<script lang="ts">

    import {createEventDispatcher, onMount} from 'svelte';
    const dispatch = createEventDispatcher();

	import ValueInfo from "../data/ValueInfo.svelte";
    import ValueSelect from "../data/ValueSelect.svelte"
    import type {ValueSchema} from "../models";

    export let field_name: string;
    export let schema: ValueSchema;

    let selected_value = null;

    function handle_value_changed(event) {
        selected_value = event.detail.value
        dispatch("input_changed", event.detail)
    }


</script>

<section>
<div><b>{field_name}</b> ({schema.type})</div>
<div>{schema.doc.description}</div>
{#if schema.doc.doc}<div>{schema.doc.doc}</div>{/if}
<div>
    <ValueSelect field_name={field_name}, value_matcher={{data_types: [schema.type]}} on:value_changed={handle_value_changed}></ValueSelect>
</div>
<div>
    <ValueInfo value={selected_value} ></ValueInfo>
</div>
</section>


<style>

    section {
        display: grid;
        grid-template-columns: 100%;
        justify-content: stretch;
        align-content: start;
        border: solid 1px;
        border-radius: 12px;
        padding: 0.5em;
        height: 100%;
        width: 100%;
        max-height: 200px;
        gap: 4px;
    }

</style>
