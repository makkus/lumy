<script lang="ts">

    import {createEventDispatcher, onMount} from 'svelte';
    const dispatch = createEventDispatcher();

    import ValueInputsPanel from "../inputs/ValueInputsPanel.svelte";
    import type {OperationInfo, FieldInfo} from "../models";

    import {kiara_api} from "../stores.ts";

    export let display_operation_select = false;
    export let workflow_id: string;
    export let workflow_stage: number;

    let workflow = null;

    async function set_workflow_stage(_workflow_id, _workflow_stage) {
        if (_workflow_id == null) {
            operation = null
            return
        }

        operation = await $kiara_api.context().get_operation(operation_id);
        fields_info = operation.input_fields
    }

    async function forward_event(event) {
        console.log("FORWARD", event.type)
        dispatch(event.type, event.detail)
    }

    async function handle_new_operation(event) {
        operation_id = event.detail
        dispatch("operation_changed", operation_id)
    }

</script>

<section>
  {#if display_operation_select }
    <div class="item">
      <OperationSelect on:operation_changed={handle_new_operation}></OperationSelect>
    </div>
  {/if}
  <div class="item">
    <ValueInputsPanel fields_info={fields_info} on:input_updated={forward_event}
                      on:inputs_updated={forward_event}></ValueInputsPanel>
  </div>
</section>


<style>
    /*section {*/
    /*    display: grid;*/
    /*    padding: 8px;*/
    /*    grid-template-columns: 100%;*/
    /*    grid-template-rows: auto 1fr;*/
    /*    gap: 1rem;*/
    /*}*/

    /*.item {*/
    /*    height: 100%;*/
    /*}*/
</style>
