<script lang="ts">

    import SvelteTable from "svelte-table/src/SvelteTable.svelte";
    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    import {kiara_api} from "../stores.ts";

    import type {ValueInfo} from "../models";
    import {humanFileSize} from "../utils";

    // TODO: subscribe to store and new values
    export let columns_to_display = ["alias"]
    export let selected_alias = null;

    let all_values_info: Record<string, ValueInfo> = {};
    let rows = []

    let current_alias = null;
    let current_value: ValueInfo = null;

    let selected_aliases = [];

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
    if (columns_to_display.includes("data_type_name")) {
        columns.push(
            {
                key: "data_type_name",
                title: "Type",
                value: v => v.value_schema.type
            }
        )
    }
    if (columns_to_display.includes("size")) {
        columns.push(
            {
                key: "value_size",
                title: "Size",
                value: v => humanFileSize(v.value_size)
            }
        )
    }

    onMount( async () => {
        await load_values()
    })

    async function load_values() {
        all_values_info = await $kiara_api.context().get_aliases_info();
        rows = Object.entries(all_values_info).map(
            function (entry) {
                let obj = {...entry[1]}
                obj.alias = entry[0]
                return obj
        })
        // handle_new_selected_alias(selected_alias)
    }

    $: handle_selection_update(selected_aliases);
    $: handle_new_selected_alias(current_alias)
    $: handle_new_selected_alias(selected_alias)

    function handle_selection_update(new_aliases: string[]) {
        console.log("SELECTION UPDATE", new_aliases)

        if ( new_aliases.length == 0 || (new_aliases.length == 1 && new_aliases[0] == null)) {
            if ( current_alias == null ) {
                return
            } else {
                current_alias = null;
            }
        } else if ( new_aliases.length > 1 ) {
            throw Error("Invalid selection, only 1 element can be selected at any one time.")
        } else {
            handle_new_selected_alias(new_aliases[0])
            // const sel = all_values_info[selected_alias]
            // if ( sel != null) {
            //     selected_aliases = sel.aliases
            // }
        }
    }

    function handle_new_selected_alias(new_alias) {

        console.log("VALUELIST HANDLE ALIAS", new_alias, current_value)

        if (new_alias == null) {
            if (current_alias == null) {
                return
            } else {
                current_alias = null;
                current_value = null;
                selected_alias = null;
                dispatch('value_changed', null);
                dispatch('alias_changed', null);
            }
        } else {
            if ( current_value == null || ! current_value.aliases.includes(new_alias) ) {
                const new_value = all_values_info[new_alias]
                if (new_value == null) {
                    if ( Object.keys(all_values_info).length === 0 ) {
                        // means not initialized yet
                    } else {
                        throw Error("Could not find value for alias: " + new_alias)
                    }
                } else {
                    if (current_value == null || new_value.value_id != current_value.value_id) {
                        current_value = new_value
                        dispatch("value_changed", current_value)
                        selected_aliases = new_value.aliases
                    }
                    dispatch("alias_changed", new_alias)
                    current_alias = new_alias
                    if ( selected_alias != current_alias ) {
                        selected_alias = current_alias
                    }
                }

            } else {
                return
            }

        }
    }

</script>

<section>

  <SvelteTable
      columns={columns}
      rows={rows}
      bind:selected={selected_aliases}
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

    :global(.value-list-row) {
        cursor: pointer;
    }

    :global(.value-list-selected-list-row) {
        background-color: var(--primary-color);
    }
</style>
