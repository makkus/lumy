<script lang="ts">
	import OperationInputs from "../../lib/workflows/OperationInputs.svelte";
</script>

<svelte:head>
	<title>Workflows</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<OperationInputs operation_id="table.cut_column"></OperationInputs>
</section>

<style>

	section {
		display: grid;
	}

</style>
