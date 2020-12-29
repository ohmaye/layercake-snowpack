<script lang="ts">
    import { LayerCake, Svg, Html, ScaledSvg } from "layercake";
    import Circle from "./Circle.svelte";
    import { deData } from "./data/DE4000byFreq";
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
    }
</style>

<div class="container">
    <LayerCake x="x" y="y" r="r" data={deData}>
        <Circle />
    </LayerCake>
</div>
