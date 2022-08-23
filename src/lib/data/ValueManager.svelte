<script lang="ts">
    import ValueInfo from './ValueInfo.svelte';
    import ValueList from './ValueList.svelte';

    import type {RenderValueResult} from "../models";
    import {kiara_api} from "../stores";

    import { createEventDispatcher } from 'svelte';
    import {KiaraAPI} from "../utils";
    const dispatch = createEventDispatcher();

    let current_value: string = null;
    // let current_render_result: RenderValueResult = null

    // let values = {};

	// async function retrieve_render_result (render_config) {
    //
    //     if (current_value != null) {
    //         const res = await fetch('http://127.0.0.1:8080/data/render/' + current_value, {
    //             method: 'POST',
    //             body: JSON.stringify(render_config)
    //         })
    //       if (res.status >= 400 && res.status < 600) {
    //         let rendered = await res.text()
    //         current_render_result = {
    //           rendered: rendered
    //         } as RenderValueResult;
    //
    //         throw new Error("Bad response from server");
    //       }
    //         current_render_result = await res.json();
    //     } else {
    //         current_render_result = null;
    //     }
	// }

    function handle_new_value(new_value_event) {

      let sel: string = new_value_event.detail

        if ( sel == null) {
            if ( current_value == null ) {
                return
            } else {
                current_value = sel;
                // current_render_result = null;
            }
        } else {
            if ( current_value != null && (current_value == sel) ) {
                return
            }
            current_value = sel
            // const render_text = "Loading value '" + current_value + "'...";
            // current_render_result = {
            //   rendered: render_text
            // } as RenderValueResult;
            //
            // retrieve_render_result({})
        }
    }

    // async function handle_render_request(render_request_event) {
    //     await retrieve_render_result(render_request_event.detail)
    // }

</script>

<section>
  <ValueList on:value_changed={handle_new_value}></ValueList>
  <ValueInfo value={current_value}/>
</section>

<style>

	section {
      display: grid;
      gap: 20px;
      grid-template-columns: minmax(150px, 25%) minmax(200px, 75%);
      justify-content: stretch;
      align-content: stretch;
    }


</style>
