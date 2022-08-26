<script lang="ts">

    import {kiara_api} from "../stores.ts"
    import OperationSelect from "./OperationSelect.svelte";
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    import ValueInputsPanel from "../inputs/ValueInputsPanel.svelte";
		import type {OperationInfo, FieldInfo, ActiveJob} from "../models";

    export let operation_id: string;
    export let current_inputs = {}
    let fields_info: Record<string, FieldInfo>;

    let latest_job: ActiveJob = null
		const jobs: ActiveJob[] = []

    async function execute_operation() {
			latest_job = await $kiara_api.context().queue_job(operation_id, current_inputs)
			jobs.push(latest_job)
			console.log("JOB: ", latest_job)
			dispatch("job_queued", latest_job)
    }


</script>

<section>
	<div>
		Current operation: {operation_id}
	</div>
	<div>
		{JSON.stringify(current_inputs)}
	</div>
  <div>
    <button on:click={execute_operation}>
      Run
    </button>
  </div>

</section>


<style>
    section {
        display: grid;
        padding: 8px;
        grid-template-columns: 100%;
        grid-template-rows: auto 1fr;
        gap: 1rem;
    }

    .item {
        height: 100%;
    }
</style>
