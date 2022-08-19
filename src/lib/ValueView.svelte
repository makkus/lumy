<script lang="ts">

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let render_result: object = {
        "rendered": undefined,
        "related_scenes": {},
        "manifest_lookup": undefined
    }

    $: html = render_result.rendered
    $: render_scenes = render_result.related_scenes

    function handleClick(event) {
        console.log("NEW RENDER SCENE CLICK")
        console.log(event)
        dispatch('new_render_scene', event);
    }

</script>

<div>
{#if render_scenes}
    {#each Object.entries(render_scenes) as [name, scene]}
        <button on:click={() => handleClick(scene)} disabled={(scene == null) || scene.disabled ? true : false}>
            {name}
        </button>
        {#if scene.disabled}
            {#each Object.entries(scene.related_scenes) as [sub_name, sub_scene]}
                <button on:click={() => handleClick(sub_scene)} disabled={(sub_scene == null) || sub_scene.disabled ? true : false}>
                    {sub_name}
                </button>
            {/each}
        {/if}

    {/each}
{/if}

{#if html}
    {@html html}
{:else }
    No value (yet).
{/if}
</div>


<style>
    /*.table-content :global(table), .table-content :global(th), .table-content :global(td), .table-content :global(thead) {*/
    /*    border: 1px solid;*/
    /*    border-collapse: collapse;*/
    /*    width: 25%;*/
    /*    padding: 8px;*/
    /*}*/

</style>
