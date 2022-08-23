<script lang="ts">

    import ValueSelect from './ValueSelect.svelte';
    import ValueView from './ValueView.svelte';

	import { onMount } from 'svelte';

    export let value: string = undefined;

    let all_aliases: string[] = [];
    var selected_value: string = undefined;

    let render_result: object = {
        "rendered": undefined,
        "metadata": {
            "related_scenes": undefined
        }
    };

    async function retrieve_value_names() {
        console.log("retrieve value names")
        const res = await fetch('http://127.0.0.1:8080/data/alias_names')
        all_aliases = await res.json()
        console.log("aliases", all_aliases)
    }

	async function retrieve_render_result (render_config: Record<string, any>) {
        // const value_id = "391ef603-46c0-4e22-9672-ff9c3527e44a"
        if (selected_value != undefined) {
            const res = await fetch('http://127.0.0.1:8080/data/render/' + selected_value, {
                method: 'POST',
                body: JSON.stringify(render_config)
            })

            render_result = await res.json()
        }
	}
    async function handle_new_value(event) {

        const old_selected = selected_value
        selected_value = event.detail
        if (old_selected != selected_value) {
            retrieve_render_result({})
        }

    }

    async function handle_new_render_scene(render_config) {
        console.log("NEW SCENE")
        console.log(render_config.detail)
        await retrieve_render_result(render_config.detail.render_config)
    }

	onMount(async () => {
        if (value == undefined) {
            await retrieve_value_names()
        } else {
            selected_value = value
            retrieve_render_result({})
        }
	});

</script>
<span>
{#if (value == undefined)}
    <ValueSelect value_names={all_aliases} on:value_changed={handle_new_value}></ValueSelect>
    <ValueView render_result={render_result} on:new_render_scene={handle_new_render_scene} />
{:else }
    <ValueView render_result={render_result} on:new_render_scene={handle_new_render_scene} />
{/if}

</span>
