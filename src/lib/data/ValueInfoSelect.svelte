<script lang="ts">
    import {
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        ListboxLabel
    } from "@rgossiaux/svelte-headlessui";

    import {kiara_api} from "../stores.ts";

    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    import type {ValueInfo, ValueMatcher} from "../models.ts";
    import {NOT_SET_VALUE_ID} from "../utils.ts";

    // TODO: subscribe to store and new values
    let all_values_info: Record<string, ValueInfo> = {};
    let rows = []

    export let selected_alias = null;
    let current_alias = null;
    // let selected_value: ValueInfo = null;
    $: handle_new_alias(selected_alias)

    let current_value = {alias: "-- no value --", value_id: NOT_SET_VALUE_ID}
    export let value_matcher: ValueMatcher = null;
    export let field_name = "field";

    // $: update_rows(all_values_info)

    $: load_values(value_matcher)
    // $: load_values(field_name)

    function update_rows(new_aliases_info) {
        rows = Object.entries(new_aliases_info).map(
            function (entry) {
                let obj = {...entry[1]}
                obj.alias = entry[0]
                return obj
        })
    }

    async function load_values(ignore?) {
        all_values_info = await $kiara_api.context().get_aliases_info(value_matcher)
        update_rows(all_values_info)
        rows = Object.entries(all_values_info).map(function (entry) {
            let obj = {...entry[1]}
            obj.alias = entry[0]
            return obj
        });
        if (rows.length > 0) {
            selected_alias = rows[0].alias
        }
    }

    onMount( async () => {
        await load_values(value_matcher)
    })

    function handle_new_alias(new_alias) {
        console.log("HANDLE NEW ALIAS", new_alias)
        if ( current_alias == new_alias ) {
            return
        }
        if (new_alias == null) {
            current_alias = null;
            current_value = null;
            dispatch("alias_changed", null)
            dispatch("value_changed", null)
        } else {
            current_alias = new_alias
            current_value = all_values_info[current_alias]
            dispatch("alias_changed", current_alias)
            dispatch("value_changed", current_value)
        }

    }

    function handleSelect(event) {
        const _selected_alias = event.detail.alias
        console.log("SELECTED", _selected_alias)
        if (_selected_alias == current_alias) {
            return
        }
        selected_alias = _selected_alias
    }

    // function handleClear(event) {
    //     dispatch('value_changed', {"value": null, "field_name": field_name});
    // }

</script>

<span>
<div class="value-select-listbox">
<Listbox bind:value={current_alias} on:change={handleSelect} let:open>
		<ListboxButton class="button">
			<span>{#if (current_alias == null )}--no value --{:else}{current_alias}{/if}</span>
			<svg
          width="20"
          height="20"
          class="arrows"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
      >
				<path
            fill-rule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
        />
			</svg>
		</ListboxButton>
  <ListboxOptions class="options">
    {#each rows as item (item)}
      <ListboxOption value={item} class="option">
        {item.alias}
      </ListboxOption>
    {/each}
  </ListboxOptions>
</Listbox>

</div>
</span>
<style>

     /*(badly) adapted from: https://joyofcode.xyz/svelte-headless-ui*/
    .value-select-listbox {
        position: relative;
        font-weight: 500;
    }

    .value-select-listbox :global(.button) {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.4em 0.8em;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        background-color: white;
        border-radius: 10px;
    }


    .value-select-listbox :global(.options) {
        position: absolute;
        max-height: 250px;
        overflow: scroll;
        top: 44px;
        right: 0;
        left: 0;
        z-index: 10;
        padding: 1rem;
        background-color: var(--secondary-color);
        border-radius: 10px;
        list-style: none;
    }

    .value-select-listbox :global(.option) {
        padding: 0.4rem 0.4rem;
        cursor: pointer;
    }

</style>
