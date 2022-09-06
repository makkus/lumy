<script lang="ts">
		import Svelvet from "svelvet";
    import ELK, {ElkNode} from 'elkjs/lib/elk.bundled.js'

    import type {Value, ValueInfo} from "../models.ts";
    import {kiara_api} from "../stores.ts";
    import {InternalServiceError} from "../utils";
    import {humanFileSize} from "../utils.js";

    export let value: ValueInfo | string = null;

    let lineage: Record<string, any> = null;
    let svelvet_nodes: Array<Record<string, any>> = null;
    let svelvet_edges: Array<Record<string, any>> = null;
    $: handle_new_value(value)

    async function handle_new_value(value: ValueInfo | string) {

        console.log("NEW VALUE LINEAGE", value);

        if ( value == null ) {
            svelvet_nodes = null;
            svelvet_edges = null;
            return;
        }

        let value_id: string;
        if ( typeof value === 'string') {
            value_id = value;
        } else {
            value_id = value.value_id;
        }

        lineage = await $kiara_api.context().get_value_lineage(value_id);

        const nodes = lineage["nodes"]
        const edges = lineage["links"]

        const _sveltet_nodes = nodes.map((node) => {

            const _node = {};
            _node["id"] = node.id;
            _node["data"] = {
                "label": node.label
            };
            // TODO: smarter width calculation
            _node["width"] = node.label.length * 12;
            _node["height"] = 30;

            if ( node.node_type == "value" ) {
                _node['bgColor'] = "#edf0f8";
            } else {
                _node['bgColor'] = "#b9c6d2";
            }

            return _node;
        })
        const _svelvet_edges = edges.map((edge) => {
            const source = edge["source"];
            const target = edge["target"];
            const _edge = {
                id: "e" + source + "-" + target,
                sources: [source],
                targets: [target],
                source: source,
                target: target,
                label: edge["label"],
                arrow: true
            };
            return _edge;

        })
        console.log("ORIG EDGES", edges)
        console.log("NODES", svelvet_nodes)
        console.log("EDGES", svelvet_edges)

        // const layout_name = "org.eclipse.elk.layered"
        const layout_name = "org.eclipse.elk.mrtree"

        const graph: ElkNode = {
            id: "lineage",
            layoutOptions: {'elk.algorithm': layout_name, 'org.eclipse.elk.direction': 'DOWN', 'org.eclipse.elk.spacing.nodeNode': 60},
            children: _sveltet_nodes,
            edges: _svelvet_edges
        } as ElkNode;

        const elk = new ELK()
        const layout = await elk.layout(graph);
        svelvet_nodes = layout.children.map((node) => {
            node['position'] = {
                x: node.x, y: node.y
            };
            return node;
        })
        svelvet_edges = layout.edges;
        console.log("LAYOUT", layout);
        // svelvet_edges = []

    }

</script>

<div class="value-lineage-panel">
  {#if (svelvet_nodes != null && svelvet_edges != null)}
<!--    <Svelvet nodes={initialEdges} edges={initialNodes} background/>-->
    <Svelvet nodes={svelvet_nodes} edges={svelvet_edges} background/>
  {:else}
    No value selected
    {/if}
</div>

<style>
  .value-lineage-panel {
      padding: 1em;
  }
</style>

