<script lang="ts">

    import SvelteTable from "svelte-table/src/SvelteTable.svelte";
    import {createEventDispatcher, onMount} from 'svelte';
    const dispatch = createEventDispatcher();

    import {kiara_api} from "../stores.ts";

    import type {ValueInfo} from "../models";


    var selected_value: string[] = [];
    var current_value: string[] = [];

    let values_info: Record<string, ValueInfo> = {};

    $: handle_new_value(selected_value)

    kiara_api.subscribe( async (api) => {
      if (api != null) {
        api.list_aliases().then((aliases_info) => values_info = aliases_info)
      }
    })


    $: aliases = Object.keys(values_info);
    $: value_entries = Object.entries(values_info);
    $: value_objs = value_entries.map(function (entry) {
        let obj = { ...entry[1] }
        obj.alias = entry[0]
        return obj
    })

    // onMount(async () => {
    //   if ($kiara_api != null) {
	// 	values = await $kiara_api.get_alias_names()
    //   }
	// });

    let columns = [
        {
            key: "alias",
            title: "Alias",
            value: v => v.alias
        },
        {
            key: "data_type_name",
            title: "Type",
            value: v => v.value_schema.type
        }
    ]

    function handle_new_value(sel) {

        if ( sel.length == 0) {
            if ( current_value.length == 0 ) {
                return
            } else {
                current_value = sel;
                dispatch('value_changed', null);
            }
        } else {
            if ( current_value.length == 1 && (current_value[0] == sel[0]) ) {
                return
            }
            current_value = sel
            dispatch('value_changed', current_value[0]);
        }
    }

</script>

<section >

  <SvelteTable
    columns={columns}
    rows={value_objs}
    bind:selected={selected_value}
    rowKey="alias"
    selectSingle={true}
    selectOnClick={true}
    classNameRow="list-row"
    classNameRowSelected="selected-list-row"
  >

  </SvelteTable>

</section>

<style>
  	section {
      overflow: auto;
      height: 100%;
      /*width: 100%;*/
      border: solid 1px;
      border-radius: 12px;
      padding: 1em;
	}

    :global(.list-row) {
      cursor: pointer;
      font-size: small;
    }
    :global(.selected-list-row) {
      background-color: lightskyblue;
    }
</style>
