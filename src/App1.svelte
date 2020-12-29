<script lang="ts">
	import { LayerCake, Svg } from "layercake";
	import { scaleBand } from "d3-scale";

	import Bar from "./components/Bar.svelte";
	import AxisX from "./components/AxisX.svelte";
	import AxisY from "./components/AxisY.svelte";
	import Annotations from "./components/Annotations.svelte";

	import * as d3 from "d3";
	let data;

	d3.csv("./data/groups.csv").then((result) => {
		result.forEach((d) => {
			d[xKey] = +d[xKey];
		});
		data = result;
	});

	const xKey = "value";
	const yKey = "year";
</script>

<style>
	.chart-container {
		width: 100%;
		height: 100%;
	}
</style>

{#if data != undefined}
	<div class="chart-container">
		<LayerCake
			padding={{ top: 0, bottom: 20, left: 30 }}
			x={xKey}
			y={yKey}
			yScale={scaleBand().paddingInner([0.05]).round(true)}
			yDomain={['1979', '1980', '1981', '1982', '1983']}
			xDomain={[0, null]}
			{data}>
			<Svg>
				<AxisX gridlines={true} baseline={true} snapTicks={true} />
				<AxisY gridlines={false} />
				<Bar />
			</Svg>
		</LayerCake>
	</div>
{:else}Loading ...{/if}
