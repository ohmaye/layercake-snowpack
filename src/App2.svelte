<script>
	import { LayerCake, Html } from "layercake";
	import CirclePack from "./components/CirclePack.html.svelte";
	import * as d3 from "d3";

	let data;

	// d3.csv("./data/fruitGroups.csv").then((result) => {
	// 	result.forEach((d) => {
	// 		d[valueKey] = +d[valueKey];
	// 	});
	// 	data = result;
	// });
	import { deData } from "./data/DE4000byFreq";
	data = [...d3.group(deData, (d) => d.POS)];
	data = deData;
	data.forEach((d) => (d.level = 1 / d.level));
	const idKey = "POS";
	const valueKey = "level";
</script>

<style>
	.chart-container {
		width: 100%;
		height: 100%;
	}
</style>

{#if data != undefined}
	<div class="chart-container">
		<LayerCake padding={{ top: 0, bottom: 20, left: 30 }} {data}>
			<Html>
				<CirclePack
					{idKey}
					{valueKey}
					fill="#ff00cc"
					stroke="#9f0080"
					textColor="#61004e" />
			</Html>
		</LayerCake>
	</div>
{/if}
