<script lang="ts">
	import ValueManager from "../../lib/data/ValueManager.svelte";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<ValueManager></ValueManager>
</section>

<style>

	section {
		/*display: grid;*/
		/*!*width: 60%;*!*/
		height: 75vh;
		/*!*justify-content: stretch;*!*/
		/*margin: 2rem;*/
	}

</style>
