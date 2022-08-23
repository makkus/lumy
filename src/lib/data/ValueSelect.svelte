<script lang="ts">
    import Select from 'svelte-select';
    import {kiara_api} from "../stores.ts";

    import {createEventDispatcher, onMount} from 'svelte';
    const dispatch = createEventDispatcher();

    import type {ValueMatcher} from "../models";

    export let value_matcher: ValueMatcher = null;

    export let only_aliases = true;
    export let field_name = "field"

    $: load_values(value_matcher)
    $: load_values(only_aliases)
    $: load_values(field_name)

    export let selected = undefined

    let values = {}

    // kiara_api.subscribe( async (api) => {
    //   if (api != null) {
    //       await load_values()
    //   }
    // })

    async function load_values(ignore?) {
        if ( only_aliases ) {
            values = await $kiara_api.list_aliases(value_matcher)
        } else {
            values = await $kiara_api.list_values(value_matcher)
        }
    }

    function handleSelect(event) {
        dispatch('value_changed', {"value": event.detail.value, "field": field_name});
    }

</script>

<span>
<Select items={Object.keys(values)} value={selected} on:select={handleSelect}></Select>
</span>
