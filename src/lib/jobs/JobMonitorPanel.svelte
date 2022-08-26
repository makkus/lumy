<script lang="ts">

    import {kiara_api} from "../stores.ts"
    import {createEventDispatcher} from 'svelte';
		import type {ActiveJob} from "../models";
    const dispatch = createEventDispatcher();

    export let job_id: string = null;
		export let use_polling = 500;

		let latest_update: ActiveJob = null;

		async function request_update(_job_id) {
			if (_job_id == null) {
				return
			}
			const _latest_update = await $kiara_api.context().monitor_job(_job_id)
			console.log("JOB UPDATE: ", _latest_update)
			return _latest_update
    }

		let poller

    const setupPoller = (id) => {
			if (id == null ) {
				if (poller) {
					clearInterval()
				}
				return

			}
        if (poller) {
            clearInterval(poller)
        }
        poller = setInterval(doPoll(id), use_polling)
    }

    const doPoll = (_job_id) => async () => {
			console.log(`polling ${_job_id}`)
			const _latest_update = await request_update(_job_id)
			if (_latest_update.finished) {
				clearInterval(poller)
			}
			latest_update = _latest_update
    }

    $: setupPoller(job_id)

</script>

<section>
	<div>
		Current job_id: {job_id}
	</div>
	<div>
		{#if ( latest_update != null) }
			JOB STATUS
			{JSON.stringify(latest_update)}
			{:else }
			NO STATUS ATM
			{/if}
	</div>

</section>


<style>
    section {
        display: grid;
        padding: 8px;
        grid-template-columns: 100%;
        grid-template-rows: auto 1fr;
        gap: 1rem;
    }

    .item {
        height: 100%;
    }
</style>
