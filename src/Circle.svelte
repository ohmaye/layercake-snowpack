<script lang="ts">
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { Svg, Html, ScaledSvg } from "layercake";
    import { getContext } from "svelte";
    import Annotations from "./components/Annotations.svelte";
    import App from "./App.svelte";
    import App1 from "./App1.svelte";
    import { tooltip } from "./tooltip";
    import ToolTip from "./Tool.svelte";

    const { data, width, height } = getContext("LayerCake");

    const vWidth = 1000;
    const vHeight = 1000;

    let toolTipDiv;
    let toolTipText;

    const pack = (data) =>
        d3.pack().size([vWidth, vHeight]).padding(1)(
            d3
                .hierarchy(data)
                .sum((d) => 1 / d.level)
                .sort((a, b) => 1 / b.level - 1 / a.level)
        );

    let circleData = pack(d3.group($data.slice(0, 5000), (d) => d.POS));

    export let fill = "aqua";

    const color = d3
        .scaleLinear()
        .domain([1, 40, 80, 120, 160])
        .range(["white", "yellow", "blue", "brown", "black"]);

    const onMouseOver = (d) => {
        console.log("Mouse Over: ", d);
        if (!d.parent) {
            toolTipText = "All";
        } else if (!d.children) {
            toolTipText = d.data.de;
        } else {
            toolTipText = d.data[0];
        }
    };
    /*
    onMount(() => {
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
    });
*/
</script>

<style>
    .root {
        fill: aqua;
        stroke: green;
        stroke-width: "1px";
    }

    .POS {
        fill: lightgray;
        stroke-width: 1px;
        stroke: blue;
    }

    .leaf {
        fill: var(--color);
        stroke-width: 1px;
        stroke: black;
    }

    .tooltip {
        left: var(--left);
        top: var(--top);
        position: absolute;
    }
</style>

<Html pointerEvents={false}>
    <h1 use:tooltip={{ content: ToolTip, text: 'changed' }}>DE Map</h1>
    <h2 use:tooltip={{ content: ToolTip, text: 'changed' }} class="tooltip">
        {toolTipText}
    </h2>
</Html>
<Svg viewBox="0 0 {$width} {$height}">
    <g>
        {#each [...circleData] as d}
            <!-- {console.log('D: ', d)} -->
            <!-- {console.log('Coord: ', $xGet(d), $x(d), $yGet(d), $y(d), $rGet(d), $r(d))} -->
            <g
                use:tooltip={{ content: ToolTip, text: 'changed', x: d.x, y: d.y }}>
                <circle
                    style="--color: {color(+d.data.level)}"
                    cx={d.x}
                    cy={d.y}
                    r={d.r}
                    class={d.parent ? (d.children ? 'POS' : 'leaf') : 'root'}
                    on:mouseover={() => onMouseOver(d)} />
            </g>
        {/each}
    </g>
</Svg>

<!-- <Svg viewBox="-{$width / 2} -{$width / 2} {$width} {$height}">
    <circle cx={0} cy={0} r={$width / 2} {fill} />
    <g id="target" />
</Svg> -->
