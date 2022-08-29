<script lang="ts">
    import ValueView from './ValueView.svelte';
    import ValueViewControls from './ValueViewControls.svelte';
    import type {RenderValueResult} from "../models";
    import {kiara_api} from "../stores.ts";
    import {InternalServiceError} from "../utils";

    export let value = null;
    let current_value = null;
    let render_result: RenderValueResult = null;
    let render_error: InternalServiceError = null;
    let no_related_scenes = false;

    function handle_new_value(sel) {

        if (sel == null) {
            if (current_value == null) {
                return
            } else {
                current_value = sel;
                render_result = null;
            }
        } else {
            if (current_value != null && (current_value == sel)) {
                return
            }
            current_value = sel
            render_value({})

        }
    }

    $: handle_new_value(value)

    async function render_value(render_config) {
        if (current_value == null) {
            no_related_scenes = true;
            render_result = null;
        } else {
            try {
                const new_render_result = await $kiara_api.context().render_value(current_value, render_config)
                render_error = null;
                if (new_render_result.related_scenes) {
                    for (const key in new_render_result.related_scenes) {
                        let _value = new_render_result.related_scenes[key]
                        if (_value != null) {
                            if (!_value.disabled) {
                                no_related_scenes = false
                                render_result = new_render_result
                                return
                            }
                        }
                    }
                }
                // no related scenes
                no_related_scenes = true;
                render_result = new_render_result
            } catch (e) {
                console.log("ERROR", e.msg)
                render_result = null;
                no_related_scenes = true;
                render_error = e;
            }
        }
    }


    async function handle_render_request(render_request_event) {
        await render_value(render_request_event.detail.render_config)
    }

</script>
<div class="tabs">
  <div class="preview-panel">
    {#if (render_error != null)}
      <div class="no-value-panel">
        <ValueView rendered_value={render_error.msg}/>
      </div>
    {:else}
      {#if no_related_scenes}
        <div class="preview-control"></div>
      {:else}
        <div class="preview-control">
          {#if (render_result != null)}
            <ValueViewControls related_scenes={render_result.related_scenes}
                               on:render_request={handle_render_request}></ValueViewControls>
          {/if}
        </div>
      {/if}
      <div class="preview-wrap">
        {#if (render_result == null)}
          <ValueView rendered_value={null}/>
        {:else}
          <ValueView rendered_value={render_result.rendered}/>
        {/if}
      </div>
    {/if}
  </div>
</div>
<style>

    /*.tabs {*/
    /*    display: grid;*/
    /*    grid-template-rows: 100%;*/
    /*    align-content: stretch;*/
    /*    height: 100%;*/
    /*}*/

    /*.preview-panel {*/
    /*    display: grid;*/
    /*    grid-template-rows: auto 1fr;*/
    /*    padding: 1em;*/
    /*    !*border: solid 1px;*!*/
    /*    gap: 1em;*/
    /*    height: 500px;*/
    /*    !*height: calc(100% - 20px);*!*/
    /*    !*width: calc(100% - 20px);*!*/
    /*    !*background-color: yellow;*!*/
    /*}*/

    /*.preview-control {*/
    /*    !*background-color: blue;*!*/
    /*}*/


</style>
