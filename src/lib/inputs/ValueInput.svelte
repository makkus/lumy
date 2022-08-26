<script lang="ts">

    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    import ValueInfo from "../data/ValueInfo.svelte";
    import ValueSelect from "../data/ValueSelect.svelte"
    import type {FieldInfo} from "../models";

    export let field_info: FieldInfo;

    export let show_info = false;
    let section_style = "section-no-info"
    $: section_style = show_info ? "height: 100%" : ""

    let selected_value = null;


    let disable_preview = "disabled";
    $: disable_preview = (selected_value == null) ? "disabled" : ""

    function handle_value_changed(event) {
        selected_value = event.detail.value
        if (selected_value == null) {
            show_info = false
        }
        const data = event.detail
        dispatch("input_changed", data)
    }


</script>

<section style="{section_style}">
  <div class="top-row">
    <div><b>{field_info.field_name}</b> ({field_info.field_schema.type})</div>
    <label style="justify-self: end">Preview
      {#if selected_value === null }
        <input type=checkbox bind:checked={show_info} disabled>
      {:else}
        <input type=checkbox bind:checked={show_info}>
      {/if}
    </label>
  </div>
  <div>{field_info.field_schema.doc.description}</div>
  {#if field_info.field_schema.doc.doc}
    <div>{field_info.field_schema.doc.doc}</div>
  {/if}
  <div>
    <ValueSelect field_name={field_info.field_name} value_matcher={{data_types: [field_info.field_schema.type]}}
                 on:value_changed={handle_value_changed}></ValueSelect>
  </div>
  {#if show_info}
    <div class="value-info">
      <ValueInfo value={selected_value}></ValueInfo>
    </div>
  {/if}
</section>


<style>
    section {
        display: flex;
        flex-direction: column;
        align-content: start;
        border: solid 1px;
        border-radius: 12px;
        padding: 0.5em;
        width: 100%;
        gap: 8px;
        background-color: var(--tertiary-color);
    }

    .value-info {
        margin: 0px;
        /*background-color: white;*/
        height: 100%;
        width: 100%;
        display: grid;
    }

    .top-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: space-between;
    }

</style>
