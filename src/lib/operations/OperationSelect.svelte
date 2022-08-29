<script lang="ts">
    import {
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        ListboxLabel
    } from "@rgossiaux/svelte-headlessui";

    import {kiara_api} from "../stores.ts";

    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    export let selected = "-- no operations --";
    let operation_ids: string[] = []

    // TODO: subscribe to api and operation changes
    $kiara_api.context().list_operation_ids().then((op_ids) => {
        operation_ids = op_ids;
    })
    $: (operation_ids.length > 0) ? handleSelect({detail: operation_ids[0]}) : handleSelect({detail: "-- no operations --"})

    function handleSelect(event) {
        selected = event.detail
        dispatch('operation_changed', event.detail);
    }

    // async function handleClear(event) {
    //     dispatch('operation_changed', null);
    // }

</script>
<span>
<div class="operation-select-listbox">
<Listbox value={selected} on:change={handleSelect} let:open>
		<ListboxButton class="button">
			<span>{selected}</span>
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
    {#each operation_ids as item (item)}
      <ListboxOption value={item} class="option">
        {item}
      </ListboxOption>
    {/each}
  </ListboxOptions>
</Listbox>
  <!--<Select containerStyles="height: 2.2em;" items={Object.keys(values)} bind:value={selected} on:select={handleSelect} on:clear={handleClear}></Select>-->
</div>
</span>

<style>
    /* (badly) adapted from: https://joyofcode.xyz/svelte-headless-ui*/
    /*.operation-select-listbox {*/
    /*    max-width: 280px;*/
    /*    position: relative;*/
    /*    font-weight: 500;*/
    /*    !*color: hsl(220 20% 98%);*!*/
    /*    color: hsl(220 20% 2%);;*/
    /*}*/

    /*.operation-select-listbox :global(.button) {*/
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

    /*.operation-select-listbox :global(.arrows) {*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    display: block;*/
    /*}*/

    /*.operation-select-listbox :global(.options) {*/
    /*    position: absolute;*/
    /*    top: 44px;*/
    /*    right: 0;*/
    /*    left: 0;*/
    /*    !*width: 200px;*!*/
    /*    padding: 1rem;*/
    /*    !*background-color: hsl(220 20% 4%);*!*/
    /*    background-color: white;*/
    /*    border-radius: 10px;*/
    /*    list-style: none;*/
    /*}*/

    /*.operation-select-listbox :global(.option) {*/
    /*    padding: 0.8rem 0.4rem;*/
    /*    cursor: pointer;*/
    /*}*/

    /*.operation-select-listbox :global(.option[aria-disabled='true']) {*/
    /*    color: hsl(220 20% 30%);*/
    /*}*/

    /*.operation-select-listbox :global(.active) {*/
    /*    color: hsl(220 80% 70%);*/
    /*}*/

    /*.operation-select-listbox :global(.active)::before {*/
    /*    content: '👉️ ';*/
    /*}*/

    /*.operation-select-listbox :global(.selected) {*/
    /*    font-weight: 700;*/
    /*}*/

    /*.operation-select-listbox :global(.selected)::before {*/
    /*    content: '⭐️ ';*/
    /*}*/

</style>
