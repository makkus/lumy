<script lang="ts">

    import {
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels,
    } from "@rgossiaux/svelte-headlessui";
    import ValueInfoPanel from './ValueInfoPanel.svelte';


    export let values: Record<string, string> = {};

    $: console.log("RESULTS", values)


</script>

<section>
  <div class="values-tab">
    <h2>Result(s):</h2>
    {#if values}
      <TabGroup>
        <TabList>
        {#each Object.entries(values) as [value_name, value_id]}
          <Tab class={({selected}) => selected ? "value-tab-selected" : "value-tab-unselected"}>{value_name}</Tab>
        {/each}
        </TabList>
        <TabPanels>
        {#each Object.entries(values) as [value_name, value_id]}
          <TabPanel>
          <div class="value-info">
            <ValueInfoPanel value={value_id}/>
          </div>
          </TabPanel>
        {/each}
        </TabPanels>
      </TabGroup>

    {/if}
  </div>

</section>

<style>

  /* WARNING: This is just for demonstration.
      Using :global() in this way can be risky. */
  /*:global(.value-tab-selected) {*/
  /*  background-color: rgb(59 130 246);*/
  /*  color: rgb(255 255 255);*/
  /*}*/

  /*:global(.value-tab-unselected) {*/
  /*  background-color: rgb(255 255 255);*/
  /*  color: rgb(0 0 0);*/
  /*}*/

  /*  section {*/
  /*      display: grid;*/
  /*      height: 80vh;*/
  /*      gap: 20px;*/
  /*      grid-template-columns: minmax(15rem, 35%) minmax(25rem, 65%);*/
  /*      padding: 1em;*/
  /*  }*/

  /*  .file-list {*/
  /*      display: grid;*/
  /*      !*overflow-x: auto;*!*/
  /*      background-color: white;*/
  /*      !*border: solid 1px;*!*/
  /*      border-radius: 12px;*/
  /*      !*align-self: stretch;*!*/
  /*      !*height: 85%;*!*/
  /*  }*/

  /*  .value-info {*/
  /*      display: grid;*/
  /*      justify-content: stretch;*/
  /*      !*overflow: auto;*!*/
  /*      background-color: white;*/
  /*      !*border: solid 1px;*!*/
  /*      border-radius: 12px;*/
  /*      !*align-self: stretch;*!*/
  /*      !*height: 85%;*!*/
  /*  }*/


</style>
