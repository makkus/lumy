<script lang="ts">

    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    import type {FieldInfo} from "../models";

    export let current_value = "";
    $: update_value(current_value);
    export let field_info: FieldInfo;

    async function update_value(value) {

        console.log("SCALAR", value)

        let _value = value
        if ( _value == "") {
            _value = null
        }

        dispatch("input_changed", {"field_name": field_info.field_name, "value": _value})
    }


</script>

<section>
  <div class="top-row">
    <div><b>{field_info.field_name}</b> ({field_info.field_schema.type})</div>
  </div>
  <div>{field_info.field_schema.doc.description}</div>
  {#if field_info.field_schema.doc.doc}
    <div>{field_info.field_schema.doc.doc}</div>
  {/if}
  <div>
    <input class="input-field" type="text" bind:value={current_value}>
  </div>
</section>


<style>
    /*section {*/
    /*    display: flex;*/
    /*    flex-direction: column;*/
    /*    align-content: start;*/
    /*    border: solid 1px;*/
    /*    border-radius: 12px;*/
    /*    padding: 0.5em;*/
    /*    width: 100%;*/
    /*    gap: 8px;*/
    /*    background-color: var(--tertiary-color);*/

    /*}*/

    /*.top-row {*/
    /*    display: grid;*/
    /*    grid-template-columns: 1fr 1fr;*/
    /*    justify-content: space-between;*/
    /*}*/

    /*.input-field {*/
    /*    height: 2.2em;*/
    /*    width: 100%;*/
    /*}*/

</style>
