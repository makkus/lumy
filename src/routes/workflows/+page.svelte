<script lang="ts">
	import OperationInputs from "../../lib/operations/OperationInputs.svelte";
	import ExecuteJobPanel from "../../lib/jobs/ExecuteJobPanel.svelte";
	import JobMonitorPanel from "../../lib/jobs/JobMonitorPanel.svelte";
	import ValuesView from '../../lib/data/ValuesView.svelte';
	import OperationInfoPanel from "../../lib/operations/OperationInfoPanel.svelte"
	import OperationSelect from "../../lib/operations/OperationSelect.svelte";
	import WorkflowPage from "$lib/workflows/WorkflowPage.svelte";


</script>

<svelte:head>
	<title>Workflows</title>
	<meta name="description" content="Workflows" />
</svelte:head>

<section>

	<WorkflowPage workflow_id_or_alias="topic_modeling"></WorkflowPage>

</section>

<style>

	/*section {*/
	/*	display: grid;*/
	/*	height: 75vh;*/
	/*	margin: 2rem;*/
	/*}*/

</style>
