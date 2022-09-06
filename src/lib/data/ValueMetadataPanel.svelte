<script lang="ts">

    import type {ValueInfo} from "../models.ts";
    import {kiara_api} from "../stores.ts";
    import {InternalServiceError} from "../utils";
    import {humanFileSize} from "../utils.js";

    export let value: ValueInfo | string = null;

    let rendered = null;

    $: handle_new_value(value)

    async function handle_new_value(value: ValueInfo | string) {

        let value_id: string;
        if ( typeof value === "string") {
            value_id = value
        } else {
            value_id = value.value_id;
        }

        rendered = await $kiara_api.context().render_value_info(value_id)
    }

</script>

<div class="value_metadata_panel">
  {#if (rendered != null)}
    {@html rendered}
    {:else}
    No value selected
    {/if}
</div>

<style>
  .value_metadata_panel {
      padding: 1em;
  }
  .value_metadata_panel table tr td {
      padding: 0.2em 0.8em;
  }
</style>

