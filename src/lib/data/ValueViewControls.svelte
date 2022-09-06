<script lang="ts">

    import type {RenderScene} from "../models";
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let related_scenes: Record<string, RenderScene> = null;

    function handleClick(scene_config) {
        dispatch('render_request', scene_config);
    }

</script>

<section>
  {#if related_scenes != null}
    <div class="control-row">
      {#each Object.entries(related_scenes) as [name, scene]}
        <button class="control-button" on:click={() => handleClick(scene)} disabled={(scene == null) || scene.disabled}>
          {name}
        </button>
      {/each}
    </div>

    <div class="control-row">
      {#each Object.entries(related_scenes) as [name, scene]}
        {#if (scene != null)}
          {#each Object.entries(scene.related_scenes) as [sub_name, sub_scene]}
            <button class="control-button" on:click={() => handleClick(sub_scene)}
                    disabled={(sub_scene == null) || sub_scene.disabled}>
              {sub_name}
            </button>
          {/each}
        {/if}
      {/each}
    </div>
  {/if}
</section>

<style>

    .control-row {
        display: flex;
        justify-content: center;
        gap: 8px;
        padding: 4px;
    }

    /*.control-button {*/
    /*    font-size: small;*/
    /*    border-radius: 8px;*/
    /*    border: solid 1px #999999;*/
    /*    padding-top: 6px;*/
    /*    padding-bottom: 6px;*/
    /*    margin-bottom: 8px;*/
    /*    margin-left: 4px;*/
    /*    margin-right: 4px;*/
    /*}*/

    /*.control-button:hover {*/
    /*    background-color: var(--primary-color);*/
    /*}*/


</style>
