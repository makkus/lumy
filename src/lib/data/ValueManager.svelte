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

<section>
  <div class="file-list">
    <ValueInfoList on:value_changed={handle_new_value}></ValueInfoList>
  </div>
  <div class="value-info">
    <ValueInfoPanel value={current_value}/>
  </div>
</section>

<style>

    /*section {*/
    /*    display: grid;*/
    /*    height: 80vh;*/
    /*    gap: 20px;*/
    /*    grid-template-columns: minmax(15rem, 35%) minmax(25rem, 65%);*/
    /*    padding: 1em;*/
    /*}*/

    /*.file-list {*/
    /*    display: grid;*/
    /*    !*overflow-x: auto;*!*/
    /*    background-color: white;*/
    /*    !*border: solid 1px;*!*/
    /*    border-radius: 12px;*/
    /*    !*align-self: stretch;*!*/
    /*    !*height: 85%;*!*/
    /*}*/

    /*.value-info {*/
    /*    display: grid;*/
    /*    justify-content: stretch;*/
    /*    !*overflow: auto;*!*/
    /*    background-color: white;*/
    /*    !*border: solid 1px;*!*/
    /*    border-radius: 12px;*/
    /*    !*align-self: stretch;*!*/
    /*    !*height: 85%;*!*/
    /*}*/


</style>
