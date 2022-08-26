<script lang="ts">
	import OperationInputs from "../../lib/operations/OperationInputs.svelte";
	import OperationExecutePanel from "../../lib/operations/OperationExecutePanel.svelte";
	import JobMonitorPanel from "../../lib/jobs/JobMonitorPanel.svelte";

	import type {ActiveJob} from "../../lib/models";
	let current_operation_id = null;
	let current_inputs = {};
	let latest_job: ActiveJob = null;
	let latest_job_id = null;

	function handle_operation_changed(event) {
		current_operation_id = event.detail;
	}
	function handle_inputs_changed(event) {
		current_inputs = event.detail;
	}
	function handle_job_queued(event) {
		latest_job = event.detail;
		if (latest_job != null) {
			latest_job_id = latest_job.job_id
		}
	}

</script>

<svelte:head>
	<title>Workflows</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<OperationInputs operation_id={current_operation_id} display_operation_select="true" on:operation_changed={handle_operation_changed} on:inputs_updated={handle_inputs_changed}></OperationInputs>
	<OperationExecutePanel operation_id={current_operation_id} current_inputs={current_inputs} on:job_queued={handle_job_queued}></OperationExecutePanel>
	<JobMonitorPanel job_id={latest_job_id}></JobMonitorPanel>
<!--		<div>-->
<!--		Latest job:-->
<!--		{#if (latest_job != null) }-->
<!--		{JSON.stringify(latest_job)}-->
<!--		{/if}-->
<!--	</div>-->
</section>

<style>

	section {
		display: grid;
		height: 75vh;
		margin: 2rem;
	}

</style>
