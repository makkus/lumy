<script lang="ts">

    import {kiara_api} from "../stores.ts"
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

		import type {ActiveJob} from "../models";
		import {InternalServiceError} from "../utils";

    export let operation_id: string;
    export let current_inputs = {};

    let latest_job: ActiveJob = null;
		let latest_error: InternalServiceError = null;
		const jobs: ActiveJob[] = []

    async function execute_operation() {
			try {
				latest_job = await $kiara_api.context().queue_job(operation_id, current_inputs)
				jobs.push(latest_job);
				latest_error = null;
				dispatch("job_queued", latest_job)
			} catch (e) {
				latest_job = null;
				latest_error = e
				dispatch("job_queue_error", e)
			}
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
	{#if latest_error}
		Job queue error: {latest_error.msg}
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
