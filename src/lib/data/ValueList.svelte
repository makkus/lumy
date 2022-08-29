<script lang="ts">

    import SvelteTable from "svelte-table/src/SvelteTable.svelte";
    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    import {kiara_api} from "../stores.ts";

    import type {ValueInfo} from "../models";

    export let columns_to_display = ["alias"]


    var selected_value: string[] = [];
    var current_value: string[] = [];

    let values_info: Record<string, ValueInfo> = {};

    // TODO: subscribe to store and new values
    $kiara_api.context().get_aliases_info().then((aliases_info) => values_info = aliases_info);
    $: handle_new_value(selected_value)

    $: aliases = Object.keys(values_info);
    $: value_entries = Object.entries(values_info);
    $: value_objs = value_entries.map(function (entry) {
        let obj = {...entry[1]}
        obj.alias = entry[0]
        return obj
    })

    let columns = []
    if (columns_to_display.includes("alias")) {
        columns.push(
            {
                key: "alias",
                title: "Alias",
                value: v => v.alias
            }
        )
    }
    if (columns_to_display.includes("data_type")) {
        columns.push(
            {
                key: "data_type_name",
                title: "Type",
                value: v => v.value_schema.type
            }
        )
    }


    function handle_new_value(sel) {

        if (sel.length == 0) {
            if (current_value.length == 0) {
                return
            } else {
                current_value = sel;
                dispatch('value_changed', null);
            }
        } else {
            if (current_value.length == 1 && (current_value[0] == sel[0])) {
                return
            }
            current_value = sel
            dispatch('value_changed', current_value[0]);
        }
    }

</script>

<section>

  <SvelteTable
      columns={columns}
      rows={value_objs}
      bind:selected={selected_value}
      rowKey="alias"
      selectSingle={true}
      selectOnClick={true}
      classNameRow="value-list-row"
      classNameRowSelected="value-list-selected-list-row"
  >

  </SvelteTable>

</section>

<style>
    /*section {*/
    /*    height: 100%;*/
    /*    width: 100%;*/
    /*    !*border: solid 1px;*!*/
    /*    !*border-radius: 12px;*!*/
    /*    padding: 1em;*/
    /*}*/

    /*:global(.value-list-row) {*/
    /*    cursor: pointer;*/
    /*    font-size: small;*/
    /*}*/

    /*:global(.value-list-selected-list-row) {*/
    /*    background-color: lightskyblue;*/
    /*}*/
</style>
