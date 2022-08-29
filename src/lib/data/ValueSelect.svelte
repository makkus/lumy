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

    import type {Value, ValueMatcher} from "../models.ts";

    let selected = {alias: "-- no value --"}
    export let value_matcher: ValueMatcher = null;
    export let only_aliases = true;
    export let field_name = "field";

    $: load_values(value_matcher)
    $: load_values(only_aliases)
    $: load_values(field_name)

    let values = []

    async function load_values(ignore?) {
        let _values;
        if (only_aliases) {
            _values = await $kiara_api.context().list_aliases(value_matcher)
        } else {
            _values = await $kiara_api.context().list_values(value_matcher)
        }
        values = Object.entries(_values).map(function (entry) {
            let obj = {...entry[1]}
            obj.alias = entry[0]
            return obj
        });
        if (values.length > 0) {
            selected = values[0]
            handleSelect({detail: selected})
        }
    }

    function handleSelect(event) {
        selected = event.detail
        dispatch('value_changed', {"value": "value:" + event.detail.value_id, "field_name": field_name});
    }

    // function handleClear(event) {
    //     dispatch('value_changed', {"value": null, "field_name": field_name});
    // }

</script>

<span>
<div class="value-select-listbox">
<Listbox bind:value={selected} on:change={handleSelect} let:open>
		<ListboxButton class="button">
			<span>{selected.alias}</span>
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
    {#each values as item (item.alias)}
      <ListboxOption value={item} class="option">
        {item.alias}
      </ListboxOption>
    {/each}
  </ListboxOptions>
</Listbox>
  <!--<Select containerStyles="height: 2.2em;" items={Object.keys(values)} bind:value={selected} on:select={handleSelect} on:clear={handleClear}></Select>-->
</div>
</span>
<style>
    /* (badly) adapted from: https://joyofcode.xyz/svelte-headless-ui*/
    /*.value-select-listbox {*/
    /*    max-width: 280px;*/
    /*    position: relative;*/
    /*    font-weight: 500;*/
    /*    !*color: hsl(220 20% 98%);*!*/
    /*    color: hsl(220 20% 2%);;*/
    /*}*/

    /*.value-select-listbox :global(.button) {*/
    /*    width: 100%;*/
    /*    display: flex;*/
    /*    justify-content: space-between;*/
    /*    align-items: center;*/
    /*    padding: 1rem;*/
    /*    font-family: inherit;*/
    /*    font-size: inherit;*/
    /*    color: inherit;*/
    /*    !*background-color: hsl(220 20% 2%);*!*/
    /*    background-color: white;*/
    /*    border: none;*/
    /*    border-radius: 10px;*/
    /*}*/

    /*.value-select-listbox :global(.arrows) {*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    display: block;*/
    /*}*/

    /*.value-select-listbox :global(.options) {*/
    /*    position: absolute;*/
    /*    top: 44px;*/
    /*    right: 0;*/
    /*    left: 0;*/
    /*    !*width: 200px;*!*/
    /*    z-index: 10;*/
    /*    padding: 1rem;*/
    /*    !*background-color: hsl(220 20% 4%);*!*/
    /*    background-color: white;*/
    /*    border-radius: 10px;*/
    /*    list-style: none;*/
    /*}*/

    /*.value-select-listbox :global(.option) {*/
    /*    padding: 0.8rem 0.4rem;*/
    /*    cursor: pointer;*/
    /*}*/

    /*.value-select-listbox :global(.option[aria-disabled='true']) {*/
    /*    color: hsl(220 20% 30%);*/
    /*}*/

    /*.value-select-listbox :global(.active) {*/
    /*    color: hsl(220 80% 70%);*/
    /*}*/

    /*.value-select-listbox :global(.active)::before {*/
    /*    content: '👉️ ';*/
    /*}*/

    /*.value-select-listbox :global(.selected) {*/
    /*    font-weight: 700;*/
    /*}*/

    /*.value-select-listbox :global(.selected)::before {*/
    /*    content: '⭐️ ';*/
    /*}*/

</style>
