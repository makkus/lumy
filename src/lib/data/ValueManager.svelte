<script lang="ts">
    import ValueInfo from './ValueInfo.svelte';
    import ValueList from './ValueList.svelte';

    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    let current_value: string = null;

    function handle_new_value(new_value_event) {

        let sel: string = new_value_event.detail

        if (sel == null) {
            if (current_value == null) {
                return
            } else {
                current_value = sel;
                // current_render_result = null;
            }
        } else {
            if (current_value != null && (current_value == sel)) {
                return
            }
            current_value = sel
        }
    }

</script>

<section>
  <div class="file-list">
    <ValueList on:value_changed={handle_new_value}></ValueList>
  </div>
  <div class="value-info">
    <ValueInfo value={current_value}/>
  </div>
</section>

<style>

    section {
        display: grid;
        height: 80vh;
        gap: 20px;
        grid-template-columns: minmax(15rem, 35%) minmax(25rem, 65%);
        padding: 1em;
    }

    .file-list {
        display: grid;
        /*overflow-x: auto;*/
        background-color: white;
        /*border: solid 1px;*/
        border-radius: 12px;
        /*align-self: stretch;*/
        /*height: 85%;*/
    }

    .value-info {
        display: grid;
        justify-content: stretch;
        /*overflow: auto;*/
        background-color: white;
        /*border: solid 1px;*/
        border-radius: 12px;
        /*align-self: stretch;*/
        /*height: 85%;*/
    }


</style>
