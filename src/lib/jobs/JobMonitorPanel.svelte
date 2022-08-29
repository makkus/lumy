<script lang="ts">
    import {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
    } from "@rgossiaux/svelte-headlessui";
    import {kiara_api} from "../stores.ts"
    import {createEventDispatcher} from 'svelte';
    import type {ActiveJob} from "../models";

    const dispatch = createEventDispatcher();

    export let job_id: string = null;
    export let use_polling = 500;
    let job_status = "-- no job --"

    let latest_update: ActiveJob = null;

    async function request_update(_job_id) {
        if (_job_id == null) {
            latest_update = null;
            job_status == "-- no job --";
            return
        }
        const _latest_update = await $kiara_api.context().monitor_job(_job_id)
        console.log("JOB UPDATE: ", _latest_update)
        return _latest_update
    }

    let poller

    const setupPoller = (id) => {
        if (id == null) {
            latest_update = null;
            job_status = "-- no job --"
            if (poller) {
                clearInterval();
            }
            return

        }
        if (poller) {
            clearInterval(poller);
        }
        poller = setInterval(doPoll(id), use_polling);
    }

    const doPoll = (_job_id) => async () => {
        console.log(`polling ${_job_id}`)
        const _latest_update = await request_update(_job_id)
        latest_update = _latest_update
        if (_latest_update.finished) {
            if (_latest_update.status == "__job_failed__") {
                job_status = "failed: " + _latest_update.error
            } else {
                job_status = "finished"
            }
            clearInterval(poller)
        } else {
            job_status = "running"
        }
    }

    $: setupPoller(job_id)

</script>

<section>

  <Disclosure let:open defaultOpen={false}>
    <DisclosureButton class={'job-status-button'}>
      <span class="button-content">Job status: {job_status}</span>
    </DisclosureButton>
    <DisclosurePanel>
      <div>
        {#if (latest_update != null) }
          <div class="logs">
            {#each latest_update.job_log.log as log_entry}
              <div>{log_entry.timestamp}: {log_entry.msg}</div>
              {/each}
          </div>
        {:else }
          NO STATUS ATM
        {/if}
      </div>

    </DisclosurePanel>
  </Disclosure>


</section>


<style>
    /*section {*/
    /*    !*display: grid;*!*/
    /*    !*padding: 8px;*!*/
    /*    !*grid-template-columns: 100%;*!*/
    /*    !*grid-template-rows: auto 1fr;*!*/
    /*    !*gap: 1rem;*!*/
    /*}*/

    /*.logs {*/
    /*    display: flex;*/
    /*    flex-direction: column;*/
    /*}*/

    /*:global(.job-status-button) {*/
    /*    !*width: 100%;*!*/
    /*    background-color: white;*/
    /*    padding: 1em;*/
    /*    border-radius: 12px;*/
    /*    cursor: pointer;*/
    /*}*/

    /*.button-content {*/

    /*}*/

</style>
