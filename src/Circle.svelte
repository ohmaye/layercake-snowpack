<script lang="ts">
    import * as d3 from "d3";
    import { Svg, Html } from "layercake";
    import { getContext } from "svelte";
    import Tooltip from "./Tooltip.svelte";
    import Details from "./Details.svelte";
    import Labels from "./Labels.svelte";
    import _ from "lodash";

    const { data, width, height } = getContext("LayerCake");

    const sampleSize = 5000;

    let mouseEnterElement;

    let rootData = $data;

    // Prepare data
    const pack = (data, width, height) =>
        d3.pack().size([width, height]).padding(3)(
            d3
                .hierarchy(data)
                .sum((d) => 1 / d.level)
                .sort((a, b) => 1 / b.level - 1 / a.level)
        );

    $: root = pack(
        d3.group(rootData.slice(0, sampleSize), (d) => d.POS),
        $width,
        $height
    );

    const handleZoom = (d) => {
        if (d.parent && d.children) {
            rootData = _.filter($data, (item) => item.POS == d.data[0]);
        } else {
            rootData = $data;
        }
    };

    // Create color scheme based on level bins
    const color = d3
        .scaleSequential()
        .domain([1, 40, 80, 120, 160])
        .range([d3.interpolateYlGnBu(0), d3.interpolateYlGnBu(0.8)]);
</script>

<style>
    .root {
        fill: aqua;
        stroke: lightblue;
        stroke-width: "1px";
    }

    .POS {
        fill: azure;
        stroke-width: 1px;
        stroke: lightblue;
    }

    .leaf {
        fill: var(--color);
        stroke-width: 1px;
        stroke: black;
    }
</style>

<Svg viewBox="0 0 {$width} {$height}">
    {#each [...root] as d}
        <circle
            style="--color: {color(+d.data.level)}"
            cx={d.x}
            cy={d.y}
            r={d.r}
            class={!d.parent ? 'root' : d.children ? 'POS' : 'leaf'}
            on:mouseenter={() => (mouseEnterElement = d)}
            on:click={() => handleZoom(d)} />
    {/each}
</Svg>
<Html pointerEvents={false} viewBox="0 0 {$width} {$height}">
    <h1>DE Map</h1>
    <Details node={mouseEnterElement} />
    <Labels {root} />
    <Tooltip node={mouseEnterElement} />
</Html>
