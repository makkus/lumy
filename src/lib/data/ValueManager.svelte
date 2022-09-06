<script lang="ts">
    import ValueInfoPanel from './ValueInfoPanel.svelte';
    import ValueInfoList from './ValueInfoList.svelte';

    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    import type {ValueInfo} from "../models.ts";


    let current_value: ValueInfo = null;

    function handle_new_value(new_value_event) {

        let sel: ValueInfo = new_value_event.detail

        if (sel == null) {
            if (current_value == null) {
                return
            } else {
                current_value = sel;
                // current_render_result = null;
            }
        } else {
            if (current_value != null && (current_value.value_id == sel.value_id)) {
                return
            }
            current_value = sel
        }
    }

</script>

<div class="value-manager">
    <div class="file-list">
      <ValueInfoList on:value_changed={handle_new_value}></ValueInfoList>
    </div>
  <div class="value-info-wrap">
    <div class="value-info">
      <ValueInfoPanel value={current_value}/>
    </div>
  </div>
</div>

<style>

    .value-manager {
        height: 100%;
        display: flex;
        flex-direction: row;
        /*justify-content: start;*/
        /*justify-content: stretch;*/
        gap: 20px;
        padding: 1em;
    }

    .file-list {
        background-color: white;
        border: solid 1px;
        border-radius: 1rem;
        padding: 0.5em 1em;
        overflow-y: scroll;
        width: 30%;
    }

    .value-info-wrap {
        width: 100%;
        /*height: 100%;*/
        /*max-width: 100%;*/
        /*min-height: 100%;*/
        border: solid 1px;
        border-radius: 1rem;
        background-color: white;
        overflow: auto;
    }

    .value-info {
        /*justify-content: stretch;*/
        /*overflow: auto;*/
        /*height: 100%;*/
        /*font-size: 0.9rem;*/
        /*border-radius: 1rem;*/
        padding: 1em 2em;
        /*background-color: yellow;*/
        /*max-height: 200px;*/
        /*border: solid 1px;*/
        /*border-radius: 12px;*/
        /*align-self: stretch;*/
        /*height: 85%;*/
    }


</style>
