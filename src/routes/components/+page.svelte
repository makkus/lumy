<script lang="ts">
    import ValueManager from "../../lib/data/ValueManager.svelte";
    import ValueInfoSelect from "../../lib/data/ValueInfoSelect.svelte";
    import RenderedValuePanel from "../../lib/data/RenderedValuePanel.svelte";
    import ValueInfoList from "../../lib/data/ValueInfoList.svelte";

    import {kiara_api} from "../../lib/stores.ts";
    import type {ValueInfo} from "../../lib/models.ts";

    export let selected_alias = null;
    let selected_value_render_result = null;

    $: handle_new_alias(selected_alias)

    // function selected_value_changed(event) {
    //     selected_value = event.detail.value
    // }

    function handle_new_alias(sel) {

        if (selected_alias == null) {
            selected_value_render_result = null;
        } else {
            render_value({})

        }
    }

    async function render_value(render_config) {
        if (selected_alias == null) {
            selected_value_render_result = "-- no value selected --";
        } else {
            try {
                const new_render_result = await $kiara_api.context().render_value("alias:"+selected_alias, render_config)
                selected_value_render_result = new_render_result.rendered
            } catch (e) {
                console.log("ERROR", e.msg)
                selected_value_render_result = e.msg;
            }
        }
    }

</script>

<svelte:head>
  <title>Components</title>
  <meta name="description" content="Svelte demo app"/>
</svelte:head>

<section>
  <div id="ValueInfoSelect" class="component-item">
    <h2>ValueInfoSelect</h2>
    <div class="component">
      <ValueInfoSelect bind:selected_alias={selected_alias}></ValueInfoSelect>
    </div>
  </div>
  <div id="ValueInfoList" class="component-item">
    <h2>ValueInfoList</h2>
    <div class="component">
      <ValueInfoList bind:selected_alias={selected_alias}></ValueInfoList>
    </div>
  </div>
  <div id="ValueView" class="component-item">
    <h2>RenderedValuePanel</h2>
    <div class="component">
      <RenderedValuePanel rendered_value={selected_value_render_result}></RenderedValuePanel>
    </div>
  </div>
  <div id="ValueManager" class="component-item">
    <h2>ValueManager</h2>
    <div class="component">
      <ValueManager></ValueManager>
    </div>
  </div>
</section>

<style>

    section {
        display: grid;
        flex-direction: column;
        gap: 1rem;
        margin: 2rem;
    }

    .component-item {
        display: grid;
        grid-template-columns: 100%;
        justify-items: start;
    }

    .component-item h2 {
        align-self: start;
        font-size: 1.5em;
        font-weight: bold;
    }

    .component {
        background-color: var(--tertiary-color);
        width: 100%;
        padding: 1rem;
    }

</style>
