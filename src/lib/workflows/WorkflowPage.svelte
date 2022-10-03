<script lang="ts">
    import JSONTree from 'svelte-json-tree';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    import {kiara_api} from "../stores.ts";
    import WorkflowStage from "$lib/workflows/WorkflowStage.svelte";

    export let workflow_id_or_alias: string;

    let pipeline_structure = null;

    $: set_pipeline_structure(workflow_id_or_alias)

    async function set_pipeline_structure(_workflow_id) {
        if (_workflow_id == null) {
            pipeline_structure = null
            return
        }
        pipeline_structure = await $kiara_api.context().get_pipeline_structure("workflow:" + _workflow_id);
    }

</script>

<section>
  {#if (pipeline_structure)}
    <JSONTree value={pipeline_structure}></JSONTree>
  {#each Object.entries(pipeline_structure.processing_stages_info) as [stage_idx, stage_info]}
    <WorkflowStage pipeline_stage_idx={stage_idx} pipeline_structure="{pipeline_structure}"></WorkflowStage>
  {/each}

    {:else}
    Loading pipeline structure....
    {/if}
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
