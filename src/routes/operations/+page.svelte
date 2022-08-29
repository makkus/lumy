<script lang="ts">
	import OperationInputs from "../../lib/operations/OperationInputs.svelte";
	import ExecuteJobPanel from "../../lib/jobs/ExecuteJobPanel.svelte";
	import JobMonitorPanel from "../../lib/jobs/JobMonitorPanel.svelte";
	import ValuesView from '../../lib/data/ValuesView.svelte';
	import OperationInfoPanel from "../../lib/operations/OperationInfoPanel.svelte"
	import OperationSelect from "../../lib/operations/OperationSelect.svelte";

	import type {ActiveJob} from "../../lib/models";
	import {InternalServiceError} from "../../lib/utils";

	let current_operation_id = null;
	let current_inputs = {};
	let latest_job: ActiveJob = null;
	let latest_job_id = null;
	let latest_results: Record<string, string> = {}

	function handle_operation_changed(event) {
		current_operation_id = event.detail;
		latest_job_id = null;
		latest_results = {};
	}
	function handle_inputs_changed(event) {
		current_inputs = event.detail;
	}
	function handle_job_queued(event) {
		latest_job = event.detail;
		if (latest_job != null) {
			latest_job_id = latest_job.job_id
			latest_results = latest_job.results
			console.log("RESULTS", latest_results)
		} else {
			latest_job_id = null;
			latest_results = {}
		}
	}
	function handle_job_queue_error(event) {
		const error: InternalServiceError = event.detail;
		latest_job_id = null
		latest_results = {}
		console.log("Could not queue job.", error);

	}

	async function handle_new_operation(event) {
        current_operation_id = event.detail
    }

</script>

<svelte:head>
	<title>Operations</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<OperationSelect on:operation_changed={handle_new_operation}></OperationSelect>
	<OperationInfoPanel operation_id={current_operation_id}></OperationInfoPanel>
	<OperationInputs operation_id={current_operation_id} display_operation_select={false} on:operation_changed={handle_operation_changed} on:inputs_updated={handle_inputs_changed}></OperationInputs>
	<ExecuteJobPanel operation_id={current_operation_id} current_inputs={current_inputs} on:job_queued={handle_job_queued} on:job_queue_error={handle_job_queue_error}></ExecuteJobPanel>
	<JobMonitorPanel job_id={latest_job_id}></JobMonitorPanel>
	<ValuesView values={latest_results}></ValuesView>

<!--		<div>-->
<!--		Latest job:-->
<!--		{#if (latest_job != null) }-->
<!--		{JSON.stringify(latest_job)}-->
<!--		{/if}-->
<!--	</div>-->
</section>

<style>

	/*section {*/
	/*	display: grid;*/
	/*	height: 75vh;*/
	/*	margin: 2rem;*/
	/*}*/

</style>
