<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">

  import Svelvet from "svelvet";

  import ValueRender from '../lib/ValueRender.svelte'
  const initialNodes = [
	  {
	    id: 1,
	    position: { x: 50, y: 50 },
	    data: { label: "Input Node" },
	    width: 175,
	    height: 40,
	    bgColor: "white"
	  },
	  {
	    id: 2,
	    position: { x: 100, y: 150 },
	    data: { label: "Default Node" },
	    width: 175,
	    height: 40,
	    bgColor: "white"
	  },
	  {
	    id: 3,
	    position: { x: 150, y: 250 },
	    data: { label: "Output Node" },
	    width: 175,
	    height: 40,
	    bgColor: "white"
	  }
	];

	const initialEdges = [
	  { id: "e1-2", source: 1, target: 2, label: "edge label" },
	  { id: "e2-3", source: 2, target: 3 }
	];

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>


<ValueRender></ValueRender>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
