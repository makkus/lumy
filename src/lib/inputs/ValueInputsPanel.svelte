<script lang="ts">
    import {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
    } from "@rgossiaux/svelte-headlessui";

    import ValueInput from "./ValueInput.svelte";
    import ValueInputScalar from "./ValueInputScalar.svelte";
    import type {FieldInfo, ValueSchema} from "../models";
    import input_components from "./input_components";

    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    import {kiara_api} from "../stores.ts";

    // from: https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
    const objectMap = (obj, fn) =>
        Object.fromEntries(
            Object.entries(obj).map(
                ([k, v], i) => [k, fn(v, k, i)]
            )
        )

    export let fields_info: Record<string, FieldInfo> = {};

    let all_fields: Record<string, FieldInfo> = {};
    let required_fields: Record<string, FieldInfo> = {};
    let required_fields_with_defaults: Record<string, FieldInfo> = {};
    let optional_fields: Record<string, FieldInfo> = {};

    // let components = {};

    $: field_components = split_input_schemas(fields_info)

    function split_input_schemas(field_info_maps: Record<string, FieldInfo>) {

        const _all_fields = {}
        const _required_fields = {}
        const _required_fields_with_defaults = {}
        const _optional_fields = {}
        const _components = {}
        for (const key of Object.keys(field_info_maps)) {
            const field_info = field_info_maps[key]
            _all_fields[key] = field_info
            if (field_info.value_required) {
                _required_fields[key] = field_info
            } else if (!field_info.field_schema.optional) {
                _required_fields_with_defaults[key] = field_info
            } else {
                _optional_fields[key] = field_info
            }
            const type_name = field_info.field_schema.type

            if (type_name in input_components) {
                _components[key] = input_components[type_name]
            } else if (field_info.data_type_info.characteristics.is_scalar) {
                _components[key] = ValueInputScalar
            } else {
                _components[key] = ValueInput
            }
        }

        [all_fields, required_fields, required_fields_with_defaults, optional_fields] = [_all_fields, _required_fields, _required_fields_with_defaults, _optional_fields];
        return _components
    }

    let current_values: Record<string, any> = {};
    $: current_values = objectMap(fields_info, v => (v != null) ? (v.field_schema.default == '__not_set__' || v.field_schema.default == '__no_value__' ? null : v.field_schema.default) : null);

    let validated: Record<string, string> = null;

    function handle_input_changes(event) {
        const field_name = event.detail.field_name
        const new_value = event.detail.value

        const old_value = current_values[field_name]
        current_values[field_name] = new_value

        dispatch("input_updated", {"field_name": field_name, new_value: new_value, old_value: old_value})
        dispatch("inputs_updated", current_values)

    }

</script>

<section>
  <div>
    {#if (Object.keys(required_fields).length > 0)}
      <div class="required-inputs">
        <Disclosure let:open defaultOpen={true}>
          <DisclosureButton class={'accordion-button-required'}>
            <span>Required inputs</span>
          </DisclosureButton>
          <DisclosurePanel>
            <div class="input-panel-container">
              {#each Object.entries(required_fields) as [field_name, field_info]}
                <div class="input-panel">
                  <svelte:component this={field_components[field_name]} field_info={field_info}
                                    current_value={current_values[field_name]}
                                    on:input_changed={handle_input_changes}></svelte:component>
                </div>
              {/each}
            </div>
            {#if (Object.keys(required_fields_with_defaults).length > 0)}
              <div class="required-inputs">
                <!--        <Disclosure let:open defaultOpen={true}>-->
                <!--          <DisclosureButton class={'accordion-button-required'}>-->
                <!--            <span>Required inputs (with defaults)</span>-->
                <!--          </DisclosureButton>-->
                <!--          <DisclosurePanel>-->
                <div class="input-panel-container">
                  {#each Object.entries(required_fields_with_defaults) as [field_name, field_info]}
                    <div class="input-panel">
                      <svelte:component this={field_components[field_name]} field_info={field_info}
                                        current_value={current_values[field_name]}
                                        on:input_changed={handle_input_changes}></svelte:component>
                    </div>
                  {/each}
                </div>
                <!--          </DisclosurePanel>-->
                <!--        </Disclosure>-->
              </div>
            {/if}

          </DisclosurePanel>
        </Disclosure>
      </div>
    {/if}


    {#if (Object.keys(optional_fields).length > 0)}
      <div class="optional-inputs">
        <Disclosure let:open defaultOpen={true}>
          <DisclosureButton class={'accordion-button-required'}>
            <span>Optional inputs</span>
          </DisclosureButton>
          <DisclosurePanel>

            <div class="input-panel-container">
              {#each Object.entries(optional_fields) as [field_name, field_info]}
                <div class="input-panel">
                  <svelte:component this={field_components[field_name]} field_info={field_info}
                                    current_value={current_values[field_name]}
                                    on:input_changed={handle_input_changes}></svelte:component>
                </div>
              {/each}
            </div>

          </DisclosurePanel>
        </Disclosure>
      </div>
    {/if}
  </div>
</section>

<style>

    :global(.accordion-button-required) {
        width: 100%;
        background-color: white;
        padding: 1em;
        border-radius: 12px;
        cursor: pointer;
    }

    .accordion-button-optional {
        background-color: white;
        padding: 1em
    }

    section {
        width: 100%;
        height: 100%;
    }

    .input-panel-container {
        padding: 1em;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2em;
        align-items: start;
        align-content: start;
        width: 100%;
        height: 100%;
    }

    .input-panel {
        /*width: 100%;*/
        max-width: 80%;
        min-width: 30%;

        /*height: 100%;*/
        /*height: 500px;*/
        /*min-width: 30%;*/
    }

    .input-panel-scalar {
        max-width: 60%;
        min-width: 20%;
    }

</style>
