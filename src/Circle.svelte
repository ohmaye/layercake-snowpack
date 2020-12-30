<script lang="ts">
    import * as d3 from "d3";
    import { Svg, Html } from "layercake";
    import { getContext } from "svelte";
    import Tooltip from "./Tooltip.svelte";
    import Details from "./Details.svelte";

    const { data, width, height, xGet, yGet, rGet } = getContext("LayerCake");

    let mouseEnterElement;

    // Prepare data
    const pack = (data, width, height) =>
        d3.pack().size([width, height]).padding(1)(
            d3
                .hierarchy(data)
                .sum((d) => 1 / d.level)
                .sort((a, b) => 1 / b.level - 1 / a.level)
        );

    $: circleData = pack(
        d3.group($data.slice(0, 200), (d) => d.POS),
        $width,
        $height
    );

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

    .POSLabel {
        position: absolute;
        left: var(--left);
        top: var(--top);
        background-color: white;
        border-radius: 30px;
        font-size: 1.5rem;
        padding: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>

<Svg viewBox="0 0 {$width} {$height}">
    {#each [...circleData] as d}
        <circle
            style="--color: {color(+d.data.level)}"
            cx={d.x}
            cy={d.y}
            r={d.r}
            class={!d.parent ? 'root' : d.children ? 'POS' : 'leaf'}
            on:mouseenter={() => (mouseEnterElement = d)} />
    {/each}
</Svg>
<Html pointerEvents={false} viewBox="0 0 {$width} {$height}">
    <h1>DE Map</h1>
    <Details node={mouseEnterElement} />
    {#each [...circleData] as d}
        {#if d?.parent && d?.children && d?.r > 50}
            <div
                class="POSLabel"
                style="--left:{d.x - 20}px; --top:{d.y - 20}px;">
                {d.data[0]}
            </div>
        {/if}
    {/each}
    <Tooltip node={mouseEnterElement} />
</Html>

<!-- onMount(() => {
    let view;
    const svg = d3
        .select("#target")
        .on("click", (event) => zoom(event, root));

    const node = svg
        .append("g")
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
        .attr("fill", (d) =>
            d.children ? "lightblue" : color(+d.data.level)
        )
        // .attr("stroke", (d) => (d.children ? "lightblue" : ""))
        // .attr("stroke", "black")
        // .attr("pointer-events", (d) => (!d.children ? "none" : null))
        .on(
            "click",
            (event, d) =>
                focus !== d && (zoom(event, d), event.stopPropagation())
        );

    const label = svg
        .append("g")
        .style("font", "10px sans-serif")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
        .style("display", (d) => (d.parent === root ? "inline" : "none"))
        .text((d) => {
            return d.parent === root ? d.data[0] : d.data.de;
        });

    zoomTo([root.x, root.y, root.r * 2]);
    function zoomTo(v) {
        const k = $width / v[2];

        view = v;

        label.attr(
            "transform",
            (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
        );
        node.attr(
            "transform",
            (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
        );
        node.attr("r", (d) => d.r * k);
    }

    function zoom(event, d) {
        const focus0 = focus;

        focus = d;

        const transition = svg
            .transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", (d) => {
                const i = d3.interpolateZoom(view, [
                    focus.x,
                    focus.y,
                    focus.r * 2,
                ]);
                return (t) => zoomTo(i(t));
            });

        label
            .filter(function (d) {
                return (
                    d.parent === focus || this.style.display === "inline"
                );
            })
            .transition(transition)
            .style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
            .on("start", function (d) {
                if (d.parent === focus) this.style.display = "inline";
            })
            .on("end", function (d) {
                if (d.parent !== focus) this.style.display = "none";
            });
    }
}); -->
