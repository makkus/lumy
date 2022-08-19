<script lang="ts">
    import Select from 'svelte-select';

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let value_names: string[] = []
    export let selected = undefined

    function handleSelect(event) {
        console.log("SELECTED", event)
        dispatch('selected_value', event.detail.value);
    }

</script>

<span>
<Select items={value_names} value={selected} on:select={handleSelect}></Select>
</span>
